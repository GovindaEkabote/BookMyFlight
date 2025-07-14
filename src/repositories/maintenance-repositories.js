const CrudRepositories = require("./crud-repositories");
const { MaintenanceRecord  } = require("../models");
const { Logger } = require("../config");


class MaintenanceRepositories extends CrudRepositories {
  constructor() {
    super(MaintenanceRecord);
  }

  async getByAirplane(airplaneId){
    try {
        return await this.model.findAll({
            where:{airplaneId},
            order:[['startDate','DESC']]
        })
    } catch (error) {
        Logger.error('Error in MaintenanceRepository: getByAirplane')
    }
  }

}

module.exports = MaintenanceRepositories;