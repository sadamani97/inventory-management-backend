import { memoize, calculateAnnualAmount, roundAmount } from "./memo.utils.js";

export interface ISalesOrderLineItem {
  productId?: number;
  productName?: string;
  quantity?: number;
  unitPrice?: number;
  product?: {
    productName?: string;
  };
}

export const normalizeSalesOrderPayload = (payload: any = {}) => {
  const items = Array.isArray(payload?.items) ? payload.items : [];
  const summary = calculateSalesOrderTotals(items);

  return {
    ...payload,
    customerName: payload?.customerName ?? payload?.name,
    phone: payload?.phone ?? payload?.mobile,
    status: payload?.status ?? "Draft",
    paymentMode: payload?.paymentMode ?? "Cash",
    subtotal: payload?.subtotal ? roundAmount(payload.subtotal) : summary.subtotal,
    discountAmount: payload?.discountAmount ? roundAmount(payload.discountAmount) : summary.discount,
    totalAmount: payload?.totalAmount ? roundAmount(payload.totalAmount) : summary.total,
    orderDate: payload?.orderDate ?? new Date(),
    items,
  };
};

/**
 * Pure calculation function for Sales Order Totals
 */
const rawCalculateSalesOrderTotals = (items: ISalesOrderLineItem[] = []) => {
  const subtotal = items.reduce((sum, item) => {
    const quantity = Number(item?.quantity ?? 0);
    const unitPrice = Number(item?.unitPrice ?? 0);
    return sum + quantity * unitPrice;
  }, 0);

  const discount = 0;
  const total = roundAmount(subtotal - discount);
  const annualAmount = calculateAnnualAmount(total);

  return {
    subtotal: roundAmount(subtotal),
    discount: roundAmount(discount),
    total,
    annualAmount,
  };
};

/**
 * Memoized Sales Order Totals calculation
 */
export const calculateSalesOrderTotals = memoize(rawCalculateSalesOrderTotals);
