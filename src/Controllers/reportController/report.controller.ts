import type { Request, Response, NextFunction } from "express";
import { reportService } from "../../Services/reportService/report.service.js";

export class ReportController {
    getKpiSummary = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const data = await reportService.getKpiSummary();
            res.status(200).json({
                success: true,
                message: "KPI summary fetched successfully",
                data
            });
        } catch (error) {
            next(error);
        }
    };

    getSalesAnalytics = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const data = await reportService.getSalesAnalytics();
            res.status(200).json({
                success: true,
                message: "Sales analytics fetched successfully",
                data
            });
        } catch (error) {
            next(error);
        }
    };

    getSalesVsPurchases = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const data = await reportService.getSalesVsPurchases();
            res.status(200).json({
                success: true,
                message: "Sales vs Purchases chart data fetched successfully",
                data
            });
        } catch (error) {
            next(error);
        }
    };

    getProductPerformance = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { search, status } = req.query;
            const data = await reportService.getProductPerformance({
                search: search as string,
                status: status as string
            });
            res.status(200).json({
                success: true,
                message: "Product performance table data fetched successfully",
                data
            });
        } catch (error) {
            next(error);
        }
    };
}

export const reportController = new ReportController();
