const { StatusCodes } = require("http-status-codes");
const UserRepository = require("../repositories/users-repositories");
const AppError = require("../utils/errors/app-error");
const userRepository  = new UserRepository();


async function createUser(data) {
  try {
    // Check if user already exists
    const existingUser = await userRepository.getUserByEmail(data.email);
    if (existingUser) {
      throw new AppError(
        "User with this email already exists",
        StatusCodes.BAD_REQUEST
      );
    }

    // Create new user
    const user = await userRepository.create(data);

    // Remove sensitive data before returning
    const userResponse = user.get({ plain: true });
    delete userResponse.password;

    return userResponse;

  } catch (error) {
    console.error("CreateUser error:", error); // ✅ log for debugging

    if (error.name === "SequelizeValidationError") {
      const explanations = error.errors.map((err) => err.message);
      throw new AppError(explanations.join(", "), StatusCodes.BAD_REQUEST);
    }

    if (error.name === "SequelizeUniqueConstraintError") {
      throw new AppError(
        "User with this email already exists",
        StatusCodes.CONFLICT
      );
    }

    // ✅ preserve original message for unexpected errors
    throw new AppError(
      error.message || "Cannot create a new user",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createUser,
};