import { BaseService } from "../baseService.js";
import { SalesOrder, SalesOrderItem } from "../../models/salesOrder/index.js";
import { Product } from "../../models/product/product.model.js";
import { User } from "../../models/User.js";
import { calculateSalesOrderTotals, normalizeSalesOrderPayload } from "../../utils/salesOrder.utils.js";

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

    return {
      totalOrders: totalCount,
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

    await record.update(updatedPayload);

    if (Array.isArray(payload.items) && payload.items.length > 0) {
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
    }

    return record;
  }
}

export default new SalesOrderService();
