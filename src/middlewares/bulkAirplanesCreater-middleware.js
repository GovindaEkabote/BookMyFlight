function validateBulkCreate(req, res, next) {
  const { airplanes } = req.body;

  if (!airplanes || !Array.isArray(airplanes)) {
    return res.status(400).json({
      success: false,
      message: "Aircrafts array is required and must be an array",
    });
  }

  for (const airplane of airplanes) {
    const {
      modelNumber,
      manufacturer,
      registerationNumber,
      economySeats,
      businessSeats,
      firstClassSeats,
    } = airplane;

    if (!modelNumber || !manufacturer || !registerationNumber ||
        economySeats === undefined || businessSeats === undefined || firstClassSeats === undefined) {
      return res.status(400).json({
        success: false,
        message: "Each aircraft must have modelNumber, manufacturer, registerationNumber, and seat counts"
      });
    }

    if (!/^[A-Za-z0-9-]+$/.test(registerationNumber)) {
      return res.status(400).json({
        success: false,
        message: "Registeration number must be alphanumeric with optional hyphens"
      });
    }

    if (economySeats < 0 || businessSeats < 0 || firstClassSeats < 0) {
      return res.status(400).json({
        success: false,
        message: "Seat counts cannot be negative"
      });
    }
  }

  next();
}

module.exports = { validateBulkCreate };
