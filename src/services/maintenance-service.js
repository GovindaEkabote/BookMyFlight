const { StatusCodes } = require("http-status-codes");
const {
  AirplaneRepositories,
  MaintenanceRepositories,
} = require("../repositories");
const AppError = require("../utils/errors/app-error");
const { responsesError } = require("../utils/constant");
const logger = require("../config/logger.config");

const airplaneRepository = new AirplaneRepositories();
const maintenanceRepositories = new MaintenanceRepositories();

async function createMaintenanceRecord(data) {
  try {
    const airplane = await airplaneRepository.get(data.airplaneId);
    if (!airplane) {
      throw new AppError(
        `Airplane with id ${data.airplaneId} not found`,
        StatusCodes.NOT_FOUND
      );
    }

    if (data.endDate && new Date(data.endDate) <= new Date(data.startDate)) {
      throw new AppError(
        "End date must be after start date",
        StatusCodes.BAD_REQUEST
      );
    }

    return await maintenanceRepositories.create(data);
  } catch (error) {
    throw new AppError(
      `Error in MaintenanceService: createMaintenanceRecord - ${error.message}`,
      error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getMaintenenceStatus(id) {
  try {
    const records = await maintenanceRepositories.getByMaintenanceId(id);

    if (!records || records.length === 0) {
      throw new AppError("No maintenance records found", StatusCodes.NOT_FOUND);
    }

    return records;
  } catch (error) {
    logger.error(
      `Error in maintenance-service: getMaintenanceStatus - ${error.message}`
    );

    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError(
      "Unable to fetch maintenance records",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAirplanesByMaintenanceStatus(status) {
  try {
    // Validate the status input
    const validStatuses = [
      "scheduled",
      "in-progress",
      "completed",
      "delayed",
      "cancelled",
    ];
    if (!validStatuses.includes(status)) {
      throw new AppError("Invalid maintenance status", StatusCodes.BAD_REQUEST);
    }

    const records = await maintenanceRepositories.getAirplanesByStatus(status);

    if (!records || records.length === 0) {
      throw new AppError(
        `No airplanes found with ${status} maintenance`,
        StatusCodes.NOT_FOUND
      );
    }

    return records.map((record) => ({
      maintenanceRecord: {
        id: record.id,
        type: record.maintenanceType,
        startDate: record.startDate,
        endDate: record.endDate,
        status: record.status
      },
      airplane: record.airplane
    }));
  } catch (error) {
    logger.error(
      `Error in MaintenanceService: getAirplanesByMaintenanceStatus - ${error.message}`
    );
    console.log("Error Message: ", error);
    throw new AppError(
      "Unable to fetch maintenance records",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getPendingMaintenance(page, limit, offset) {
  try {
    const maintenanceRecords = await maintenanceRepositories.getPendingMaintenance(limit, offset);
    return maintenanceRecords;
  } catch (error) {
    logger.error(`Error in MaintenanceService: getPendingMaintenance - ${error.message}`);
    throw new AppError(
      responsesError.getPendingMaintenance[2],
      StatusCodes.INTERNAL_SERVER_ERROR,
      error.message
    );
  }
}

async function updateMaintenanceRecord(id, updateData) {
  try {
    const record = await maintenanceRepositories.update(id,updateData);
    if(!record){
      throw new AppError(
        `Maintanance record not found`,
        StatusCodes.NOT_FOUND
      );
    }    
    if(updateData.airplaneId && updateData.airplaneId !== record.airplaneId){
      throw new Error('Cannot change airplane for existing maintenance record');
    }
    return record;
  } catch (error) {
     logger.error(`Error in MaintenanceService: updateMaintenanceRecord - ${error.message}`);
    throw new AppError(
      responsesError.getPendingMaintenance[2],
      StatusCodes.INTERNAL_SERVER_ERROR,
      error.message
    );
  }
}


async function deleteMaintenanceRecord(id) {
  try {
    const record = await maintenanceRepositories.delete(id);
    if(!record){
      throw new AppError(
        `Maintanance record not found`,
        StatusCodes.NOT_FOUND
      );
    }    
    return record;
  } catch (error) {
     logger.error(`Error in MaintenanceService: deleteMaintenanceRecord - ${error.message}`);
    throw new AppError(
      responsesError.getPendingMaintenance[2],
      StatusCodes.INTERNAL_SERVER_ERROR,
      error.message
    );
  }
}

module.exports = {
  createMaintenanceRecord,
  getMaintenenceStatus,
  getAirplanesByMaintenanceStatus,
  getPendingMaintenance,
  updateMaintenanceRecord,
  deleteMaintenanceRecord
};
