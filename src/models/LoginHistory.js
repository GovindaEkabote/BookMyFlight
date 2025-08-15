// src/models/loginhistory.js
'use strict';

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
    ipAddress: {
      type: DataTypes.STRING,
      allowNull: true
    },
    userAgent: {
      type: DataTypes.STRING,
      allowNull: true
    },
    loginTime: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true
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
