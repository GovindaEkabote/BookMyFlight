const { StatusCodes } = require("http-status-codes");
const {
  AirplaneRepositories,
  MaintenanceRepositories,
} = require("../repositories");
const AppError = require("../utils/errors/app-error");
const { responsesError } = require("../utils/constant");

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

module.exports = {
  createMaintenanceRecord,
};
