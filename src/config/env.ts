import dotenv from "dotenv";
dotenv.config();
export const env = {
    PORT: Number(process.env.PORT) || 3000,
    JWT_SECRET: process.env.JWT_SECRET || "mysecretkey",
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "1d",
    DATABASE_URL: process.env.DATABASE_URL || "mysql://root:root@localhost:3306/inventory_management",
    DATABASE_URL_MAIN: process.env.DATABASE_URL_MAIN || "mysql://root:root@localhost:3306/inventory_management_main",
    DATABASE_URL_STAGING: process.env.DATABASE_URL_STAGING || "mysql://root:root@localhost:3306/inventory_management_staging",
    DATABASE_URL_DEV: process.env.DATABASE_URL_DEV || "mysql://root:root@localhost:3306/inventory_management",
}