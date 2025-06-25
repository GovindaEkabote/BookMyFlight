const { StatusCodes } = require("http-status-codes");
const { AirplaneService } = require("../services");
const {ErrorResponse, SuccessResponse} = require('../utils/common');
const { responsesError } = require("../utils/constant");

/**
 *
 * POST : /airplanes
 * req-body {modelNumber, capacity,companyName,country}
 */

async function createAirplane(req, res) {
  try {   
    const { modelNumber, capacity, companyName, country } = req.body;
    if (!modelNumber || !capacity || !companyName || !country) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message:
          responsesError.AllFieldsRequired,
        data: {},
        error: {},
      });
    }
    const airplane = await AirplaneService.createAirplane({
      modelNumber,
      capacity,
      companyName,
      country,
    });
    SuccessResponse.data = airplane
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = 'Airplane registration failed';
    ErrorResponse.error = error;

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
  }
}

module.exports = {
  createAirplane,
};
