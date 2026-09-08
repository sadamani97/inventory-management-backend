'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('alerts', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      relatedItem: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      referenceId: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      type: {
        type: Sequelize.ENUM(
          'LOW_STOCK',
          'OUT_OF_STOCK',
          'ITEM_EXPIRING',
          'VENDOR_DELAY',
          'PAYMENT_REMINDER',
          'SHIPMENT_DELAY',
          'CANCELLED_PO',
          'PAYMENT_OVERDUE',
          'EXPIRED_ITEM'
        ),
        allowNull: false,
        defaultValue: 'LOW_STOCK',
      },
      severity: {
        type: Sequelize.ENUM('Critical', 'High', 'Medium', 'Low'),
        allowNull: false,
        defaultValue: 'Medium',
      },
      status: {
        type: Sequelize.ENUM('Active', 'Delayed', 'In Transit', 'Pending', 'Cancelled', 'Resolved', 'Acknowledged'),
        allowNull: false,
        defaultValue: 'Active',
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0;');
    await queryInterface.dropTable('alerts');
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1;');
  }
};
