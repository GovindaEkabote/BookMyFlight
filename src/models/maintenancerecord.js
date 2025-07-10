"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MaintenanceRecord extends Model {
    static associate(models) {
      MaintenanceRecord.belongsTo(models.Airplane, {
        foreignKey: 'airplaneId',
        as: 'airplane'
      });
    }
  }

  MaintenanceRecord.init(
    {
      maintenanceType: {
        type: DataTypes.ENUM(
          "routine",
          "scheduled",
          "unscheduled",
          "emergency",
          "modification",
          "inspection"
        ),
        allowNull: false,
        validate: {
          notNull: { msg: "Maintenance type is required" },
          notEmpty: { msg: "Maintenance type cannot be empty" }
        }
      },
      description: { 
        type: DataTypes.TEXT, 
        allowNull: false,
        validate: {
          notNull: { msg: "Description is required" },
          notEmpty: { msg: "Description cannot be empty" },
          len: {
            args: [10, 2000],
            msg: "Description must be between 10 and 2000 characters"
          }
        }
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: { msg: "Start date is required" },
          isDate: { msg: "Invalid start date format" }
        }
      },
      endDate: {
        type: DataTypes.DATE,
        validate: {
          isDate: { msg: "Invalid end date format" },
          isAfterStartDate(value) {
            if (value && new Date(value) <= new Date(this.startDate)) {
              throw new Error("End date must be after start date");
            }
          }
        }
      },
      status: {
        type: DataTypes.ENUM(
          'scheduled', 
          'in-progress', 
          'completed', 
          'delayed',
          'cancelled'
        ),
        defaultValue: 'scheduled',
        validate: {
          isIn: {
            args: [['scheduled', 'in-progress', 'completed', 'delayed', 'cancelled']],
            msg: "Invalid maintenance status"
          }
        }
      },
      technician: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [2, 100],
            msg: "Technician name must be between 2 and 100 characters"
          }
        }
      },
      cost: {
        type: DataTypes.FLOAT,
        validate: {
          isFloat: { msg: "Cost must be a valid number" },
          min: {
            args: [0],
            msg: "Cost cannot be negative"
          }
        }
      },
      partsReplaced: {
        type: DataTypes.TEXT,
        validate: {
          len: {
            args: [0, 2000],
            msg: "Parts replaced description must be less than 2000 characters"
          }
        }
      },
      airplaneId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Airplane ID is required" },
          isInt: { msg: "Airplane ID must be an integer" }
        }
      }
    },
    {
      sequelize,
      modelName: "MaintenanceRecord",
      tableName: "maintenance_records",
      paranoid: true,
      timestamps: true,
      hooks: {
        afterUpdate: async (record) => {
          try {
            const airplane = await record.getAirplane();
            if (!airplane || !record.changed('status')) return;
            
            switch(record.status) {
              case 'in-progress':
                if (airplane.isActive) {
                  await airplane.update({ isActive: false });
                }
                break;
              case 'completed':
              case 'cancelled':
                if (!airplane.isActive) {
                  await airplane.update({ isActive: true });
                }
                break;
            }
          } catch (error) {
            console.error('Error in maintenance record afterUpdate hook:', error);
          }
        }
      },
      indexes: [
        { fields: ['airplaneId'] },
        { fields: ['status'] },
        { fields: ['startDate'] },
        { fields: ['endDate'] }
      ]
    }
  );

  return MaintenanceRecord;
};