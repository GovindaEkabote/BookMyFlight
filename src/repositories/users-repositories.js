const CrudRepositories = require("./crud-repositories");
const { Users  } = require("../models");
const { Logger } = require("../config");

class UsersRepositories extends CrudRepositories {
  constructor() {
    super(Users);
  }
  async create(data) {
    try {
      const response = await this.model.create(data);
      return response;
    } catch (error) {
      Logger.error("Something went wront in the crud repository :  create");
      throw error;
    }
  }

}

module.exports = UsersRepositories;
