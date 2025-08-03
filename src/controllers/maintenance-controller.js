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
    SuccessResponse.message = responsesError.maintanance[2];
    SuccessResponse.data = record;

    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    console.error("Error in maintenanceController.create:", error);

    ErrorResponse.message =
      error.message || responsesError.maintanance[3];
    ErrorResponse.error = error;

    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponse);
  }
}

async function get(req, res) {
  try {
    
    const record = await MaintenanceService.getMaintenenceStatus(req.params.id);
    SuccessResponse.message = responsesError.maintanance[0];
    SuccessResponse.data = record;

    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    console.error("Error in maintenanceController.get:", error);

    ErrorResponse.message =
      error.message || responsesError.maintanance[1];
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
    SuccessResponse.message = responsesError.getAirplanesByStatus[0];
    SuccessResponse.data = record;

    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    console.error("Error in maintenanceController.get:", error);

    ErrorResponse.message =
    error.message || responsesError.getAirplanesByStatus[1];
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
    SuccessResponse.message = responsesError.getPendingMaintenance[0];
    SuccessResponse.data = pendingRecords;

    return res.status(StatusCodes.OK).json(SuccessResponse);
    
  } catch (error) {    
    return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || responsesError.getPendingMaintenance[1],
      data: {},
      error: {
        statusCode: error.statusCode,
        explanation: error.explanation
      }
    });
  }
}

async function updateMaintenanceRecord(req,res) {
  try {
    const record = await MaintenanceService.updateMaintenanceRecord(
      req.params.id,
      req.body
    )
      SuccessResponse.message = responsesError.update[0];
    SuccessResponse.data = record;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    return res.status(error.StatusCodes || StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || responsesError.update[1],
      data: {},
      error: {
        statusCode: error.statusCode,
        explanation: error.explanation
      }
    })
  }
}

async function deleteMaintenanceRecord(req,res) {
  try {
    const record = await MaintenanceService.deleteMaintenanceRecord(req.params.id)
    SuccessResponse.message = responsesError.delete[0];
    SuccessResponse.data = record;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    return res.status(error.StatusCodes || StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || responsesError.delete[1],
      data: {},
      error: {
        statusCode: error.statusCode,
        explanation: error.explanation
      }
    })
  }
}

module.exports = {
  create,
  get,
  getAirplanesByStatus,
  getPendingMaintenance,
  updateMaintenanceRecord,
  deleteMaintenanceRecord
};
