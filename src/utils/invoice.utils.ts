import { memoize, calculateAnnualAmount, roundAmount } from "./memo.utils.js";

export interface IInvoiceLineItem {
  productId?: number;
  productName?: string;
  quantity?: number;
  unitPrice?: number;
  totalPrice?: number;
  product?: {
    productName?: string;
  };
}

export const normalizeInvoicePayload = (payload: any = {}) => {
  const items = Array.isArray(payload?.items) ? payload.items : [];

  const calculated = calculateInvoiceTotals(items);

  return {
    ...payload,
    customerName: payload?.customerName ?? payload?.name ?? "Walk in Customer",
    phone: payload?.phone ?? payload?.mobile,
    status: payload?.status ?? "Paid",
    paymentMethod: payload?.paymentMethod ?? "Cash",
    totalItems: payload?.totalItems || calculated.totalItems,
    subtotal: payload?.subtotal ? roundAmount(payload.subtotal) : calculated.subtotal,
    discountAmount: payload?.discountAmount ? roundAmount(payload.discountAmount) : calculated.discount,
    totalAmount: payload?.totalAmount ? roundAmount(payload.totalAmount) : calculated.total,
    invoiceDate: payload?.invoiceDate ?? new Date(),
    items,
  };
};

/**
 * Pure calculation function for Invoice Totals
 */
const rawCalculateInvoiceTotals = (items: IInvoiceLineItem[] = []) => {
  const subtotal = items.reduce((sum: number, item: IInvoiceLineItem) => {
    const quantity = Number(item?.quantity ?? 1);
    const unitPrice = Number(item?.unitPrice ?? 0);
    return sum + quantity * unitPrice;
  }, 0);

  const totalItems = items.reduce((sum: number, item: IInvoiceLineItem) => {
    return sum + Number(item?.quantity ?? 1);
  }, 0);

  const discount = 0;
  const total = roundAmount(subtotal - discount);
  const avgItemPrice = totalItems > 0 ? roundAmount(total / totalItems) : 0;
  const annualAmount = calculateAnnualAmount(total);

  return {
    subtotal: roundAmount(subtotal),
    discount: roundAmount(discount),
    total,
    totalItems,
    avgItemPrice,
    annualAmount,
  };
};

/**
 * Memoized Invoice Totals calculation
 */
export const calculateInvoiceTotals = memoize(rawCalculateInvoiceTotals);
