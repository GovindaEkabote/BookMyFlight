const CrudRepositories = require("./crud-repositories");
const { Airplane } = require("../models");
const { Logger } = require("../config");

class AirplaneRepositories extends CrudRepositories {
  constructor() {
    super(Airplane);
  }
  async getByCompany(companyName) {
    try {
      return await this.model.findAll({
        where: { companyName },
      });
    } catch (error) {
      Logger.error("Error in AirplaneRepository: getByCompany");
      throw error;
    }
  }
}

module.exports = {AirplaneRepositories};
