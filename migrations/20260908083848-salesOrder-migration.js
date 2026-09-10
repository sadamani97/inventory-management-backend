'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sales_orders', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      orderNumber: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
      },
      customerType: {
        type: Sequelize.ENUM('Walk In Customer', 'Retail Customer', 'Wholesale Customer', 'Online Customer', 'Corporate Customer', 'Distributor'),
        allowNull: false,
      },
      customerName: {
        type: Sequelize.STRING(150),
        allowNull: true,
      },
      phone: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM('Draft', 'Paid', 'Pending', 'Processing', 'Shipped', 'Completed', 'Cancelled', 'Returned', 'Failed'),
        allowNull: false,
        defaultValue: 'Draft',
      },
      paymentMode: {
        type: Sequelize.ENUM('Cash', 'UPI', 'Card', 'Net Banking', 'Credit', 'Cheque', 'Bank Transfer'),
        allowNull: false,
        defaultValue: 'Cash',
      },
      subtotal: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.0,
      },
      discountAmount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.0,
      },
      totalAmount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.0,
      },
      orderDate: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      createdById: {
        type: Sequelize.INTEGER,
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

    await queryInterface.createTable('sales_order_items', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      salesOrderId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      productName: {
        type: Sequelize.STRING(150),
        allowNull: true,
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      unitPrice: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.0,
      },
      totalPrice: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.0,
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
    await queryInterface.dropTable('sales_order_items');
    await queryInterface.dropTable('sales_orders');
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1;');
  }
};
