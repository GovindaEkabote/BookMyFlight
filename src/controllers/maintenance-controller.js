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

    ErrorResponse.message = error.message || "Something went wrong in MaintenanceController";
    ErrorResponse.error = error;
    
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponse);
  }

}

module.exports = {
    create
}
