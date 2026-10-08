import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";

cloudinary.config({
  cloud_name: "t9mp1o4f",
  api_key: "925925665314418",
  api_secret: "49Xg2sDKOVSLHBhKfljMVx1YUsY",
});

const publicDir = "C:\\Users\\sadamani\\OneDrive\\Desktop\\INVT_MANG\\inventory-frontend-split\\public";

async function walkDir(dir: string): Promise<string[]> {
    let results: string[] = [];
    const list = await fs.promises.readdir(dir);
    for (const file of list) {
        const fullPath = path.resolve(dir, file);
        const stat = await fs.promises.stat(fullPath);
        if (stat && stat.isDirectory()) {
            results = results.concat(await walkDir(fullPath));
        } else {
            if (/\.(png|jpe?g|svg|webp|gif)$/i.test(fullPath)) {
                results.push(fullPath);
            }
        }
    }
    return results;
}

async function uploadAll() {
    try {
        console.log("Scanning public directory...");
        const files = await walkDir(publicDir);
        console.log(`Found ${files.length} images.`);
        
        const mapping: Record<string, string> = {};

        for (const file of files) {
            const relativePath = file.replace(publicDir, "").replace(/\\/g, "/");
            console.log(`Uploading ${relativePath}...`);
            const res = await cloudinary.uploader.upload(file, { 
                folder: "frontend_assets",
                use_filename: true,
                unique_filename: false,
                resource_type: "auto"
            });
            mapping[relativePath] = res.secure_url;
            console.log(`Uploaded to: ${res.secure_url}`);
        }

        const outPath = path.join(__dirname, "image_mapping.json");
        fs.writeFileSync(outPath, JSON.stringify(mapping, null, 2));
        console.log(`Mapping saved to ${outPath}`);
    } catch (err) {
        console.error("Upload failed:", err);
    }
}

uploadAll();
