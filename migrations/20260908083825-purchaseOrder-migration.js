'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('purchase_orders', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      poNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      vendorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      deliveryAddressId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      orderDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      expectedDeliveryDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      paymentTerms: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      shipmentMethod: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      invoiceNumber: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM(
          'Draft',
          'Pending',
          'Approved',
          'Shipped',
          'Delivered',
          'Partially Delivered',
          'Cancelled',
          'Delayed',
          'Returned'
        ),
        defaultValue: 'Draft',
        allowNull: false,
      },
      paymentStatus: {
        type: Sequelize.ENUM('NIL', 'Pending', 'Paid', 'Partially Paid', 'Refunded', 'Failed'),
        defaultValue: 'NIL',
        allowNull: false,
      },
      subtotal: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.0,
      },
      taxPercentage: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: false,
        defaultValue: 0.0,
      },
      taxAmount: {
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

    await queryInterface.createTable('purchase_order_items', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      purchaseOrderId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      unitPrice: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      totalPrice: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      receivedQuantity: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
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

    await queryInterface.createTable('purchase_order_activities', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      purchaseOrderId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      activityType: {
        type: Sequelize.ENUM(
          'PO Created',
          'PO Approved',
          'PO Shipped',
          'Delivery Received',
          'PO Cancelled',
          'Vendor Updated',
          'Stock Updated',
          'Payment Added',
          'PO Edited'
        ),
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      userId: {
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
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0;');
    await queryInterface.dropTable('purchase_order_activities');
    await queryInterface.dropTable('purchase_order_items');
    await queryInterface.dropTable('purchase_orders');
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1;');
  }
};
