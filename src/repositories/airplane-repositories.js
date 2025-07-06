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
  async findAndCountAll(options = {}) {
  try {
    console.log('Executing findAndCountAll with options:', JSON.stringify(options, null, 2));
    const response = await this.model.findAndCountAll(options);
    console.log('findAndCountAll response:', {
      count: response.count,
      rows: response.rows.length
    });
    return response;
  } catch (error) {
    console.error('Repository findAndCountAll error:', {
      message: error.message,
      stack: error.stack,
      options
    });
    throw error;
  }
}
}

module.exports = AirplaneRepositories;
