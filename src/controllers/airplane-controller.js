const { StatusCodes } = require("http-status-codes");
const { AirplaneService } = require("../services");
const { ErrorResponse, SuccessResponse } = require("../utils/common");
const { responsesError } = require("../utils/constant");
const AppError = require("../utils/errors/app-error");

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

    SuccessResponse.message = responsesError.successMessage;
    SuccessResponse.data = airplane;

    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    console.error("Create airplane error:", error);

    ErrorResponse.message = responsesError.FailedMessage;
    ErrorResponse.error = error;

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
  }
}

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

    SuccessResponse.message = responsesError.FetchedSuccessfully;
    SuccessResponse.data = airplanes;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    console.log("Error fetching airplanes", error);

    ErrorResponse.message = responsesError.FailedFetch;
    ErrorResponse.error = error;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
  }
}

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

    SuccessResponse.message = responsesError.FetchedSuccessfully;
    SuccessResponse.data = airplanes;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    console.log(responsesError.FailedFetch, error);

    ErrorResponse.message = responsesError.FailedFetch;
    ErrorResponse.error = error;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
  }
}

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
    SuccessResponse.message = responsesError.updateMessage[0];
    SuccessResponse.data = update;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    console.log(responsesError.updateMessage[1], error);

    ErrorResponse.message = responsesError.updateMessage[2];
    ErrorResponse.error = error;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
  }
}

async function destroyAirPlane(req, res) {
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

    SuccessResponse.message = responsesError.deleteMessage[0];
    SuccessResponse.data = deleteAirplane;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    console.log("Error delete airplane", error);

    ErrorResponse.message = responsesError.deleteMessage[1];
    ErrorResponse.error = error;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
  }
}

async function destroyAllAirplanes(req, res) {
  try {
    const deletedCount = await AirplaneService.destroyAllAirplanes();

    SuccessResponse.message = `Deleted ${deletedCount} airplanes.`;
    SuccessResponse.data = { deletedCount };

    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = responsesError.deleteMessage[2];
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
      isActive: newStatus,
    });

    // 3. Success response
    return res.status(StatusCodes.OK).json({
      success: true,
      message: `Aircraft status toggled to ${
        newStatus ? "active" : "inactive"
      } successfully.`,
      data: updatedAirplane,
      error: {},
    });
  } catch (error) {
    // 4. Error response
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json({
        success: false,
        message: error.message || "Failed to toggle aircraft status.",
        data: {},
        error: error.details || {},
      });
  }
}

async function getActiveAirplanes(req, res) {
  try {
    const activeAirplanes = await AirplaneService.getAllActive();
    (SuccessResponse.message = responsesError.activeAirplanesMessage[0]),
      (SuccessResponse.data = activeAirplanes);
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = responsesError.activeAirplanesMessage[1];
    ErrorResponse.error = error;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
  }
}

async function getInactiveAirplanes(req, res) {
  try {
    const activeAirplanes = await AirplaneService.getAllInactive();
    (SuccessResponse.message = responsesError.InActiveAirplanesMessage[0]),
      (SuccessResponse.data = activeAirplanes);
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = responsesError.InActiveAirplanesMessage[1];
    ErrorResponse.error = error;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
  }
}

async function searchAirplanes(req, res) {
  try {
    const {
      modelNumber,
      registerationNumber,
      isActive,
      page = 1,
      limit = 10,
    } = req.query;

    // Validate and convert parameters
    const pageNumber = Math.max(1, parseInt(page)) || 1;
    const limitNumber = Math.min(100, Math.max(1, parseInt(limit))) || 10;

    const filters = {
      ...(modelNumber && { modelNumber }),
      ...(registerationNumber && { registerationNumber }),
      ...(isActive !== undefined && { isActive }),
    };

    const { count, rows } = await AirplaneService.search({
      filters,
      pagination: {
        offset: (pageNumber - 1) * limitNumber,
        limit: limitNumber,
      },
    });

    // Calculate total pages
    const totalPages = Math.max(1, Math.ceil(count / limitNumber));

    // Validate requested page exists
    if (pageNumber > totalPages) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: `Requested page ${pageNumber} doesn't exist. Total pages: ${totalPages}`,
        data: {
          totalItems: count,
          totalPages,
          currentPage: pageNumber,
          itemsPerPage: limitNumber,
          results: [],
        },
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Search completed successfully",
      data: {
        totalItems: count,
        totalPages,
        currentPage: pageNumber,
        itemsPerPage: limitNumber,
        results: rows,
      },
    });
  } catch (error) {
    // Error handling remains the same
  }
}

async function filterCapacity(req, res) {
  try {
    const { minCapacity, maxCapacity, page = 1, limit = 10 } = req.query;

    // Convert and validate
    const filters = {
      ...(minCapacity !== undefined && { minCapacity: parseInt(minCapacity) }),
      ...(maxCapacity !== undefined && { maxCapacity: parseInt(maxCapacity) }),
    };

    // Validate at least one filter exists
    if (!minCapacity && !maxCapacity) {
      throw new AppError(
        "Must provide at least minCapacity or maxCapacity",
        400
      );
    }

    const { count, rows } = await AirplaneService.filterCapacity({
      ...filters,
      page: parseInt(page),
      limit: parseInt(limit),
    });

    return res.status(200).json({
      success: true,
      message: "Airplanes filtered successfully",
      data: {
        totalItems: count,
        totalPages: Math.ceil(count / limit),
        currentPage: parseInt(page),
        itemsPerPage: parseInt(limit),
        results: rows.map((plane) => ({
          ...plane.get({ plain: true }),
          totalSeats: plane.totalSeats, // Include calculated total
        })),
      },
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
      data: null,
      error:
        process.env.NODE_ENV === "development"
          ? {
              details: error.stack,
            }
          : null,
    });
  }
}

async function getAirPlaneManufactureDetaild(req, res) {
  try {
    const { manufacturer } = req.params;
    if (!manufacturer) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: responsesError.getAirPlaneManufactureMessage[2],
      });
    }
    const airplanes = await AirplaneService.getAirPlaneManufacture(
      manufacturer
    );

    SuccessResponse.message = responsesError.getAirPlaneManufactureMessage[0];
    SuccessResponse.data = airplanes;

    // Add this return statement
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = responsesError.getAirPlaneManufactureMessage[1];
    ErrorResponse.error = error;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
  }
}

async function bulkAirplanesCreate(req, res) {
  try {
    const { airplanes } = req.body;

    if (!airplanes) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: responsesError.bulkCreateAirplaneMessage[2],
      });
    }

    const createdAirplanes = await AirplaneService.bulkCreateAirplanes(airplanes);

    SuccessResponse.message = responsesError.bulkCreateAirplaneMessage[0];
    SuccessResponse.data = createdAirplanes;

    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    console.error("Bulk create error:", error);
    ErrorResponse.message = responsesError.bulkCreateAirplaneMessage[1];
    ErrorResponse.error = error.message || error;

    const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    return res.status(statusCode).json(ErrorResponse);
  }
}

async function bulkUpdateAirplanes(req,res) {
  try {
    const {airplanes} = req.body;
    const updateAirplanes = await AirplaneService.bulkUpdateAirplanes(airplanes);
    return res.status(StatusCodes.OK).json({
      success:true,
      message:responsesError.bulkUpdateAirplaneMessage[1],
      data:updateAirplanes
    });
  } catch (error) {
     console.error("Bulk update error:", error);
    return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: responsesError.bulkUpdateAirplaneMessage[2],
      error: error.message || error,
    });
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
  getInactiveAirplanes,
  searchAirplanes,
  filterCapacity,
  getAirPlaneManufactureDetaild,
  bulkAirplanesCreate,
  bulkUpdateAirplanes
};
