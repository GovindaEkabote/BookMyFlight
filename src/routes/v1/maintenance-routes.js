const express = require("express");
const router = express.Router();
const { MaintenanceController } = require("../../controllers");
const { MaintenanceValidator, Pagination } = require("../../middlewares");

router.post(
  "/:airplaneId",
  MaintenanceValidator.validateCreator,
  MaintenanceController.create
);

router.get("/:id", MaintenanceController.get);

router.get("/maintanance/:status", MaintenanceController.getAirplanesByStatus);

router.get(
  "/maintenance/pending",
  Pagination({ defaultLimit: 20, maxLimit: 50 }),
  MaintenanceController.getPendingMaintenance
);

router.put(
  "/update/:id",
  MaintenanceValidator.validateUpdate,
  MaintenanceController.updateMaintenanceRecord
);

module.exports = router;
