const express = require("express");
const router = express.Router();
const { AirPlaneController } = require("../../controllers");
const { AirPlaneMiddleware } = require("../../middlewares");

// /api/v1/airplanes/register : POST
// Create and basic CRUD
router.post(
  "/register",
  AirPlaneMiddleware.validateCreateRequest,
  AirPlaneController.createAirplane
);
router.get("/airplanes", AirPlaneController.getAllAirplanes);
router.get("/airplane/:id", AirPlaneController.getAllAirplane);
router.put("/airplane/update/:id", AirPlaneController.updateAirPlane);
router.delete("/airplane/delete/:id", AirPlaneController.destroyAirPlane);
router.delete("/airplane/delete-all", AirPlaneController.destroyAllAirplanes);

// Status management
router.put("/active/:id", AirPlaneController.toggleAircraftStatus);
router.get('/active', AirPlaneController.getActiveAirplanes);
router.get('/in-active', AirPlaneController.getInactiveAirplanes);

// Airplanes Search and Filtering
router.get('/search', AirPlaneController.searchAirplanes);

module.exports = router;
