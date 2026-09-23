import { Alert, type AlertAttributes } from "../../models/alert/alert.model.js";
import { Op } from "sequelize";

export class AlertService {
    async create(data: Partial<AlertAttributes>) {
        return await Alert.create(data as AlertAttributes);
    }

    async findAll(query?: { severity?: string; status?: string; search?: string }) {
        const whereClause: any = {};

        if (query?.severity) {
            whereClause.severity = query?.severity;
        }

        if (query?.status) {
            whereClause.status = query?.status;
        }

        if (query?.search) {
            whereClause[Op.or] = [
                { title: { [Op.like]: `%${query?.search}%` } },
                { relatedItem: { [Op.like]: `%${query?.search}%` } },
                { referenceId: { [Op.like]: `%${query?.search}%` } }
            ];
        }

        return await Alert.findAll({
            where: whereClause,
            order: [["createdAt", "DESC"]]
        });
    }

    async FindById(id: number) {
        return await Alert.findByPk(id);
    }

    async Update(id: number, data: Partial<AlertAttributes>) {
        const alert = await Alert.findByPk(id);
        if (!alert) throw new Error("Alert not found");
        return await alert.update(data);
    }

    async Delete(id: number) {
        const alert = await Alert.findByPk(id);
        if (!alert) throw new Error("Alert not found");
        await alert.destroy();
        return { message: "Alert deleted successfully" };
    }

    async getAlertSummary() {
        const activeAlerts = await Alert.count({ where: { status: "Active" } });
        const criticalAlerts = await Alert.count({ where: { severity: "Critical" } });
        const lowStockAlerts = await Alert.count({ where: { type: "LOW_STOCK" } });
        const pendingDeliveries = await Alert.count({ where: { type: { [Op.in]: ["SHIPMENT_DELAY", "VENDOR_DELAY"] } } });

        return {
            activeAlerts,
            criticalAlerts,
            lowStockAlerts,
            pendingDeliveries
        };
    }

    async getCriticalAlertsSummary() {
        return await Alert.findAll({
            where: { severity: "Critical" },
            limit: 5,
            order: [["createdAt", "DESC"]]
        });
    }

    async checkAndSyncProductAlerts(product: { id: number; productName: string; sku: string; quantity: number; lowStockLimit?: number }) {
        const limit = product.lowStockLimit ?? 10;
        const refId = product.sku || `SKU-${product.id}`;

        if (product.quantity <= 0) {
            // OUT OF STOCK - Critical
            const existingAlert = await Alert.findOne({
                where: { referenceId: refId, type: "OUT_OF_STOCK" }
            });

            if (existingAlert) {
                await existingAlert.update({
                    severity: "Critical",
                    status: "Active",
                    description: `${product.productName} unavailable in inventory`
                });
            } else {
                await Alert.create({
                    title: "Out of Stock",
                    relatedItem: product.productName,
                    referenceId: refId,
                    type: "OUT_OF_STOCK",
                    severity: "Critical",
                    status: "Active",
                    description: `${product.productName} unavailable in inventory`
                });
            }

            // Resolve low stock alert if present
            await Alert.update({ status: "Resolved" }, { where: { referenceId: refId, type: "LOW_STOCK" } });

        } else if (product.quantity <= limit) {
            // LOW STOCK - High
            const existingAlert = await Alert.findOne({
                where: { referenceId: refId, type: "LOW_STOCK" }
            });

            if (existingAlert) {
                await existingAlert.update({
                    severity: "High",
                    status: "Active",
                    description: `${product.productName} stock below safety level (${product.quantity} remaining)`
                });
            } else {
                await Alert.create({
                    title: "Low Stock",
                    relatedItem: product.productName,
                    referenceId: refId,
                    type: "LOW_STOCK",
                    severity: "High",
                    status: "Active",
                    description: `${product.productName} stock below safety level (${product.quantity} remaining)`
                });
            }

            // Resolve out of stock alert if present
            await Alert.update({ status: "Resolved" }, { where: { referenceId: refId, type: "OUT_OF_STOCK" } });

        } else {
            // Stock is healthy - resolve both
            await Alert.update(
                { status: "Resolved" },
                { where: { referenceId: refId, type: { [Op.in]: ["LOW_STOCK", "OUT_OF_STOCK"] } } }
            );
        }
    }
}

export const alertService = new AlertService();
