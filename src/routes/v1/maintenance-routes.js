const express = require("express");
const router = express.Router();
const { MaintenanceController } = require("../../controllers");
const { MaintenanceValidator, Pagination } = require("../../middlewares");

// Create maintenance record for airplane
router.post(
  "/:airplaneId",
  MaintenanceValidator.validateCreator,
  MaintenanceController.create
);
// Get specific maintenance record
router.get("/:id", MaintenanceController.get);

// Get all maintenance records for airplane
router.get("/maintanance/:status", MaintenanceController.getAirplanesByStatus);

// Get all pending maintenance (scheduled/in-progress)
router.get(
  "/maintenance/pending",
  Pagination({ defaultLimit: 20, maxLimit: 50 }),
  MaintenanceController.getPendingMaintenance
);

// Update maintenance record
router.put(
  "/update/:id",
  MaintenanceValidator.validateUpdate,
  MaintenanceController.updateMaintenanceRecord
);

// delete maintenanace record..
router.delete(
  "/delete/:id",
  MaintenanceController.deleteMaintenanceRecord
);

module.exports = router;
