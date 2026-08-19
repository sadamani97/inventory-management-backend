import { BaseService } from "../baseService.js";
import { SalesOrder, SalesOrderItem } from "../../models/salesOrder/index.js";
import { Product } from "../../models/product/product.model.js";
import { User } from "../../models/User.js";
import { calculateSalesOrderTotals, normalizeSalesOrderPayload } from "../../utils/salesOrder.utils.js";
import { formatCurrency } from "../../utils/memo.utils.js";
import { alertService } from "../alertService/alert.service.js";

class SalesOrderService extends BaseService<any> {
  constructor() {
    super(SalesOrder, "id", "orderNumber", "Sales order");
  }

  async create(data: any) {
    const payload = normalizeSalesOrderPayload(data ?? {});
    const { items = [] } = payload;

    const exists = await SalesOrder.findOne({
      where: { orderNumber: payload.orderNumber },
    });

    if (exists) {
      throw new Error("Sales order already exists");
    }

    // Validate product availability and stock level
    if (Array.isArray(items) && items.length > 0) {
      for (const item of items) {
        if (!item.productId) {
          throw new Error("Product ID is required for all order items");
        }
        const prod = await Product.findByPk(item.productId);
        if (!prod) {
          throw new Error(`Product not available: Product with ID ${item.productId} was not found in inventory.`);
        }
        if (prod.quantity < Number(item.quantity ?? 1)) {
          throw new Error(`Out of stock product: ${prod.productName}. Available stock: ${prod.quantity}, requested: ${item.quantity}.`);
        }
      }
    }

    const salesOrder = await SalesOrder.create({
      ...payload,
      subtotal: payload.subtotal ?? 0,
      discountAmount: payload.discountAmount ?? 0,
      totalAmount: payload.totalAmount ?? 0,
    });

    if (Array.isArray(items) && items.length > 0) {
      const rows = items.map((item: any) => ({
        salesOrderId: salesOrder.id,
        productId: item.productId,
        productName: item.productName ?? item.product?.productName,
        quantity: Number(item.quantity ?? 1),
        unitPrice: Number(item.unitPrice ?? 0),
        totalPrice: Number((item.quantity ?? 1) * (item.unitPrice ?? 0)),
      }));

      await SalesOrderItem.bulkCreate(rows);

      // Reduce product stock & check stock alerts
      for (const item of items) {
        if (item.productId) {
          const prod = await Product.findByPk(item.productId);
          if (prod) {
            const newQty = Math.max(0, prod.quantity - Number(item.quantity ?? 1));
            await prod.update({ quantity: newQty });
            await alertService.checkAndSyncProductAlerts(prod);
          }
        }
      }
    }

    return salesOrder;
  }

  async findAll(options = {}) {
    return await SalesOrder.findAll({
      include: [
        {
          model: SalesOrderItem,
          as: "items",
          include: [
            {
              model: Product,
              as: "product",
              attributes: ["id", "productName", "sku", "sellingPrice"],
            },
          ],
        },
        {
          model: User,
          as: "createdBy",
          attributes: ["id", "email"],
        },
      ],
      order: [["createdAt", "DESC"]],
      ...options,
    });
  }

  async FindById(id: number) {
    const record = await SalesOrder.findByPk(id, {
      include: [
        {
          model: SalesOrderItem,
          as: "items",
          include: [
            {
              model: Product,
              as: "product",
              attributes: ["id", "productName", "sku", "sellingPrice"],
            },
          ],
        },
        {
          model: User,
          as: "createdBy",
          attributes: ["id", "email"],
        },
      ],
    });

    if (!record) {
      const error: any = new Error("Sales order not found");
      error.status = 404;
      throw error;
    }

    return record;
  }

  async getSalesOrderStats() {
    const totalCount = await SalesOrder.count();
    const paidCount = await SalesOrder.count({ where: { status: "Paid" } });
    const pendingCount = await SalesOrder.count({ where: { status: "Pending" } });
    const draftCount = await SalesOrder.count({ where: { status: "Draft" } });

    const sumResult: any = await SalesOrder.sum("totalAmount");
    const totalOrderValue = Number(sumResult ?? 0);
    const averageOrderValue = totalCount > 0 ? Number((totalOrderValue / totalCount).toFixed(2)) : 0;

    const activeBuyers = await SalesOrder.count({
      distinct: true,
      col: "customerName",
    });

    return {
      totalSalesOrders: totalCount,
      totalOrders: totalCount,
      totalOrderValue,
      totalOrderValueFormatted: formatCurrency(totalOrderValue),
      averageOrderValue,
      averageOrderValueFormatted: `₹${averageOrderValue}`,
      activeBuyers,
      paidOrders: paidCount,
      pendingOrders: pendingCount,
      draftOrders: draftCount,
    };
  }

  async Update(id: number, data: any) {
    const payload = normalizeSalesOrderPayload(data ?? {});
    const summary = calculateSalesOrderTotals(payload.items ?? []);

    const updatedPayload = {
      ...payload,
      subtotal: summary.subtotal,
      discountAmount: summary.discount,
      totalAmount: summary.total,
    };

    const record = await SalesOrder.findByPk(id);

    if (!record) {
      const error: any = new Error("Sales order not found");
      error.status = 404;
      throw error;
    }

    // Validate product availability and stock level
    if (Array.isArray(payload.items) && payload.items.length > 0) {
      for (const item of payload.items) {
        if (!item.productId) {
          throw new Error("Product ID is required for all order items");
        }
        const prod = await Product.findByPk(item.productId);
        if (!prod) {
          throw new Error(`Product not available: Product with ID ${item.productId} was not found in inventory.`);
        }
        // Exclude the currently existing sales order item's quantity since they are updating the order.
        // Wait, since we destroy old items and recreate them, we want to check if the new quantity is available.
        // To be safe, we check if the quantity is within stock (or stock + previously ordered quantity if the product is the same).
        const existingItem = await SalesOrderItem.findOne({
          where: { salesOrderId: id, productId: item.productId }
        });
        const currentOrderedQty = existingItem ? Number(existingItem.quantity) : 0;
        const availableStock = prod.quantity + currentOrderedQty;

        if (availableStock < Number(item.quantity ?? 1)) {
          throw new Error(`Out of stock product: ${prod.productName}. Available stock: ${availableStock}, requested: ${item.quantity}.`);
        }
      }
    }

    await record.update(updatedPayload);

    if (Array.isArray(payload.items) && payload.items.length > 0) {
      // Restore stock for old items first
      const oldItems = await SalesOrderItem.findAll({ where: { salesOrderId: id } });
      for (const oldItem of oldItems) {
        const prod = await Product.findByPk(oldItem.productId);
        if (prod) {
          await prod.update({ quantity: prod.quantity + Number(oldItem.quantity) });
        }
      }

      await SalesOrderItem.destroy({ where: { salesOrderId: id } });

      await SalesOrderItem.bulkCreate(
        payload.items.map((item: any) => ({
          salesOrderId: record.id,
          productId: item.productId,
          productName: item.productName ?? item.product?.productName,
          quantity: Number(item.quantity ?? 1),
          unitPrice: Number(item.unitPrice ?? 0),
          totalPrice: Number((item.quantity ?? 1) * (item.unitPrice ?? 0)),
        }))
      );

      // Reduce product stock for new quantities & check stock alerts
      for (const item of payload.items) {
        const prod = await Product.findByPk(item.productId);
        if (prod) {
          const newQty = Math.max(0, prod.quantity - Number(item.quantity ?? 1));
          await prod.update({ quantity: newQty });
          await alertService.checkAndSyncProductAlerts(prod);
        }
      }
    }

    return record;
  }
}

export default new SalesOrderService();
