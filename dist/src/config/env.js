import dotenv from "dotenv";
dotenv.config();
export const env = {
    PORT: Number(process.env.PORT) || 3000,
    JWT_SECRET: process.env.JWT_SECRET || "mysecretkey",
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "1d",
    DATABASE_URL: process.env.DATABASE_URL || "mysql://root:root@localhost:3306/inventory_management",
};
//# sourceMappingURL=env.js.map