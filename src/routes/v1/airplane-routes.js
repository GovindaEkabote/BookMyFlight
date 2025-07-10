const express = require("express");
const router = express.Router();
const { AirPlaneController } = require("../../controllers");
const {
  AirPlaneMiddleware,
  rateLimiter,
  bulkCreateorValidator,bulkUpdateValidator
} = require("../../middlewares");
// const limiter = require("../../middlewares/rateLimit");
const { query } = require("express-validator");

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
router.get("/active", AirPlaneController.getActiveAirplanes);
router.get("/in-active", AirPlaneController.getInactiveAirplanes);

// Airplanes Search and Filtering
router.get("/search", rateLimiter.limiter, AirPlaneController.searchAirplanes);
router.get(
  "/filter",
  [
    query("minCapacity").optional().isInt({ min: 0 }).toInt(),
    query("maxCapacity").optional().isInt({ min: 0 }).toInt(),
    query("minEconomy").optional().isInt({ min: 0 }).toInt(),
    query("maxEconomy").optional().isInt({ min: 0 }).toInt(),
    query("minBusiness").optional().isInt({ min: 0 }).toInt(),
    query("maxBusiness").optional().isInt({ min: 0 }).toInt(),
    query("minFirstClass").optional().isInt({ min: 0 }).toInt(),
    query("maxFirstClass").optional().isInt({ min: 0 }).toInt(),
    query("page").optional().isInt({ min: 1 }).default(1).toInt(),
    query("limit").optional().isInt({ min: 1, max: 100 }).default(10).toInt(),
  ],
  AirPlaneController.filterCapacity
);
router.get(
  "/manufacturer/:manufacturer",
  AirPlaneController.getAirPlaneManufactureDetaild
);

/*
  // Utilization
router.get('/airplane/:id/flights', AirPlaneController.getAircraftFlights);
router.get('/airplane/:id/utilization', AirPlaneController.getAircraftUtilization);
router.get('/airplanes/available', AirPlaneMiddleware.checkAircraftAvailability, AirPlaneController.getAvailableAircrafts);
  */


// Bulk operations
router.post(
  "/bulk-create",
  bulkCreateorValidator.validateBulkCreate,
  AirPlaneController.bulkAirplanesCreate
);

router.put(
  "/bulk-update",
  bulkUpdateValidator.validateBulkUpdate,
  AirPlaneController.bulkUpdateAirplanes
);

// Maintenance (optional)


module.exports = router;
