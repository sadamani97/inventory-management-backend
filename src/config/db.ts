import { Sequelize } from "sequelize";
import { env } from "./env.js";


export const sequelize = new Sequelize(env.DATABASE_URL, {
  dialect: "mysql",
  logging: false,
});

export const initDb = async () => {
  try {
    console.log("Initializing database connection...");
    await sequelize.authenticate();
    console.log("Database connection established successfully.");

    await sequelize.sync({ alter: true });
    console.log("Database models synchronized successfully.");
  } catch (error) {
    console.error("Failed to initialize database:", error);
    throw error;
  }
};
