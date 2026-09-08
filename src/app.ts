import express from "express";
import cors from "cors";
import authRoutes from "./Routes/auth.route.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import { authenticateToken } from "./middlewares/auth.middleware.js";

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

// Transaction / Purchase Order Routes
import purchaseOrderRoutes from "./Routes/transactionRoute/purchaseOrder.route.js";
import purchaseOrderItemRoutes from "./Routes/transactionRoute/purchaseOrderItem.route.js";
import purchaseOrderActivityRoutes from "./Routes/transactionRoute/purchaseOrderActivity.route.js";
import salesOrderRoutes from "./Routes/transactionRoute/salesOrder.route.js";
import invoiceRoutes from "./Routes/invoiceRoute/invoice.route.js";

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Auth Route (Public: /signup, /login)
app.use("/", authRoutes);

// Protect all /api endpoints with JWT authentication
app.use("/api", authenticateToken);

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

// Purchase Order Module Routes
app.use("/api/purchase-orders", purchaseOrderRoutes);
app.use("/api/purchase-order-items", purchaseOrderItemRoutes);
app.use("/api/purchase-order-activities", purchaseOrderActivityRoutes);

// Sales Order Module Routes
app.use("/api/sales-orders", salesOrderRoutes);

// Invoice Module Routes
app.use("/api/invoices", invoiceRoutes);

// Alerts & Reports Module Routes
import alertRoutes from "./Routes/alertRoutes/alert.route.js";
import reportRoutes from "./Routes/reportRoutes/report.route.js";

app.use("/api/alerts", alertRoutes);
app.use("/api/reports", reportRoutes);

app.use(errorHandler);

export default app;
