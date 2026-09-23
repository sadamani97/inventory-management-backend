/**
 * Pure function memoization utility for model calculations
 */
export function memoize<T, R>(fn: (arg: T) => R): (arg: T) => R {
  const cache = new Map<string, R>();

  return (arg: T): R => {
    const key = JSON.stringify(arg ?? null);
    if (cache.has(key)) {
      return cache.get(key)!;
    }
    const result = fn(arg);
    cache.set(key, result);
    return result;
  };
}

/**
 * Calculates annual projections based on monthly or per-period values
 */
export const calculateAnnualAmount = (monthlyOrPeriodAmount: number): number => {
  return Number((Number(monthlyOrPeriodAmount ?? 0) * 12).toFixed(2));
};

/**
 * Safely rounds decimal amounts to 2 decimal places
 */
export const roundAmount = (amount: number): number => {
  return Number(Math.round(Number(`${amount ?? 0}e2`)) + "e-2");
};

/**
 * Formats numbers into readable Lakh / Crore format (e.g. 560000 -> "₹5.6L")
 */
export const formatCurrency = (amount: number): string => {
  const value = Number(amount ?? 0);
  if (value >= 10000000) {
    return `₹${(value / 10000000).toFixed(1)}Cr`;
  }
  if (value >= 100000) {
    return `₹${(value / 100000).toFixed(1)}L`;
  }
  if (value >= 1000) {
    return `₹${(value / 1000).toFixed(1)}k`;
  }
  return `₹${value.toFixed(0)}`;
};
