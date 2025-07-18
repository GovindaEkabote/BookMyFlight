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

router.get("/:status", MaintenanceController.getAirplanesByStatus);

module.exports = router;
