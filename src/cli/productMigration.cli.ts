import { sequelize } from "../config/db.js";
import { Category, Brand, Unit, Product } from "../models/product/index.js";

export const ensureProductTables = async () => {
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

  await syncIfMissing("categories", () => Category.sync({ alter: false, force: false }));
  await syncIfMissing("brands", () => Brand.sync({ alter: false, force: false }));
  await syncIfMissing("units", () => Unit.sync({ alter: false, force: false }));
  await syncIfMissing("products", () => Product.sync({ alter: false, force: false }));

  console.log("Product schema is ready");
};

const main = async () => {
  try {
    await sequelize.authenticate();
    await ensureProductTables();
    console.log("Migration completed for product tables");
  } catch (error) {
    console.error("Product migration failed:", error);
    process.exitCode = 1;
  } finally {
    await sequelize.close();
  }
};

if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith("productMigration.cli.ts")) {
  main();
}
