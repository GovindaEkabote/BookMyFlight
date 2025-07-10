'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('maintenance_records', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      maintenanceType: {
        type: Sequelize.ENUM(
          'routine',
          'scheduled',
          'unscheduled',
          'emergency',
          'modification',
          'inspection'
        ),
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      startDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      endDate: {
        type: Sequelize.DATE,
        allowNull: true
      },
      status: {
        type: Sequelize.ENUM(
          'scheduled',
          'in-progress',
          'completed',
          'delayed',
          'cancelled'
        ),
        allowNull: false,
        defaultValue: 'scheduled'
      },
      technician: {
        type: Sequelize.STRING,
        allowNull: true
      },
      cost: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      partsReplaced: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      airplaneId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Airplanes', // Matches your airplane table name
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true
      }
    });

    // Add indexes
    await queryInterface.addIndex('maintenance_records', ['airplaneId']);
    await queryInterface.addIndex('maintenance_records', ['status']);
    await queryInterface.addIndex('maintenance_records', ['startDate']);
    await queryInterface.addIndex('maintenance_records', ['endDate']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('maintenance_records');
  }
};