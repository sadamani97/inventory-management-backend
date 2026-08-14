import { sequelize } from "../config/db.js";
import { Invoice, InvoiceItem } from "../models/invoice/index.js";

export const ensureInvoiceTables = async () => {
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

  await syncIfMissing("invoices", () => Invoice.sync({ alter: false, force: false }));
  await syncIfMissing("invoice_items", () => InvoiceItem.sync({ alter: false, force: false }));

  console.log("Invoice schema is ready");
};

const main = async () => {
  try {
    await sequelize.authenticate();
    await ensureInvoiceTables();
    console.log("Migration completed for invoice tables");
  } catch (error) {
    console.error("Invoice migration failed:", error);
    process.exitCode = 1;
  } finally {
    await sequelize.close();
  }
};

if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith("invoiceMigration.cli.ts")) {
  main();
}
