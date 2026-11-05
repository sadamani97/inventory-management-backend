import { Router } from "express";
import { reportController } from "../../Controllers/reportController/report.controller.js";

const reportRouter = Router();

reportRouter.get("/kpi-summary", reportController.getKpiSummary);
reportRouter.get("/sales-analytics", reportController.getSalesAnalytics);
reportRouter.get("/sales-vs-purchases", reportController.getSalesVsPurchases);
reportRouter.get("/product-performance", reportController.getProductPerformance);
reportRouter.get("/recent-activities", reportController.getRecentActivities);
reportRouter.get("/category-quantities", reportController.getCategoryQuantities);
reportRouter.get("/top-categories", reportController.getCategoryQuantities);

export default reportRouter;
