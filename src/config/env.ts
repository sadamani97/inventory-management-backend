import dotenv from "dotenv";
dotenv.config();

export const env = {
    PORT: Number(process.env.PORT) || 3000,
    JWT_SECRET: process.env.JWT_SECRET || "",
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "1d",
    DATABASE_URL: process.env.DATABASE_URL || "",
    DATABASE_URL_MAIN: process.env.DATABASE_URL_MAIN || process.env.DATABASE_URL || "",
    DATABASE_URL_STAGING: process.env.DATABASE_URL_STAGING || process.env.DATABASE_URL || "",
    DATABASE_URL_DEV: process.env.DATABASE_URL_DEV || process.env.DATABASE_URL || "",
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || "",
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || "",
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || "",
};