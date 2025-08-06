const { StatusCodes } = require("http-status-codes");
const { usersService } = require("../services");
const { ErrorResponse, SuccessResponse } = require("../utils/common");
const { responsesError } = require("../utils/constant");
const AppError = require("../utils/errors/app-error");

async function userRegister(req, res) {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      phone,
      dateOfBirth,
      passportNumber,
      role,
    } = req.body;

    if (!firstName || !lastName || !email || !password || !role) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "All required fields must be filled.",
        data: {},
        error: {},
      });
    }

    // Call service to create airplane
    const register = await usersService.userRegister({
      firstName,
      lastName,
      email,
      password,
      phone,
      dateOfBirth,
      passportNumber,
      role,
    });

    SuccessResponse.message = responsesError.successMessage;
    SuccessResponse.data = register;

    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    console.error("user register error:", error);

    ErrorResponse.message = responsesError.FailedMessage;
    ErrorResponse.error = error;

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
  }
}

module.exports = {
  userRegister,
};
