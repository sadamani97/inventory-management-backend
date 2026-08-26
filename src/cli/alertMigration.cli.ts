import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";

export const ensureAlertTables = async () => {
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

  await createIfMissing("alerts", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    relatedItem: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    referenceId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    type: {
      type: DataTypes.ENUM(
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
      type: DataTypes.ENUM('Critical', 'High', 'Medium', 'Low'),
      allowNull: false,
      defaultValue: 'Medium',
    },
    status: {
      type: DataTypes.ENUM('Active', 'Delayed', 'In Transit', 'Pending', 'Cancelled', 'Resolved', 'Acknowledged'),
      allowNull: false,
      defaultValue: 'Active',
    },
    description: {
      type: DataTypes.STRING,
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

  console.log("Alert schema is ready");
};

const main = async () => {
  try {
    await sequelize.authenticate();
    await ensureAlertTables();
    console.log("Migration completed for alert table");
  } catch (error) {
    console.error("Alert migration failed:", error);
    process.exitCode = 1;
  } finally {
    await sequelize.close();
  }
};

if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith("alertMigration.cli.ts")) {
  main();
}
