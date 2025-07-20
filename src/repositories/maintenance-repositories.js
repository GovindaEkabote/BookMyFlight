const CrudRepositories = require("./crud-repositories");
const { MaintenanceRecord } = require("../models");
const { Logger } = require("../config");

class MaintenanceRepositories extends CrudRepositories {
  constructor() {
    super(MaintenanceRecord);
  }

  async getByAirplane(airplaneId) {
    try {
      return await this.model.findAll({
        where: { airplaneId },
        order: [["startDate", "DESC"]],
      });
    } catch (error) {
      Logger.error("Error in MaintenanceRepository: getByAirplane");
    }
  }

  async getByMaintenanceId(id) {
    try {
      return await this.model.findAll({
        where: { id },
        include: ["airplane"],
      });
    } catch (error) {
      Logger.error("Error in MaintenanceRepository: getByMaintenanceId");
      throw error;
    }
  }

  async getAirplanesByStatus(status) {
    try {
      return await this.model.findAll({
        where: { status },
        include: [
          {
            association: "airplane",
            required: true,
          },
        ],
        order: [["createdAt", "DESC"]],
      });
    } catch (error) {
      console.error("Repository error:", error);
      Logger.error("Error in MaintenanceRepository: getAirplanesByStatus");
      throw error;
    }
  }

  async getPendingMaintenance() {
    try {
      return await this.model.findAll({
        where: { 
          status:['scheduled', 'in-progress'] 
         },
        include: [
          {
            association: "airplane",
            required: true,
          },
        ],
        order: [["createdAt", "ASC"]],
      });
    } catch (error) {
      console.error("Repository error:", error);
      Logger.error("Error in MaintenanceRepository: getPendingMaintenance");
      throw error;
    }
  }
}

module.exports = MaintenanceRepositories;
