const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");
const { responsesError } = require("../utils/constant");

const MaintenanceMiddleware = {
  validateCreator: (req, res, next) => {
    const requiredFields = ["maintenanceType", "description", "startDate"];
    const missingFields = requiredFields.filter(field => !req.body[field]);

    if (missingFields.length > 0) {
      ErrorResponse.message = responsesError.MaintenanceMiddleware[0];
      ErrorResponse.error = new AppError(
        `Missing fields: ${missingFields.join(", ")}`,
        StatusCodes.BAD_REQUEST
      );
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    next();
  },
};

module.exports = MaintenanceMiddleware;
