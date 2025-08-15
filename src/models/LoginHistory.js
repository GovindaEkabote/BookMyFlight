// src/models/loginhistory.js
'use strict';

const { Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const LoginHistory = sequelize.define('LoginHistory', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    activityType: {
      type: DataTypes.ENUM('login', 'logout'),
      allowNull: false
    },
    ipAddress: {
      type: DataTypes.STRING,
      allowNull: true
    },
    userAgent: {
      type: DataTypes.STRING,
      allowNull: true
    },
    activityTime: {
  type: Sequelize.DATE,
  defaultValue: Sequelize.NOW
}
  }, {
    tableName: 'LoginHistories',
    paranoid: true, // enables deletedAt for soft deletes
    timestamps: true
  });

  // If you want associations:
  // LoginHistory.associate = (models) => {
  //   LoginHistory.belongsTo(models.User, { foreignKey: 'userId' });
  // };

  return LoginHistory;
};
