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

    async getSalesAnalytics(daysCount: number = 7) {
        const days = Math.max(1, Number(daysCount) || 7);
        const chartData = [];
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
                    createdAt: (prod as any)?.createdAt || new Date()
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

    async getRecentActivities(query?: { page?: number; limit?: number; search?: string; status?: string }) {
        const pageNum = Math.max(1, Number(query?.page || 1));
        const limitNum = Math.max(1, Number(query?.limit || 10));

        const pos = await PurchaseOrder.findAll({
            order: [["createdAt", "DESC"]],
            limit: 100,
        });

        const sos = await SalesOrder.findAll({
            order: [["createdAt", "DESC"]],
            limit: 100,
        });

        const prods = await Product.findAll({
            order: [["updatedAt", "DESC"]],
            limit: 100,
        });

        const allActivities: any[] = [];

        pos.forEach((po: any, idx: number) => {
            const isDelivered = ["completed", "delivered", "received"].includes((po.status || "").toLowerCase());
            const d = po.createdAt || po.orderDate || new Date();
            const timeDate = new Date(d);

            allActivities.push({
                id: `po-${po.id ?? idx}`,
                activity: isDelivered ? "Vendor Delivery" : "Purchase Order Created",
                product: po.vendorName || "Vendor Order",
                sku: po.poNumber || `PO-${idx + 1}`,
                qty: `+1`,
                status: isDelivered ? "Delivered" : "Added",
                time: timeDate.toISOString(),
                createdAt: timeDate,
            });
        });

        sos.forEach((so: any, idx: number) => {
            const isDraft = (so.status || "").toLowerCase() === "draft";
            if (!isDraft) {
                const d = so.createdAt || so.orderDate || new Date();
                const timeDate = new Date(d);

                allActivities.push({
                    id: `so-${so.id ?? idx}`,
                    activity: "Stock Out",
                    product: so.customerName || "Customer Order",
                    sku: so.orderNumber || `SO-${idx + 1}`,
                    qty: `-1`,
                    status: "Completed",
                    time: timeDate.toISOString(),
                    createdAt: timeDate,
                });
            }
        });

        prods.forEach((prod: any, idx: number) => {
            const qty = Number(prod.quantity || 0);
            const limit = Number(prod.lowStockLimit || 10);
            const updateDate = new Date(prod.updatedAt || prod.createdAt || new Date());
            const createDate = new Date(prod.createdAt || new Date());

            if (qty <= 0) {
                allActivities.push({
                    id: `prod-out-${prod.id ?? idx}`,
                    activity: "Out of Stock Alert",
                    product: prod.productName || "Product",
                    sku: prod.sku || `SKU-${idx + 1}`,
                    qty: "0 Left",
                    status: "Warning",
                    time: updateDate.toISOString(),
                    createdAt: updateDate,
                });
            } else if (qty <= limit) {
                allActivities.push({
                    id: `prod-low-${prod.id ?? idx}`,
                    activity: "Low Stock Alert",
                    product: prod.productName || "Product",
                    sku: prod.sku || `SKU-${idx + 1}`,
                    qty: `${qty} Left`,
                    status: "Warning",
                    time: updateDate.toISOString(),
                    createdAt: updateDate,
                });
            }

            allActivities.push({
                id: `prod-add-${prod.id ?? idx}`,
                activity: "Product In Stock",
                product: prod.productName || "Product",
                sku: prod.sku || `SKU-${idx + 1}`,
                qty: `+${qty}`,
                status: "Added",
                time: createDate.toISOString(),
                createdAt: createDate,
            });
        });

        allActivities.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

        let filtered = allActivities;
        if (query?.status && query.status !== "All Status" && query.status !== "All") {
            const s = query.status.toLowerCase();
            filtered = filtered.filter(a => (a.status || "").toLowerCase() === s);
        }

        if (query?.search && query.search.trim()) {
            const term = query.search.trim().toLowerCase();
            filtered = filtered.filter(a =>
                (a.activity || "").toLowerCase().includes(term) ||
                (a.product || "").toLowerCase().includes(term) ||
                (a.sku || "").toLowerCase().includes(term)
            );
        }

        const totalCount = filtered.length;
        const offset = (pageNum - 1) * limitNum;
        const rows = filtered.slice(offset, offset + limitNum);

        return {
            count: totalCount,
            rows,
            page: pageNum,
            limit: limitNum,
            totalPages: limitNum > 0 ? Math.ceil(totalCount / limitNum) : 1,
        };
    }
}

export const reportService = new ReportService();
