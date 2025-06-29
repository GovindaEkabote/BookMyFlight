const { StatusCodes } = require("http-status-codes");
const { AirplaneRepositories } = require("../repositories");
const AppError = require("../utils/errors/app-error");

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


module.exports = {
    createAirplane,
    getAirPlanes,
    getAirPlane,
    updateAirPlane,
    deleteAirPlane,
    destroyAllAirplanes
}
