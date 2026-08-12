import { sequelize } from "../config/db.js";
import { SalesOrder, SalesOrderItem } from "../models/salesOrder/index.js";

export const ensureSalesOrderTables = async () => {
  const queryInterface = sequelize.getQueryInterface();
  const tables = await queryInterface.showAllTables();

  const tableSet = new Set(tables.map((table) => String(table)));

  await Promise.all([
    tableSet.has("sales_orders")
      ? Promise.resolve()
      : SalesOrder.sync({ alter: false, force: false }),
    tableSet.has("sales_order_items")
      ? Promise.resolve()
      : SalesOrderItem.sync({ alter: false, force: false }),
  ]);

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

main();
