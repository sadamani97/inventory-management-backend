import dotenv from "dotenv";
dotenv.config();
export const env = {
    PORT: Number(process.env.PORT) || 3000,
    JWT_SECRET: process.env.JWT_SECRET || "mysecretkey",
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "1d",
    DATABASE_URL: process.env.DATABASE_URL || "mysql://tiVZGodT9xZg9Yk.root:S4wJ53MqVLVHO92p@gateway01.ap-northeast-1.prod.aws.tidbcloud.com:4000/inventory_management?ssl={\"rejectUnauthorized\":true}",
    DATABASE_URL_MAIN: process.env.DATABASE_URL_MAIN || "mysql://tiVZGodT9xZg9Yk.root:S4wJ53MqVLVHO92p@gateway01.ap-northeast-1.prod.aws.tidbcloud.com:4000/inventory_management_main?ssl={\"rejectUnauthorized\":true}",
    DATABASE_URL_STAGING: process.env.DATABASE_URL_STAGING || "mysql://tiVZGodT9xZg9Yk.root:S4wJ53MqVLVHO92p@gateway01.ap-northeast-1.prod.aws.tidbcloud.com:4000/inventory_management_staging?ssl={\"rejectUnauthorized\":true}",
    DATABASE_URL_DEV: process.env.DATABASE_URL_DEV || "mysql://tiVZGodT9xZg9Yk.root:S4wJ53MqVLVHO92p@gateway01.ap-northeast-1.prod.aws.tidbcloud.com:4000/inventory_management?ssl={\"rejectUnauthorized\":true}",
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || "t9mp1o4f",
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || "925925665314418",
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || "49Xg2sDKOVSLHBhKfljMVx1YUsY",
}