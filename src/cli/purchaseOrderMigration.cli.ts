import { sequelize } from "../config/db.js";
import {
  PurchaseOrder,
  PurchaseOrderItem,
  PurchaseOrderActivity,
} from "../models/transctionModel/index.js";

export const ensurePurchaseOrderTables = async () => {
  const queryInterface = sequelize.getQueryInterface();
  const tables = await queryInterface.showAllTables();
  const tableSet = new Set(tables.map((table) => String(table)));

  const syncIfMissing = async (tableName: string, syncFn: () => Promise<any>) => {
    if (!tableSet.has(tableName)) {
      await syncFn();
      console.log(`Synced table: ${tableName}`);
    } else {
      console.log(`Table already exists: ${tableName}`);
    }
  };

  await syncIfMissing("purchase_orders", () => PurchaseOrder.sync({ alter: false, force: false }));
  await syncIfMissing("purchase_order_items", () => PurchaseOrderItem.sync({ alter: false, force: false }));
  await syncIfMissing("purchase_order_activities", () => PurchaseOrderActivity.sync({ alter: false, force: false }));

  console.log("Purchase Order schema is ready");
};

const main = async () => {
  try {
    await sequelize.authenticate();
    await ensurePurchaseOrderTables();
    console.log("Migration completed for purchase order tables");
  } catch (error) {
    console.error("Purchase Order migration failed:", error);
    process.exitCode = 1;
  } finally {
    await sequelize.close();
  }
};

if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith("purchaseOrderMigration.cli.ts")) {
  main();
}
