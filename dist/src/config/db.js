import { Sequelize } from "sequelize";
import { env } from "./env.js";
export const sequelize = new Sequelize(env.DATABASE_URL, {
    dialect: "mysql",
    logging: false,
});
// Import User model to register it before syncing
import { User } from "../models/User.js";
export const initDb = async () => {
    try {
        console.log("Initializing database connection...");
        await sequelize.authenticate();
        console.log("Database connection established successfully.");
        await sequelize.sync();
        console.log("Database models synchronized successfully.");
    }
    catch (error) {
        console.error("Failed to initialize database:", error);
        throw error;
    }
};
//# sourceMappingURL=db.js.map