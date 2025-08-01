const { StatusCodes } = require("http-status-codes");
const { AirplaneRepositories } = require("../repositories");
const AppError = require("../utils/errors/app-error");
const { Op, Sequelize, literal, where } = require("sequelize");
const { responsesError } = require("../utils/constant");
const airplaneRepository = new AirplaneRepositories();

async function createAirplane(data) {
  try {
    const airplane = await airplaneRepository.create(data);
    return airplane;
  } catch (error) {
    if (error.name == "SequelizeValidationError") {
      let explanation = [];
      error.errors.array.forEach((err) => {
        explanation.push(err.message);
      });
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      "Cannot create a new Airplance object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAirPlanes() {
  try {
    const airplanes = await airplaneRepository.getAll();
    return airplanes;
  } catch (error) {
    throw new AppError(
      responsesError.CanNotFetchAllAiroplanes,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAirPlane(id) {
  try {
    const airplanes = await airplaneRepository.get(id);
    if (!airplanes) {
      throw new AppError(
        `Airplane with id ${id} not found`,
        StatusCodes.NOT_FOUND
      );
    }
    return airplanes;
  } catch (error) {
    throw new AppError(
      `cannot fetch data of the airplane ${id}`,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function updateAirPlane(id, data) {
  try {
    const update = await airplaneRepository.update(id, data);
    return update;
  } catch (error) {
    throw new AppError(
      `Cannot update airplane with ID ${id}`,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function deleteAirPlane(id) {
  try {
    const deleteAirPlane = await airplaneRepository.destroy(id);
    return deleteAirPlane;
  } catch (error) {
    throw new AppError(
      `cannot delete airplane ${id}`,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function destroyAllAirplanes() {
  try {
    const deletedCount = await airplaneRepository.destroyAll(true);
    return deletedCount;
  } catch (error) {
    throw new AppError(
      responsesError.CanNotDeleteAiroplanes,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function updateAirplaneStatus(id, data) {
  try {
    const updatedCount = await airplaneRepository.update(id, data);

    if (updatedCount === null) {
      throw new AppError(
        responsesError.NoAiroplanesFound,
        StatusCodes.NOT_FOUND
      );
    }

    // Fetch the updated airplane to return complete data
    const updatedAirplane = await airplaneRepository.get(id);
    return updatedAirplane;
  } catch (error) {
    throw new AppError(
      `Failed to update airplane: ${error.message}`,
      error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAllActive() {
  try {
    const activeAirplane = await airplaneRepository.getAll({
      where: { isActive: true },
    });
    if (!activeAirplane || activeAirplane.length == 0) {
      throw new AppError(responsesError.ActivePlanes, StatusCodes.NOT_FOUND);
    }
    return activeAirplane;
  } catch (error) {
    if (error instanceof AppError) {
      throw error; // Re-throw custom AppError
    }
    throw new AppError(
      responsesError.FailedToFetchActiveAirplanes,
      StatusCodes.INTERNAL_SERVER_ERROR,
      error.message
    );
  }
}

async function getAllInactive() {
  try {
    const activeAirplane = await airplaneRepository.getAll({
      where: { isActive: false },
    });
    if (!activeAirplane || activeAirplane.length == 0) {
      throw new AppError(
        responsesError.InActiveAirplanes,
        StatusCodes.NOT_FOUND
      );
    }
    return activeAirplane;
  } catch (error) {
    if (error instanceof AppError) {
      throw error; // Re-throw custom AppError
    }
    throw new AppError(
      responsesError.InActiveAirplanesFailed,
      StatusCodes.INTERNAL_SERVER_ERROR,
      error.message
    );
  }
}

async function search({ filters, pagination }) {
  try {
    const where = {};

    if (filters.modelNumber) {
      where.modelNumber = {
        [Op.like]: `%${filters.modelNumber.replace(/%/g, "\\%")}%`,
      };
    }

    if (filters.registerationNumber) {
      where.registerationNumber = {
        [Op.like]: `%${filters.registerationNumber.replace(/%/g, "\\%")}%`,
      };
    }

    if (filters.isActive !== undefined) {
      where.isActive = filters.isActive;
    }

    const options = {
      where,
      ...(pagination && {
        offset: pagination.offset,
        limit: pagination.limit,
      }),
    };

    console.log("Final search options:", JSON.stringify(options, null, 2));

    const result = await airplaneRepository.findAndCountAll(options);
    return result;
  } catch (error) {
    console.error("Search service error:", {
      message: error.message,
      stack: error.stack,
      filters,
      pagination,
    });

    throw new AppError(
      "Search operation failed: " + error.message,
      StatusCodes.INTERNAL_SERVER_ERROR,
      { originalError: error.message }
    );
  }
}

async function filterCapacity({
  minCapacity,
  maxCapacity,
  page = 1,
  limit = 10,
}) {
  try {
    // Validate inputs
    if (minCapacity && isNaN(minCapacity))
      throw new AppError(responsesError.MinCapacity, 400);
    if (maxCapacity && isNaN(maxCapacity))
      throw new AppError(responsesError.MaxCapacity, 400);

    const totalSeatsExpr = literal(
      "(economySeats + businessSeats + firstClassSeats)"
    );

    const where = { [Op.and]: [] };

    if (minCapacity) {
      where[Op.and].push(
        Sequelize.where(totalSeatsExpr, { [Op.gte]: minCapacity })
      );
    }

    if (maxCapacity) {
      where[Op.and].push(
        Sequelize.where(totalSeatsExpr, { [Op.lte]: maxCapacity })
      );
    }

    const options = {
      where,
      attributes: {
        include: [[totalSeatsExpr, "totalSeats"]],
      },
      offset: (page - 1) * limit,
      limit,
      order: [[totalSeatsExpr, "ASC"]],
    };

    console.log("Final filter options:", JSON.stringify(options, null, 2));

    const result = await airplaneRepository.findAndCountAll(options);

    return result;
  } catch (error) {
    console.error("Filter error:", error);
    throw new AppError(
      `Capacity filter failed: ${error.message}`,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAirPlaneManufacture(manufacturer) {
  const result = await airplaneRepository.findByManufacturer(manufacturer);

  if (!result || result.rows.length === 0) {
    throw new AppError(
      responsesError.getAirPlaneManufactureMessage[3], // "No airplanes found for the specified manufacturer"
      StatusCodes.NOT_FOUND
    );
  }

  return result;
}

async function bulkCreateAirplanes(aircrafts) {
  if (!aircrafts || aircrafts.length === 0) {
    throw new AppError(responsesError.bulkCreateAirplaneMessage[3], StatusCodes.BAD_REQUEST);
  }

  const registerationNumbers = aircrafts.map((a) => a.registerationNumber);

  if (new Set(registerationNumbers).size !== registerationNumbers.length) {
    throw new AppError(responsesError.bulkCreateAirplaneMessage[4], StatusCodes.BAD_REQUEST);
  }

  const existingAirplanes = await airplaneRepository.findByRegistrationNumbers(registerationNumbers);

  if (existingAirplanes.length > 0) {
    throw new AppError(
      responsesError.bulkCreateAirplaneMessage[5],
      StatusCodes.CONFLICT,
      { duplicates: existingAirplanes.map((a) => a.registerationNumber) }
    );
  }

  const createdAirplanes = await airplaneRepository.bulkCreate(aircrafts);

  if (!createdAirplanes || createdAirplanes.length === 0) {
    throw new AppError(responsesError.bulkCreateAirplaneMessage[6], StatusCodes.INTERNAL_SERVER_ERROR);
  }

  return createdAirplanes;
}

async function bulkUpdateAirplanes(airplanes) {
  const result = await airplaneRepository.bulkUpdate(airplanes);
  if(!result || result.length === 0){
    throw new AppError(
      responsesError.bulkUpdateAirplaneMessage[0],
      StatusCodes.INTERNAL_SERVER_ERROR
    )
  }
  return result;
}

module.exports = {
  createAirplane,
  getAirPlanes,
  getAirPlane,
  updateAirPlane,
  deleteAirPlane,
  destroyAllAirplanes,
  updateAirplaneStatus,
  getAllActive,
  getAllInactive,
  search,
  filterCapacity,
  getAirPlaneManufacture,
  bulkCreateAirplanes,
  bulkUpdateAirplanes
};
