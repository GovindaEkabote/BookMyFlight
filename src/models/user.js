"use strict";
const { Model } = require("sequelize");
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define associations here
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
          notEmpty: true
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [8, 128] // Minimum 8 characters
        }
      },
      phone: {
        type: DataTypes.STRING,
        validate: {
          is: /^\+?[0-9]{10,15}$/
        }
      },
      dateOfBirth: {
        type: DataTypes.DATEONLY
      },
      passportNumber: {
        type: DataTypes.STRING
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      role: {
        type: DataTypes.ENUM("customer", "admin", "agent"),
        defaultValue: "customer",
        validate: {
          isIn: [["customer", "admin", "agent"]]
        }
      },
      lastLogin: {
        type: DataTypes.DATE
      }
    },
    {
      sequelize,
      modelName: 'User',
      timestamps: true,
      paranoid: true,
      hooks: {
        beforeCreate: async (user) => {
          if (user.password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
          }
        }
      }
    }
  );

  // Instance method to compare passwords
  User.prototype.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
  };

  return User;
};