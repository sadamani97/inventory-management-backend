import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

cloudinary.config({
  cloud_name: "t9mp1o4f",
  api_key: "925925665314418",
  api_secret: "49Xg2sDKOVSLHBhKfljMVx1YUsY",
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: "inventory_images",
      allowed_formats: ["jpg", "png", "jpeg", "webp", "gif", "svg"],
    };
  },
});

export const uploadCloudinary = multer({ storage: storage });
export { cloudinary };
