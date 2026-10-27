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
            const { days, range } = req.query;
            let daysNum = 7;
            if (days) {
                daysNum = parseInt(days as string, 10);
            } else if (range === "Per Day" || range === "1 Day" || range === "day" || range === "1") {
                daysNum = 1;
            } else if (range === "10 Days" || range === "10") {
                daysNum = 10;
            } else if (range === "Weekly" || range === "7") {
                daysNum = 7;
            }
            const data = await reportService.getSalesAnalytics(daysNum);
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

    getRecentActivities = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { page, limit, search, status } = req.query;
            const result = await reportService.getRecentActivities({
                page: page ? parseInt(page as string, 10) : 1,
                limit: limit ? parseInt(limit as string, 10) : 10,
                search: search as string,
                status: status as string,
            });
            res.status(200).json({
                success: true,
                message: "Recent activities fetched successfully",
                data: result.rows,
                totalItems: result.count,
                page: result.page,
                limit: result.limit,
                totalPages: result.totalPages,
            });
        } catch (error) {
            next(error);
        }
    };
}

export const reportController = new ReportController();
