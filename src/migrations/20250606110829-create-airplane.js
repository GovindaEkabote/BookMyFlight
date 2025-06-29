"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Airplanes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      modelNumber: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      manufacturer: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      registerationNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      economySeats: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      businessSeats: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      firstClassSeats: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Airplanes");
  },
};
