const { StatusCodes } = require("http-status-codes");
const { UserService  } = require("../services");
const { ErrorResponse, SuccessResponse } = require("../utils/common");

async function registerUser(req, res) {
  try {
    const requiredFields = ['firstName', 'lastName', 'email', 'password'];
    const missingFields = requiredFields.filter(field => !req.body[field]);

    if (missingFields.length > 0) {
      ErrorResponse.message = "Missing required fields";
      ErrorResponse.error = { fields: missingFields };
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    // Validate role if provided
    if (req.body.role && !['customer', 'admin', 'agent'].includes(req.body.role)) {
      ErrorResponse.message = "Invalid role specified";
      ErrorResponse.error = { validRoles: ['customer', 'admin', 'agent'] };
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

module.exports = {
  registerUser
};