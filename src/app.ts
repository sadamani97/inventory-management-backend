import express from "express";
import cors from "cors";
import authRoutes from "./Routes/auth.route.js";
import { errorHandler } from "./middlewares/error.middleware.js";

// Product Routes
import productRoutes from "./Routes/product.rout/product.route.js";
import { CategoryRouter } from "./Routes/product.rout/category.route.js";
import { BrandRouter } from "./Routes/product.rout/brand.route.js";
import { UnitRouter } from "./Routes/product.rout/unit.route.js";

// Vendor Routes
import vendorRoutes from "./Routes/vendorRoutes/vendor.route.js";
import vendorTypeRoutes from "./Routes/vendorRoutes/vendorType.route.js";
import countryRoutes from "./Routes/vendorRoutes/country.route.js";
import stateRoutes from "./Routes/vendorRoutes/state.route.js";
import cityRoutes from "./Routes/vendorRoutes/city.route.js";
import addressRoutes from "./Routes/vendorRoutes/address.route.js";
import vendorContactRoutes from "./Routes/vendorRoutes/vendorContact.route.js";
import vendorBankDetailsRoutes from "./Routes/vendorRoutes/vendorBankDetails.route.js";

const app = express();

app.use(cors());
app.use(express.json());

// Auth Route
app.use("/", authRoutes);

// Product Module Routes
app.use("/api/products", productRoutes);
app.use("/api/Categories", CategoryRouter);
app.use("/api/brands", BrandRouter);
app.use("/api/units", UnitRouter);

// Vendor Module Routes
app.use("/api/vendors", vendorRoutes);
app.use("/api/vendor-types", vendorTypeRoutes);
app.use("/api/countries", countryRoutes);
app.use("/api/states", stateRoutes);
app.use("/api/cities", cityRoutes);
app.use("/api/addresses", addressRoutes);
app.use("/api/vendor-contacts", vendorContactRoutes);
app.use("/api/vendor-bank-details", vendorBankDetailsRoutes);

app.use(errorHandler);

export default app;
