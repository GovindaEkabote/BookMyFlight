const { StatusCodes } = require("http-status-codes");
const { AirplaneService } = require("../services");

/**
 *
 * POST : /airplanes
 * req-body {modelNumber, capacity,companyName,country}
 */

async function createAirplane(req, res) {
  try {
    const airplane = await AirplaneService.createAirplane({
      modelNumber: req.body.modelNumber,
      capacity: req.body.capacity,
      companyName: req.body.companyName,
      country: req.body.country,
    });
    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Airplan  has been register successfully",
      data: airplane,
      error: {},
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Airplan failed to register",
      data: {},
      error: error,
    });
  }
}

module.exports = {
  createAirplane,
};
