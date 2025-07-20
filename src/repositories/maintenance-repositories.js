const CrudRepositories = require("./crud-repositories");
const { MaintenanceRecord } = require("../models");
const { Logger } = require("../config");
const { Op } = require("sequelize");

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

async getPendingMaintenance(limit, offset) {
  try {
    return await this.model.findAll({
      where: {
        status: {
          [Op.or]: ['scheduled', 'in-progress']
        }
      },
      include: [{
       association: "airplane",
        required: true,
      }],
      order: [
        ['status', 'ASC'], // in-progress first
        ['startDate', 'ASC'] // then by start date
      ],
      limit,
      offset,
      paranoid: true
    });
  } catch (error) {
    console.log("Error in MaintenanceRepository: getPendingMaintenance", error);
    throw error;
  }
}
}

module.exports = MaintenanceRepositories;
