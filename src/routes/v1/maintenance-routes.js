const express = require("express");
const router = express.Router();
const { MaintenanceController } = require("../../controllers");
const { MaintenanceValidator } = require("../../middlewares");

router.post(
  "/:airplaneId",
  MaintenanceValidator.validateCreator,
  MaintenanceController.create
);

router.get("/:id", MaintenanceController.get);

router.get("/maintanance/:status", MaintenanceController.getAirplanesByStatus);
router.get(
  "/maintenance/pending",
  MaintenanceController.getPendingMaintenance
);

module.exports = router;
