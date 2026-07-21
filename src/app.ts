import express from "express";
import cors from "cors";
import authRoutes from "./Routes/auth.route.js";
import { errorHandler  } from "./middlewares/error.middleware.js";
import productRoutes from "./Routes/product.rout/product.route.js"
import vendorRoutes from "./Routes/vendor.route.js"
import {CategoryRouter} from "./Routes/product.rout/category.route.js";
import { BrandRouter } from "./Routes/product.rout/brand.route.js";
import { UnitRouter } from "./Routes/product.rout/unit.route.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/", authRoutes);
app.use("/api/products",productRoutes);
app.use("/api/vendors",vendorRoutes);
app.use("/api/Categories",CategoryRouter);
app.use("/api/brands",BrandRouter);
app.use("/api/units",UnitRouter);
app.use(errorHandler);

export default app;
