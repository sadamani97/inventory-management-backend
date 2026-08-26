import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";

export const ensureSalesOrderTables = async () => {
  const queryInterface = sequelize.getQueryInterface();
  const tables = await queryInterface.showAllTables();

  const tableSet = new Set(tables.map((table) => String(table)));

  const createIfMissing = async (tableName: string, attributes: any) => {
    if (!tableSet.has(tableName)) {
      await queryInterface.createTable(tableName, attributes);
      console.log(`Created table: ${tableName}`);
    } else {
      console.log(`Table already exists: ${tableName}`);
    }
  };

  await createIfMissing("sales_orders", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    orderNumber: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    customerType: {
      type: DataTypes.ENUM("Walk In Customer", "Retail Customer", "Wholesale Customer", "Online Customer", "Corporate Customer", "Distributor"),
      allowNull: false,
    },
    customerName: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("Draft", "Paid", "Pending", "Processing", "Shipped", "Completed", "Cancelled", "Returned", "Failed"),
      allowNull: false,
      defaultValue: "Draft",
    },
    paymentMode: {
      type: DataTypes.ENUM("Cash", "UPI", "Card", "Net Banking", "Credit", "Cheque", "Bank Transfer"),
      allowNull: false,
      defaultValue: "Cash",
    },
    subtotal: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.0,
    },
    discountAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.0,
    },
    totalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.0,
    },
    orderDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    createdById: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });

  await createIfMissing("sales_order_items", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    salesOrderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productName: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    unitPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.0,
    },
    totalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.0,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });

  console.log("Sales order schema is ready");
};

const main = async () => {
  try {
    await sequelize.authenticate();
    await ensureSalesOrderTables();
    console.log("Migration completed for sales order tables");
  } catch (error) {
    console.error("Migration failed:", error);
    process.exitCode = 1;
  } finally {
    await sequelize.close();
  }
};

if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith("salesOrderMigration.cli.ts")) {
  main();
}
