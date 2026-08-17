import { sequelize } from "../config/db.js";
import { ensureProductTables } from "./productMigration.cli.js";
import { ensureVendorTables } from "./vendorMigration.cli.js";
import { ensurePurchaseOrderTables } from "./purchaseOrderMigration.cli.js";
import { ensureSalesOrderTables } from "./salesOrderMigration.cli.js";
import { ensureInvoiceTables } from "./invoiceMigration.cli.js";
import { ensureAlertTables } from "./alertMigration.cli.js";

export const runAllMigrations = async () => {
  console.log("Starting full database migrations...\n");

  console.log("--- 1. Product Tables ---");
  await ensureProductTables();

  console.log("\n--- 2. Vendor Tables ---");
  await ensureVendorTables();

  console.log("\n--- 3. Purchase Order Tables ---");
  await ensurePurchaseOrderTables();

  console.log("\n--- 4. Sales Order Tables ---");
  await ensureSalesOrderTables();

  console.log("\n--- 5. Invoice Tables ---");
  await ensureInvoiceTables();

  console.log("\n--- 6. Alert Tables ---");
  await ensureAlertTables();

  console.log("\nAll migrations executed successfully!");
};

const main = async () => {
  try {
    await sequelize.authenticate();
    await runAllMigrations();
  } catch (error) {
    console.error("Migration suite execution failed:", error);
    process.exitCode = 1;
  } finally {
    await sequelize.close();
  }
};

main();
