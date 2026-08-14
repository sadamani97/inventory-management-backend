import { Op } from "sequelize";
import { BaseService } from "../baseService.js";
import { Invoice, InvoiceItem } from "../../models/invoice/index.js";
import { Product } from "../../models/product/product.model.js";
import { User } from "../../models/User.js";
import { SalesOrder } from "../../models/salesOrder/index.js";
import { calculateInvoiceTotals, normalizeInvoicePayload } from "../../utils/invoice.utils.js";
import { formatCurrency } from "../../utils/memo.utils.js";

class InvoiceService extends BaseService<any> {
  constructor() {
    super(Invoice, "id", "invoiceNumber", "Invoice");
  }

  async create(data: any) {
    const payload = normalizeInvoicePayload(data ?? {});
    const { items = [] } = payload;

    const exists = await Invoice.findOne({
      where: { invoiceNumber: payload.invoiceNumber },
    });

    if (exists) {
      throw new Error("Invoice number already exists");
    }

    const calculated = calculateInvoiceTotals(items);

    const invoice = await Invoice.create({
      ...payload,
      totalItems: payload.totalItems || calculated.totalItems,
      subtotal: payload.subtotal || calculated.subtotal,
      discountAmount: payload.discountAmount || calculated.discount,
      totalAmount: payload.totalAmount || calculated.total,
    });

    if (Array.isArray(items) && items.length > 0) {
      const lineItems = await Promise.all(
        items.map(async (item: any) => {
          let validProductId: number | null = null;
          if (item?.productId) {
            const productExists = await Product.findByPk(Number(item.productId));
            if (productExists) {
              validProductId = productExists.id;
            }
          }

          return {
            invoiceId: invoice.id,
            productId: validProductId,
            productName: item?.productName ?? item?.product?.productName ?? "Product Item",
            quantity: Number(item?.quantity ?? 1),
            unitPrice: Number(item?.unitPrice ?? 0),
            totalPrice: Number((item?.quantity ?? 1) * (item?.unitPrice ?? 0)),
          };
        })
      );

      await InvoiceItem.bulkCreate(lineItems);
    }

    return invoice;
  }

  async findAll(options = {}) {
    return await Invoice.findAll({
      include: [
        {
          model: InvoiceItem,
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
          attributes: ["id", "email", "firstname", "lastname"],
        },
        {
          model: SalesOrder,
          as: "salesOrder",
          attributes: ["id", "orderNumber", "status"],
        },
      ],
      order: [["createdAt", "DESC"]],
      ...options,
    });
  }

  async FindById(id: number) {
    const record = await Invoice.findByPk(id, {
      include: [
        {
          model: InvoiceItem,
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
          attributes: ["id", "email", "firstname", "lastname"],
        },
        {
          model: SalesOrder,
          as: "salesOrder",
          attributes: ["id", "orderNumber", "status"],
        },
      ],
    });

    if (!record) {
      const error: any = new Error("Invoice not found");
      error.status = 404;
      throw error;
    }

    return record;
  }

  async getInvoiceStats() {
    const totalCount = await Invoice.count();

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    const todaysCount = await Invoice.count({
      where: {
        createdAt: {
          [Op.between]: [startOfToday, endOfToday],
        },
      },
    });

    const sumResult: any = await Invoice.sum("totalAmount");
    const overallValue = Number(sumResult ?? 0);

    const avgValue = totalCount > 0 ? Number((overallValue / totalCount).toFixed(2)) : 0;
    const annualProjectedInvoiceValue = Number((overallValue * 12).toFixed(2));

    return {
      totalInvoices: totalCount,
      todaysInvoices: todaysCount,
      overallInvoiceValue: overallValue,
      overallInvoiceValueFormatted: formatCurrency(overallValue),
      avgInvoiceValue: avgValue,
      avgInvoiceValueFormatted: `₹${avgValue}`,
      annualProjectedInvoiceValue,
    };
  }

  async Update(id: number, data: any) {
    const record = await Invoice.findByPk(id);

    if (!record) {
      const error: any = new Error("Invoice not found");
      error.status = 404;
      throw error;
    }

    const payload = normalizeInvoicePayload({
      ...record.toJSON(),
      ...(data ?? {}),
    });

    if (payload?.invoiceNumber && payload.invoiceNumber !== record.invoiceNumber) {
      const exists = await Invoice.findOne({
        where: {
          invoiceNumber: payload.invoiceNumber,
          id: { [Op.ne]: id },
        },
      });

      if (exists) {
        throw new Error("Invoice number already exists");
      }
    }

    const itemsToProcess = Array.isArray(data?.items) ? data.items : (payload.items ?? []);
    const calculated = calculateInvoiceTotals(itemsToProcess);

    const updatedPayload = {
      ...payload,
      totalItems: calculated.totalItems || payload.totalItems,
      subtotal: calculated.subtotal || payload.subtotal,
      discountAmount: calculated.discount || payload.discountAmount,
      totalAmount: calculated.total || payload.totalAmount,
    };

    await record.update(updatedPayload);

    if (Array.isArray(data?.items)) {
      await InvoiceItem.destroy({ where: { invoiceId: id } });

      const lineItems = await Promise.all(
        data.items.map(async (item: any) => {
          let validProductId: number | null = null;
          if (item?.productId) {
            const productExists = await Product.findByPk(Number(item.productId));
            if (productExists) {
              validProductId = productExists.id;
            }
          }

          return {
            invoiceId: record.id,
            productId: validProductId,
            productName: item?.productName ?? item?.product?.productName ?? "Product Item",
            quantity: Number(item?.quantity ?? 1),
            unitPrice: Number(item?.unitPrice ?? 0),
            totalPrice: Number((item?.quantity ?? 1) * (item?.unitPrice ?? 0)),
          };
        })
      );

      await InvoiceItem.bulkCreate(lineItems);
    }

    return await this.FindById(id);
  }
}

export default new InvoiceService();
