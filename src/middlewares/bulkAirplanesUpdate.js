const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app-error");
const { responsesError } = require("../utils/constant");

function validateBulkUpdate(req, res, next) {
  const { airplanes } = req.body;

  if (!airplanes || !Array.isArray(airplanes)) {
    throw new AppError(
      responsesError.validateBulkUpdateMessage[0],
      StatusCodes.BAD_REQUEST
    );
  }

  for (const airplane of airplanes) {
    const {
      id,
      modelNumber,
      manufacturer,
      registerationNumber,
      economySeats,
      businessSeats,
      firstClassSeats,
    } = airplane;

    // Check for missing fields
    if (
      !id ||
      !modelNumber ||
      !manufacturer ||
      !registerationNumber ||
      economySeats === undefined ||
      businessSeats === undefined ||
      firstClassSeats === undefined
    ) {
      throw new AppError(
        responsesError.validateBulkUpdateMessage[1],
        StatusCodes.BAD_REQUEST
      );
    }

    // Check registerationNumber format
    if (!/^[A-Za-z0-9-]+$/.test(registerationNumber)) {
      throw new AppError(
        responsesError.validateBulkUpdateMessage[2],
        StatusCodes.BAD_REQUEST
      );
    }

    // Check that seat counts are not negative
    if (economySeats < 0 || businessSeats < 0 || firstClassSeats < 0) {
      throw new AppError(
        responsesError.validateBulkUpdateMessage[3],
        StatusCodes.BAD_REQUEST
      );
    }
  }

  next();
}

module.exports = {
  validateBulkUpdate,
};
