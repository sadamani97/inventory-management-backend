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
            const { severity, status, search } = req.query;
            const alerts = await alertService.findAll({
                severity: severity as string,
                status: status as string,
                search: search as string
            });
            res.status(200).json({
                success: true,
                message: "Alerts fetched successfully",
                data: alerts
            });
        } catch (error) {
            next(error);
        }
    };
}

export const alertController = new AlertController();
