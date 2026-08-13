import { sequelize } from "../config/db.js";
import {
  VendorType,
  Country,
  State,
  City,
  Vendor,
  Address,
  VendorContact,
  VendorBankDetails,
} from "../models/vendor/index.js";

export const ensureVendorTables = async () => {
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

  await syncIfMissing("vendor_types", () => VendorType.sync({ alter: false, force: false }));
  await syncIfMissing("countries", () => Country.sync({ alter: false, force: false }));
  await syncIfMissing("states", () => State.sync({ alter: false, force: false }));
  await syncIfMissing("cities", () => City.sync({ alter: false, force: false }));
  await syncIfMissing("vendors", () => Vendor.sync({ alter: false, force: false }));
  await syncIfMissing("addresses", () => Address.sync({ alter: false, force: false }));
  await syncIfMissing("vendor_contacts", () => VendorContact.sync({ alter: false, force: false }));
  await syncIfMissing("vendor_bank_details", () => VendorBankDetails.sync({ alter: false, force: false }));

  console.log("Vendor schema is ready");
};

const main = async () => {
  try {
    await sequelize.authenticate();
    await ensureVendorTables();
    console.log("Migration completed for vendor tables");
  } catch (error) {
    console.error("Vendor migration failed:", error);
    process.exitCode = 1;
  } finally {
    await sequelize.close();
  }
};

if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith("vendorMigration.cli.ts")) {
  main();
}
