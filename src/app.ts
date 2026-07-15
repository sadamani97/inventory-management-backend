import express from "express";
import cors from "cors";
import authRoutes from "./Routes/auth.route.js";
import { errorHandler  } from "./middlewares/error.middleware.js";
import productRoutes from "./Routes/product.route.js"
import vendorRoutes from "./Routes/vendor.route.js"

const app = express();

app.use(cors());
app.use(express.json());
app.use("/", authRoutes);
app.use("/api/products",productRoutes);
app.use("/api/vendors",vendorRoutes)
app.use(errorHandler);

export default app;
