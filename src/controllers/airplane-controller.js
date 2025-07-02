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

/**
 *
 * PUT : /update/:id
 * req-body: {modelNumber,manufacturer,registerationNumber,economySeats,businessSeats,firstClassSeats}
 */
async function updateAirPlane(req, res) {
  try {
    const airPlaneId = req.params.id;
    const updateDate = req.body;

    const update = await AirplaneService.updateAirPlane(airPlaneId, updateDate);
    if (!update) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "AirPlane Not Found.",
        data: {},
        error: {},
      });
    }
    SuccessResponse.message = "Airplane updated successfully.";
    SuccessResponse.data = update;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
     console.log("Error updating airplanes", error);

    ErrorResponse.message = "Failed to update airplane.";
    ErrorResponse.error = error;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
  }
}

/**
 *
 * DELETE : /delete/:id
 * req-body: {}
 */
async function destroyAirPlane(req,res) {
   try {
    const deleteAirplane = await AirplaneService.deleteAirPlane(req.params.id);

    if (!deleteAirplane || deleteAirplane.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: responsesError.AirPlanesNotFound || "No airplane found.",
        data: {},
        error: {},
      });
    }

    SuccessResponse.message = "Airplane deleted successfully.";
    SuccessResponse.data = deleteAirplane;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    console.log("Error delete airplane", error);

    ErrorResponse.message = "Failed to delete airplane.";
    ErrorResponse.error = error;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
  }
}

/**
 *
 * DELETE : /delete
 * req-body: {}
 */
async function destroyAllAirplanes(req, res) {
  try {
    const deletedCount = await AirplaneService.destroyAllAirplanes();

    SuccessResponse.message = `Deleted ${deletedCount} airplanes.`;
    SuccessResponse.data = { deletedCount };

    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = "Failed to delete all airplanes.";
    ErrorResponse.error = error;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
  }
}

async function toggleAircraftStatus(req, res) {
  try {
    const { id } = req.params;

    // 1. Get the airplane and verify existence
    const airplane = await AirplaneService.getAirPlane(id);
    
    // 2. Toggle and update status
    const newStatus = !airplane.isActive;
    const updatedAirplane = await AirplaneService.updateAirplaneStatus(id, { 
      isActive: newStatus 
    });

    // 3. Success response
    return res.status(StatusCodes.OK).json({
      success: true,
      message: `Aircraft status toggled to ${newStatus ? 'active' : 'inactive'} successfully.`,
      data: updatedAirplane,
      error: {}
    });

  } catch (error) {
    // 4. Error response
    return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || "Failed to toggle aircraft status.",
      data: {},
      error: error.details || {}
    });
  }
}

async function getActiveAirplanes(req,res) {
  try {
  const activeAirplanes = await AirplaneService.getAllActive();
  SuccessResponse.message= "Active airplanes fetched successfully",
  SuccessResponse.data= activeAirplanes;
  return res.status(StatusCodes.OK).json(SuccessResponse)
  } catch (error) {
    ErrorResponse.message = "Failed to fetch active airplanes.";
    ErrorResponse.error = error;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
  }
}

async function getInactiveAirplanes(req,res) {
  try {
  const activeAirplanes = await AirplaneService.getAllInactive();
  SuccessResponse.message= "Inactive airplanes fetched successfully",
  SuccessResponse.data= activeAirplanes;
  return res.status(StatusCodes.OK).json(SuccessResponse)
  } catch (error) {
    ErrorResponse.message = "Failed to fetch inactive airplanes.";
    ErrorResponse.error = error;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
  }
}


module.exports = {
  createAirplane,
  getAllAirplanes,
  getAllAirplane,
  updateAirPlane,
  destroyAirPlane,
  destroyAllAirplanes,
  toggleAircraftStatus,
  getActiveAirplanes,
  getInactiveAirplanes
};
