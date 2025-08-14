const bcrypt = require("bcryptjs");
const { StatusCodes } = require("http-status-codes");
const UserRepository = require("../repositories/users-repositories");
const AppError = require("../utils/errors/app-error");
const { generateTokens } = require("../utils/common/token"); 

const userRepository = new UserRepository();

async function createUser(data) {
  try {
    const existingUser = await userRepository.getUserByEmail(data.email);
    if (existingUser) {
      throw new AppError("User with this email already exists", StatusCodes.BAD_REQUEST);
    }

    const user = await userRepository.create(data);

    const userResponse = user.get({ plain: true });
    delete userResponse.password;

    return userResponse;
  } catch (error) {
    console.error("CreateUser error:", error);

    if (error.name === "SequelizeValidationError") {
      const explanations = error.errors.map((err) => err.message);
      throw new AppError(explanations.join(", "), StatusCodes.BAD_REQUEST);
    }

    if (error.name === "SequelizeUniqueConstraintError") {
      throw new AppError("User with this email already exists", StatusCodes.CONFLICT);
    }

    throw new AppError(error.message || "Cannot create a new user", StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function login(email, password, ipAddress, userAgent) {
  const user = await userRepository.getUserByEmail(email);
  if (!user) {
    throw new AppError("Invalid email or password", StatusCodes.BAD_REQUEST);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    await handleFailedLogin(user); // track failed attempts
    throw new AppError("Invalid email or password", StatusCodes.BAD_REQUEST);
  }

  if (user.isLocked && user.lockUntil > Date.now()) {
    throw new AppError("Account temporarily locked", StatusCodes.FORBIDDEN);
  }

  const tokens = generateTokens(user);

  await user.update({
    lastLogin: new Date(),
    lastIpAddress: ipAddress,
    loginAttempts: 0,
    isLocked: false,
    lockUntil: null
  });

  return {
    user: sanitizeUser(user),
    tokens
  };
}

async function handleFailedLogin(user) {
  const maxAttempts = 5;
  const lockDuration = 15 * 60 * 1000; // 15 mins

  const updatedAttempts = user.loginAttempts + 1;
  const isLocked = updatedAttempts >= maxAttempts;

  await user.update({
    loginAttempts: updatedAttempts,
    isLocked,
    lockUntil: isLocked ? new Date(Date.now() + lockDuration) : null
  });
}

function sanitizeUser(user) {
  const userJson = user.toJSON();
  delete userJson.password;
  delete userJson.verificationToken;
  delete userJson.resetToken;
  return userJson;
}

module.exports = {
  createUser,
  login
};
