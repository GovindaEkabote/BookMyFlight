const CrudRepositories = require("./crud-repositories");
const { User } = require("../models");
const { Logger } = require("../config");


class UserRepository extends CrudRepositories {
  constructor() {
    super(User);
  }

  async getUserByEmail(email) {
    try {
      const user = await User.findOne({ 
        where: { email } 
      });
      return user;
    } catch (error) {
      Logger.error("Something went wrong in user repository: getUserByEmail");
      throw error;
    }
  }
}

module.exports = UserRepository;