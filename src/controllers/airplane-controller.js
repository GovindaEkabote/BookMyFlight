const { StatusCodes } = require("http-status-codes");
const { AirplaneService } = require("../services");
const { ErrorResponse, SuccessResponse } = require("../utils/common");
const { responsesError } = require("../utils/constant");
const { AirplaneRepositories } = require("../repositories");

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


/**
 *
 * GET : /airplanes
 * req-body: {}
 */

async function getAllAirplanes(req, res) {
  try {
    const airplanes = await AirplaneService.getAirPlanes(); 
    if (!airplanes || airplanes.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: responsesError.AirPlanesNotFound || "No airplanes found.",
        data: {},
        error: {},
      });
    }

    SuccessResponse.message = "Airplanes fetched successfully.";
    SuccessResponse.data = airplanes;
    return res.status(StatusCodes.OK).json(SuccessResponse);

  } catch (error) {
    console.log("Error fetching airplanes", error);

    ErrorResponse.message = "Failed to fetch airplanes.";
    ErrorResponse.error = error;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
  }
}


/**
 *
 * GET : /airplane/:id
 * req-body: {}
 */
async function getAllAirplane(req, res) {
  try {
    const airplanes = await AirplaneService.getAirPlane(req.params.id); 
    if (!airplanes || airplanes.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: responsesError.AirPlanesNotFound || "No airplane found.",
        data: {},
        error: {},
      });
    }

    SuccessResponse.message = "Airplane fetched successfully.";
    SuccessResponse.data = airplanes;
    return res.status(StatusCodes.OK).json(SuccessResponse);

  } catch (error) {
    console.log("Error fetching airplanes", error);

    ErrorResponse.message = "Failed to fetch airplane.";
    ErrorResponse.error = error;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
  }
}

module.exports = {
  createAirplane,
  getAllAirplanes,
  getAllAirplane
};
