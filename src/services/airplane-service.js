const { StatusCodes } = require("http-status-codes");
const { AirplaneRepositories } = require("../repositories");
const AppError = require("../utils/errors/app-error");
const { Op } = require("sequelize");

const airplaneRepository = new AirplaneRepositories();

async function createAirplane(data) {
  try {
    const airplane = await airplaneRepository.create(data);
    return airplane;
  } catch (error) {
    if(error.name == 'SequelizeValidationError'){
      let explanation = [];
      error.errors.array.forEach((err) => {
        explanation.push(err.message)
      });
      throw new AppError(explanation, StatusCodes.BAD_REQUEST); 
    }
      throw new AppError('Cannot create a new Airplance object', StatusCodes.INTERNAL_SERVER_ERROR);

  }
}

async function getAirPlanes() {
  try {
    const airplanes = await airplaneRepository.getAll();
    return airplanes
  } catch (error) {
    throw new AppError ('cannot fetch data of all the airplanes', StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

async function getAirPlane(id) {
   try {
    const airplanes = await airplaneRepository.get(id);
     if (!airplanes) {
      throw new AppError(`Airplane with id ${id} not found`, StatusCodes.NOT_FOUND);
    }
    return airplanes
  } catch (error) {
    throw new AppError (`cannot fetch data of the airplane ${id}`, StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

async function updateAirPlane(id, data) {
  try {
    const update = await airplaneRepository.update(id, data); 
    return update;
  } catch (error) {
    throw new AppError(`Cannot update airplane with ID ${id}`, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function deleteAirPlane(id) {
   try {
    const deleteAirPlane = await airplaneRepository.destroy(id);
    return deleteAirPlane
  } catch (error) {
    throw new AppError (`cannot delete airplane ${id}`, StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

async function destroyAllAirplanes() {
  try {
    const deletedCount = await airplaneRepository.destroyAll(true); 
    return deletedCount;
  } catch (error) {
    throw new AppError("Cannot delete all airplanes", StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function updateAirplaneStatus(id, data) {
  try {
    const updatedCount = await airplaneRepository.update(id, data);
    
    if (updatedCount === null) {
      throw new AppError("No airplane found to update", StatusCodes.NOT_FOUND);
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
    const activeAirplane =  await airplaneRepository.getAll({
    where:{isActive:true}
  })
  if(!activeAirplane || activeAirplane.length ==0){
      throw new AppError(`No active airplanes found`, StatusCodes.NOT_FOUND);
  }
  return activeAirplane;
  } catch (error) {
    if (error instanceof AppError) {
      throw error; // Re-throw custom AppError
    }
    throw new AppError(
      'Failed to fetch active airplanes',
      StatusCodes.INTERNAL_SERVER_ERROR,
      error.message
    );
  }
}

async function getAllInactive() {
  try {
    const activeAirplane =  await airplaneRepository.getAll({
    where:{isActive:false}
  })
  if(!activeAirplane || activeAirplane.length ==0){
      throw new AppError(`No inactive airplanes found`, StatusCodes.NOT_FOUND);
  }
  return activeAirplane;
  } catch (error) {
    if (error instanceof AppError) {
      throw error; // Re-throw custom AppError
    }
    throw new AppError(
      'Failed to fetch inactive airplanes',
      StatusCodes.INTERNAL_SERVER_ERROR,
      error.message
    );
  }

}

async function search(filters = {}) {
  try {
    if (!filters || typeof filters !== "object") {
      throw new AppError("Invalid filters parameter", StatusCodes.BAD_REQUEST);
    }

    const where = {};

    // modelNumber
    if (filters.modelNumber) {
      if (typeof filters.modelNumber !== "string") {
        throw new AppError("modelNumber must be a string", StatusCodes.BAD_REQUEST);
      }
      where.modelNumber = { [Op.like]: `%${filters.modelNumber}%` };
    }

    // registerationNumber
    if (filters.registerationNumber) {
      if (typeof filters.registerationNumber !== "string") {
        throw new AppError("registerationNumber must be a string", StatusCodes.BAD_REQUEST);
      }
      where.registerationNumber = { [Op.like]: `%${filters.registerationNumber}%` };
    }

    // isActive (optional)
    if (filters.isActive !== undefined) {
      const isActiveStr = String(filters.isActive).toLowerCase();
      if (!["true", "false"].includes(isActiveStr)) {
        throw new AppError("isActive must be a boolean (true/false)", StatusCodes.BAD_REQUEST);
      }
      where.isActive = isActiveStr === "true";
    }

    if (Object.keys(where).length === 0) {
      throw new AppError("At least one search parameter is required", StatusCodes.BAD_REQUEST);
    }

    const airplanes = await airplaneRepository.getSearch({ where });

    if (!airplanes || airplanes.length === 0) {
      throw new AppError("No airplanes found matching your criteria", StatusCodes.NOT_FOUND);
    }

    return airplanes;

  } catch (error) {
    console.error("Search service error:", error);

    if (error instanceof AppError) throw error;

    // 💥 FIXED: Pass details as an object
    throw new AppError(
      error.message || "Search failed",
      StatusCodes.INTERNAL_SERVER_ERROR,
      { stack: error.stack }
    );
  }
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
}
