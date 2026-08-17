import { sequelize } from "../config/db.js";
import { Alert } from "../models/alert/index.js";

export const ensureAlertTables = async () => {
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

  await syncIfMissing("alerts", () => Alert.sync({ alter: false, force: false }));

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
