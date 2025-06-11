const { StatusCodes } = require("http-status-codes");
const { AirplaneService } = require("../services");

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
          "Missing required fields: modelNumber, capacity, companyName, country",
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
    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Airplane has been registered successfully",
      data: airplane,
      error: {},
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Airplane registration failed",
      data: {},
      error: error,
    });
  }
}

module.exports = {
  createAirplane,
};
