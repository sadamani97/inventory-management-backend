import { Product } from "../../models/product/product.model.js";
import { SalesOrder } from "../../models/salesOrder/salesOrder.model.js";
import { SalesOrderItem } from "../../models/salesOrder/salesOrderItem.model.js";
import { PurchaseOrder } from "../../models/transctionModel/purchaseOrder.model.js";
import { sequelize } from "../../config/db.js";
import { Op } from "sequelize";

export class ReportService {
    async getKpiSummary() {
        // 1. Total Inventory Value (quantity * sellingPrice)
        const products = await Product.findAll();
        const inventoryValue = products?.reduce((sum, item) => sum + (Number(item?.quantity || 0) * Number(item?.sellingPrice || 0)), 0) || 0;

        // Today range
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        // 2. Today's Revenue & Total Orders
        let todaysRevenue = 0;
        let todaysTotalOrders = 0;
        let todaysSalesItemsCount = 0;

        try {
            const todaySales = await SalesOrder.findAll({
                where: {
                    createdAt: {
                        [Op.between]: [startOfDay, endOfDay]
                    }
                }
            });

            todaysTotalOrders = todaySales?.length || 0;
            todaysRevenue = todaySales?.reduce((acc, order: any) => acc + (Number(order?.totalAmount) || 0), 0) || 0;

            const orderIds = todaySales.map(o => o.id);
            if (orderIds.length > 0) {
                const todayItems = await SalesOrderItem.findAll({
                    where: {
                        salesOrderId: { [Op.in]: orderIds }
                    }
                });
                todaysSalesItemsCount = todayItems.reduce((acc, item) => acc + (Number(item.quantity) || 0), 0);
            }
        } catch (e) {
            // fallback gracefully if empty
        }

        return {
            inventoryValue,
            todaysRevenue,
            todaysTotalOrders,
            todaysSales: todaysSalesItemsCount
        };
    }

    async getSalesAnalytics() {
        // Compute last 7 days sales dynamically
        const chartData = [];
        const days = 7;
        const now = new Date();

        for (let i = days - 1; i >= 0; i--) {
            const date = new Date(now);
            date.setDate(date.getDate() - i);
            const start = new Date(date.setHours(0, 0, 0, 0));
            const end = new Date(date.setHours(23, 59, 59, 999));

            const salesOnDay = await SalesOrder.sum("totalAmount", {
                where: {
                    createdAt: { [Op.between]: [start, end] }
                }
            });

            const dayLabel = start.toLocaleDateString("en-US", { month: "short", day: "numeric" });
            chartData.push({
                date: dayLabel,
                sales: Number(salesOnDay || 0)
            });
        }

        const totalSales = chartData.reduce((acc, c) => acc + c.sales, 0);

        return {
            totalSales,
            percentageGrowth: 20,
            chartData
        };
    }

    async getSalesVsPurchases() {
        const result = [];
        const days = 5;
        const now = new Date();

        for (let i = days - 1; i >= 0; i--) {
            const date = new Date(now);
            date.setDate(date.getDate() - i);
            const start = new Date(date.setHours(0, 0, 0, 0));
            const end = new Date(date.setHours(23, 59, 59, 999));

            const purchaseAmount = await PurchaseOrder.sum("totalAmount", {
                where: {
                    createdAt: { [Op.between]: [start, end] }
                }
            });

            const salesAmount = await SalesOrder.sum("totalAmount", {
                where: {
                    createdAt: { [Op.between]: [start, end] }
                }
            });

            const dayLabel = start.toLocaleDateString("en-US", { month: "short", day: "numeric" });
            result.push({
                date: dayLabel,
                purchase: Number(purchaseAmount || 0),
                sales: Number(salesAmount || 0)
            });
        }

        return result;
    }

    async getProductPerformance(query?: { search?: string; status?: string }) {
        const products = await Product.findAll();

        const performanceData = await Promise.all(
            products.map(async (prod) => {
                const totalSold = await SalesOrderItem.sum("quantity", {
                    where: { productId: prod.id }
                });
                const soldCount = Number(totalSold || 0);
                const revenue = soldCount * (prod?.sellingPrice || 0);

                let performanceStatus = "Healthy";
                const lowLimit = prod.lowStockLimit ?? 10;

                if (prod?.quantity <= 0) performanceStatus = "Critical";
                else if (prod?.quantity <= lowLimit) performanceStatus = "Low Stock";
                else if (soldCount > 50) performanceStatus = "Fast Moving";

                return {
                    id: prod?.id,
                    productName: prod?.productName,
                    sku: prod?.sku,
                    sold: soldCount,
                    currentStock: prod?.quantity,
                    revenue,
                    status: performanceStatus,
                    createdAt: prod?.createdAt
                };
            })
        );

        if (query?.status) {
            return performanceData.filter(p => p.status.toLowerCase() === query.status?.toLowerCase());
        }

        if (query?.search) {
            const s = query.search.toLowerCase();
            return performanceData.filter(p => p.productName.toLowerCase().includes(s) || p.sku.toLowerCase().includes(s));
        }

        return performanceData;
    }
}

export const reportService = new ReportService();
