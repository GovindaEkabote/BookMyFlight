const { StatusCodes } = require("http-status-codes");
const { AirplaneService } = require("../services");
const {ErrorResponse, SuccessResponse} = require('../utils/common');
const { responsesError } = require("../utils/constant");

/**
 *
 * POST : /airplanes
 * req-body {modelNumber, capacity,companyName,country}
 */

async function createAirplane(req, res) {
  try {
    const {
      modelNumber,
      manufacturer,
      registerationNumber,
      economySeats,
      businessSeats,
      firstClassSeats,
    } = req.body;

    // Validate required fields
    if (
      !modelNumber ||
      !manufacturer ||
      !registerationNumber ||
      economySeats === undefined ||
      businessSeats === undefined ||
      firstClassSeats === undefined
    ) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: responsesError.AllFieldsRequired || "All fields are required.",
        data: {},
        error: {},
      });
    }

    // Call service to create airplane
    const airplane = await AirplaneService.createAirplane({
      modelNumber,
      manufacturer,
      registerationNumber,
      economySeats,
      businessSeats,
      firstClassSeats,
    });

    SuccessResponse.message = "Airplane created successfully.";
    SuccessResponse.data = airplane;

    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    console.error("Create airplane error:", error);

    ErrorResponse.message = "Airplane registration failed.";
    ErrorResponse.error = error;

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
  }
}

module.exports = {
  createAirplane,
};
