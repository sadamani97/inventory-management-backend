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
  const items = Array.isArray(payload.items) ? payload.items : [];

  return {
    ...payload,
    customerName: payload.customerName ?? payload.name,
    phone: payload.phone ?? payload.mobile,
    status: payload.status ?? "Draft",
    paymentMode: payload.paymentMode ?? "Cash",
    subtotal: Number(payload.subtotal ?? 0),
    discountAmount: Number(payload.discountAmount ?? 0),
    totalAmount: Number(payload.totalAmount ?? 0),
    orderDate: payload.orderDate ?? new Date(),
    items,
  };
};

export const calculateSalesOrderTotals = (items: ISalesOrderLineItem[] = []) => {
  const subtotal = items.reduce((sum, item) => {
    const quantity = Number(item.quantity ?? 0);
    const unitPrice = Number(item.unitPrice ?? 0);
    return sum + quantity * unitPrice;
  }, 0);

  const discount = 0;
  const total = subtotal - discount;

  return {
    subtotal,
    discount,
    total,
  };
};
