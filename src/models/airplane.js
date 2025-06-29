"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Airplane extends Model {
    static associate(models) {
      // define association here
    }
  }

  Airplane.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      modelNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      manufacturer: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      registerationNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      economySeats: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      businessSeats: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      firstClassSeats: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "Airplane",
      timestamps: true,
    }
  );

  return Airplane;
};
