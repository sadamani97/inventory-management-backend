import { memoize, calculateAnnualAmount, roundAmount } from "./memo.utils.js";

export interface IPurchaseOrderLineItem {
  productId?: number;
  quantity?: number;
  unitPrice?: number;
  totalPrice?: number;
}

export interface IPurchaseOrderCalculationInput {
  items?: IPurchaseOrderLineItem[];
  taxPercentage?: number;
  discountAmount?: number;
}

/**
 * Pure calculation function for Purchase Order Totals
 */
const rawCalculatePurchaseOrderTotals = (input: IPurchaseOrderCalculationInput = {}) => {
  const items = Array.isArray(input?.items) ? input.items : [];
  const taxPercentage = Number(input?.taxPercentage ?? 0);
  const discount = Number(input?.discountAmount ?? 0);

  const subtotal = items.reduce((sum, item) => {
    const quantity = Number(item?.quantity ?? 0);
    const unitPrice = Number(item?.unitPrice ?? 0);
    return sum + quantity * unitPrice;
  }, 0);

  const taxAmount = roundAmount((subtotal * taxPercentage) / 100);
  const total = roundAmount(subtotal + taxAmount - discount);
  const annualAmount = calculateAnnualAmount(total);

  return {
    subtotal: roundAmount(subtotal),
    taxPercentage,
    taxAmount,
    discountAmount: roundAmount(discount),
    totalAmount: total,
    annualAmount,
  };
};

/**
 * Memoized Purchase Order Totals calculation
 */
export const calculatePurchaseOrderTotals = memoize(rawCalculatePurchaseOrderTotals);
