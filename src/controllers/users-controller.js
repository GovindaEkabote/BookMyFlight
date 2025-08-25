const { StatusCodes } = require("http-status-codes");
const { UserService } = require("../services");
const { ErrorResponse, SuccessResponse } = require("../utils/common");
const { setRefreshTokenCookie } = require("../utils/common/token");
const ApiResponse = require("../utils/common/apiResponse");
const {User} = require('../models/')

async function registerUser(req, res) {
  try {
    const requiredFields = ["firstName", "lastName", "email", "password"];
    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      ErrorResponse.message = "Missing required fields";
      ErrorResponse.error = { fields: missingFields };
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    // Validate role if provided
    if (
      req.body.role &&
      !["customer", "admin", "agent"].includes(req.body.role)
    ) {
      ErrorResponse.message = "Invalid role specified";
      ErrorResponse.error = { validRoles: ["customer", "admin", "agent"] };
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    const user = await UserService.createUser(req.body);

    SuccessResponse.message = "User registered successfully";
    SuccessResponse.data = user;

    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = "Failed to register user";
    ErrorResponse.error = error;

    const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    return res.status(statusCode).json(ErrorResponse);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const ipAddress = req.ip;
    const userAgent = req.get("User-Agent");

    const { user, tokens } = await UserService.login(
      email,
      password,
      ipAddress,
      userAgent
    );

    setRefreshTokenCookie(res, tokens.refreshToken);

    ApiResponse.success(res, {
      message: "Login successful",
      data: {
        user,
        accessToken: tokens.accessToken,
      },
      statusCode: StatusCodes.OK,
    });
  } catch (error) {
    next(error);
  }
}

async function logout(req, res, next) {
  try {
    const ipAddress = req.ip;
    const userAgent = req.get("User-Agent");
    const refreshToken = req.cookies.refreshToken;

    let userId = req.userId; // From the middleware

    if (!userId && refreshToken) {
      try {
        const decoded = jwt.verify(
          refreshToken,
          serverConfig.JWT_REFRESH_SECRET
        );
        userId = decoded.id;
      } catch (error) {
        console.log("Refresh token invalid during logout:", error.message);
      }
    }

    let user = null;

    if (userId) {
      try {
        // Save logout history
        await UserService.saveLoginHistory({
          userId: userId,
          activityType: "logout",
          ipAddress,
          userAgent,
        });

        // Fetch user info to return
        user = await User.findByPk(userId, {
          attributes: ["id", "firstName", "lastName", "email", "role"],
        });

        // Optionally: await UserService.invalidateTokens(userId);
      } catch (historyError) {
        console.error("Failed to save logout history:", historyError);
      }
    }

    res.clearCookie("refreshToken", {
      httpOnly: true,
      sameSite: "strict",
    });

    return ApiResponse.success(res, {
      message: "Logout successful",
      statusCode: StatusCodes.OK,
      data: user, // 👈 now you’ll see which user logged out
    });
  } catch (error) {
    next(error);
  }
}


module.exports = {
  registerUser,
  login,
  logout,
};
