import { BaseService } from "../baseService.js";
import {
    PurchaseOrder,
    PurchaseOrderItem,
    PurchaseOrderActivity,
} from "../../models/transctionModel/index.js";
import { Vendor, VendorContact, Address } from "../../models/vendor/index.js";
import { Product } from "../../models/product/product.model.js";

class PurchaseOrderService extends BaseService<any> {
    constructor() {
        super(PurchaseOrder, "id", "poNumber", "Purchase Order");
    }

    // Overriding create to handle line items + transactional activity logging
    async create(data: any) {
        const { items, ...orderData } = data;

        const po = await PurchaseOrder.create(orderData);

        if (items && items.length > 0) {
            const lineItems = items.map((item: any) => ({
                ...item,
                purchaseOrderId: po.id,
                totalPrice: item.quantity * item.unitPrice,
            }));
            await PurchaseOrderItem.bulkCreate(lineItems);
        }

        // Log Activity
        await PurchaseOrderActivity.create({
            purchaseOrderId: po.id,
            activityType: "PO Created",
            description: `New purchase order ${po.poNumber} created.`,
        });

        return po;
    }

    // Overriding findAll to perform joins with Vendor, Address, and PurchaseOrderItems
    async findAll(options = {}) {
        return await PurchaseOrder.findAll({
            include: [
                {
                    model: Vendor,
                    as: "vendor",
                    attributes: ["vendorId", "vendorName", "companyName", "gstin"],
                },
                {
                    model: Address,
                    as: "deliveryAddress",
                },
                {
                    model: PurchaseOrderItem,
                    as: "items",
                    attributes: ["id", "productId", "quantity", "unitPrice", "totalPrice"],
                },
            ],
            order: [["createdAt", "DESC"]],
            ...options,
        });
    }

    // Overriding FindById to perform deep joins with Vendor, VendorContact, Address, PurchaseOrderItem -> Product, Activities
    async FindById(id: number) {
        const po = await PurchaseOrder.findByPk(id, {
            include: [
                {
                    model: Vendor,
                    as: "vendor",
                    attributes: ["vendorId", "vendorName", "companyName", "gstin"],
                    include: [
                        {
                            model: VendorContact,
                            as: "contacts",
                            attributes: ["vendorContactId", "name", "email", "mobile"],
                        },
                    ],
                },
                {
                    model: Address,
                    as: "deliveryAddress",
                },
                {
                    model: PurchaseOrderItem,
                    as: "items",
                    include: [
                        {
                            model: Product,
                            as: "product",
                            attributes: ["id", "productName", "sku", "barcode"],
                        },
                    ],
                },
                {
                    model: PurchaseOrderActivity,
                    as: "activities",
                },
            ],
        });

        if (!po) {
            const error: any = new Error("Purchase Order not found");
            error.status = 404;
            throw error;
        }

        return po;
    }

    // Custom method for Stats
    async getPOStats() {
        const totalCount = await PurchaseOrder.count();
        const pendingCount = await PurchaseOrder.count({ where: { status: "Pending" } });
        const completedCount = await PurchaseOrder.count({ where: { status: "Delivered" } });
        const cancelledCount = await PurchaseOrder.count({ where: { status: "Cancelled" } });

        return {
            totalOrders: totalCount,
            pendingOrders: pendingCount,
            completedOrders: completedCount,
            cancelledOrders: cancelledCount,
        };
    }
}

export default new PurchaseOrderService();
