import type { Request, Response, NextFunction } from "express";
import { BaseController } from "../baseController.js";
import { alertService } from "../../Services/alertService/alert.service.js";

export class AlertController extends BaseController<any> {
    constructor() {
        super(alertService, "Alert");
    }

    getSummary = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const summary = await alertService.getAlertSummary();
            res.status(200).json({
                success: true,
                message: "Alert summary fetched successfully",
                data: summary
            });
        } catch (error) {
            next(error);
        }
    };

    getCritical = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const criticalAlerts = await alertService.getCriticalAlertsSummary();
            res.status(200).json({
                success: true,
                message: "Critical alerts fetched successfully",
                data: criticalAlerts
            });
        } catch (error) {
            next(error);
        }
    };

    findAllFiltered = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { severity, status, search, page, limit } = req.query;
            const pageNum = page ? parseInt(page as string, 10) : undefined;
            const limitNum = limit ? parseInt(limit as string, 10) : undefined;

            const result = await alertService.findAll({
                severity: severity as string,
                status: status as string,
                search: search as string,
                page: pageNum,
                limit: limitNum,
            });

            if (result && typeof result === "object" && "rows" in result && "count" in result) {
                const p = pageNum || 1;
                const l = limitNum || (result.rows.length || 10);
                res.status(200).json({
                    success: true,
                    message: "Alerts fetched successfully",
                    data: result.rows,
                    totalItems: result.count,
                    page: p,
                    limit: l,
                    totalPages: l > 0 ? Math.ceil(result.count / l) : 1,
                });
                return;
            }

            res.status(200).json({
                success: true,
                message: "Alerts fetched successfully",
                data: result,
                totalItems: Array.isArray(result) ? result.length : 0,
            });
        } catch (error) {
            next(error);
        }
    };
}

export const alertController = new AlertController();
