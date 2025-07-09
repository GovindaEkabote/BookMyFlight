const { Logger } = require("../config");
const { Op } = require("sequelize");

class CrudRepositories {
  constructor(model) {
    this.model = model;
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

  async destroy(data) {
    try {
      const response = await this.model.destroy({
        where: {
          id: data,
        },
      });
      return response;
    } catch (error) {
      Logger.error("Something went wront in the crud repository :  destroy");
      throw error;
    }
  }

  async destroyAll(confirm = false) {
    if (!confirm) {
      throw new Error("Mass deletion requires confirmation.");
    }
    try {
      const response = await this.model.destroy({
        where: {},
      });
      return response;
    } catch (error) {
      Logger.error(
        "Something went wront in the crud repository :  destroy All"
      );
      throw error;
    }
  }

  async get(data) {
    try {
      const response = await this.model.findByPk(data);
      if (response == null) {
        Logger.error("Not Found");
      }
      return response;
    } catch (error) {
      Logger.error("Something went wront in the crud repository :  get");
      throw error;
    }
  }

  async getAll(options = {}) {
    try {
      const response = await this.model.findAll(options);
      return response;
    } catch (error) {
      Logger.error("Something went wront in the crud repository :  getAll");
      throw error;
    }
  }

  async update(id, data) {
    try {
      const [updatedCount] = await this.model.update(data, {
        where: { id: id },
      });

      if (updatedCount === 0) return null;
      return await this.model.findByPk(id);
    } catch (error) {
      Logger.error(`Something went wrong in update() for ${this.model.name}`);
      throw error;
    }
  }

  async getSearch(options = {}) {
    try {
      const response = await this.model.findAll(options);
      if (!response) {
        throw new Error("Database returned empty response");
      }
      return response;
    } catch (error) {
      console.error("Repository getAll error:", {
        message: error.message,
        stack: error.stack,
        options,
      });
      throw error; // Re-throw the original error
    }
  }

  async findByManufacturer(manufacturer) {
    try {
      const getManufacturer = await this.model.findAndCountAll({
        where: { manufacturer },
      });
      return getManufacturer;
    } catch (error) {
      Logger.error(
        "Something went wrong in the crud repository : find manufacturer",
        error
      );
      throw error;
    }
  }

async findByRegistrationNumbers(registerationNumbers) {
    try {
      const aircrafts = await this.model.findAll({
        where: {
          registerationNumber: {   // ✅ Use correct column name
            [Op.in]: registerationNumbers,
          },
        },
      });
      return aircrafts;
    } catch (error) {
      console.error("Error in findByRegistrationNumbers:", error);
      throw error;
    }
  }

async bulkCreate(aircrafts) {
    try {
      const createdAirplanes = await this.model.bulkCreate(aircrafts, {
        validate: true,
        returning: true,
      });
      return createdAirplanes;
    } catch (error) {
      console.error("Error in bulkCreate:", error);
      throw error;
    }
  }
}

module.exports = CrudRepositories;
