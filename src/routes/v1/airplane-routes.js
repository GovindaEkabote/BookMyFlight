const express = require("express");
const router = express.Router();
const { AirPlaneController } = require("../../controllers");
const { AirPlaneMiddleware } = require("../../middlewares");

// /api/v1/airplanes/register : POST
router.post(
  "/register",
  AirPlaneMiddleware.validateCreateRequest,
  AirPlaneController.createAirplane
);

router.get("/airplanes", AirPlaneController.getAllAirplanes)

router.get("/airplane/:id", AirPlaneController.getAllAirplane)

module.exports = router;
