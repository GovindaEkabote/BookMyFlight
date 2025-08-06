const { StatusCodes } = require("http-status-codes");
const { usersRepositories } = require("../repositories");
const AppError = require("../utils/errors/app-error");
const { Op, Sequelize, literal, where } = require("sequelize");
const { responsesError } = require("../utils/constant");
const usersRegisterRepositories = new usersRepositories();


async function userRegister(data) {
  try {
    const user = await usersRegisterRepositories.create(data);
    return user;
  } catch (error) {
    if (error.name == "SequelizeValidationError") {
      let explanation = [];
      error.errors.array.forEach((err) => {
        explanation.push(err.message);
      });
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      "Cannot Register New User",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
    userRegister
}