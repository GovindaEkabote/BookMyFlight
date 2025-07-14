const express = require("express");
const router = express.Router();
const { MaintenanceController } = require("../../controllers");
const {
  MaintenanceValidator
} = require("../../middlewares");

router.post(
  "/:airplaneId",
  MaintenanceValidator.validateCreator,
  MaintenanceController.create
);

module.exports = router;