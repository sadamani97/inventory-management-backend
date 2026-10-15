import { sequelize } from "../config/db.js";
import { Product } from "../models/product/product.model.js";
import { Vendor } from "../models/vendor/vendor.model.js";
import { cloudinary } from "../config/cloudinary.config.js";

async function migrate() {
    try {
        await sequelize.authenticate();
        console.log("Database connected. Starting migration...");

        const products = await Product.findAll();
        for (const p of products) {
            if (p.imageUrl && p.imageUrl.startsWith("data:image")) {
                console.log(`Migrating product ${p.id}...`);
                const res = await cloudinary.uploader.upload(p.imageUrl, { folder: "inventory_images" });
                await p.update({ imageUrl: res.secure_url });
                console.log(`Product ${p.id} image uploaded to Cloudinary: ${res.secure_url}`);
            }
        }

        const vendors = await Vendor.findAll();
        for (const v of vendors) {
            if (v.vendorLogo && v.vendorLogo.startsWith("data:image")) {
                console.log(`Migrating vendor ${v.vendorId}...`);
                const res = await cloudinary.uploader.upload(v.vendorLogo, { folder: "inventory_images" });
                await v.update({ vendorLogo: res.secure_url });
                console.log(`Vendor ${v.vendorId} logo uploaded to Cloudinary: ${res.secure_url}`);
            }
        }
        console.log("Migration completed successfully.");
        process.exit(0);
    } catch (err) {
        console.error("Migration failed:", err);
        process.exit(1);
    }
}

migrate();
