const { StatusCodes } = require("http-status-codes");
const { MaintenanceService } = require("../services");
const { ErrorResponse, SuccessResponse } = require("../utils/common");
const { responsesError } = require("../utils/constant");
const AppError = require("../utils/errors/app-error");

async function create(req, res) {
  try {
    const maintenanceData = {
      ...req.body,
      airplaneId: req.params.airplaneId,
    };
    const record = await MaintenanceService.createMaintenanceRecord(
      maintenanceData
    );
    SuccessResponse.message = "Maintenance record created successfully";
    SuccessResponse.data = record;

    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    console.error("Error in maintenanceController.create:", error);

    ErrorResponse.message =
      error.message || "Something went wrong in MaintenanceController";
    ErrorResponse.error = error;

    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponse);
  }
}

async function get(req, res) {
  try {
    
    const record = await MaintenanceService.getMaintenenceStatus(req.params.id);
    SuccessResponse.message = "Successfully fetched maintenance records";
    SuccessResponse.data = record;

    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    console.error("Error in maintenanceController.get:", error);

    ErrorResponse.message =
      error.message || "Something went wrong in MaintenanceController.get";
    ErrorResponse.error = error;

    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponse);
  }
}

async function getAirplanesByStatus(req, res) {
  try {
    const {status} = req.params;
    
    const record = await MaintenanceService.getAirplanesByMaintenanceStatus(status);
    SuccessResponse.message = "Successfully fetched maintenance records";
    SuccessResponse.data = record;

    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    console.error("Error in maintenanceController.get:", error);

    ErrorResponse.message =
    error.message || "Something went wrong in MaintenanceController.get";
    ErrorResponse.error = error;

    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponse);
  }
}

async function getPendingMaintenance(req, res) {
  try {
    const {page, limit, offset} = req.pagination;
    const pendingRecords = await MaintenanceService.getPendingMaintenance(page, limit, offset);
      SuccessResponse.message = "Successfully fetched maintenance records";
    SuccessResponse.data = pendingRecords;

    return res.status(StatusCodes.OK).json(SuccessResponse);
    
  } catch (error) {    
    return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || "Failed to fetch pending maintenance records",
      data: {},
      error: {
        statusCode: error.statusCode,
        explanation: error.explanation
      }
    });
  }
}

module.exports = {
  create,
  get,
  getAirplanesByStatus,
  getPendingMaintenance
};
