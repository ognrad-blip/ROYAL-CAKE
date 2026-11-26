export const din = (n: number) =>
  new Intl.NumberFormat("sr-RS", { maximumFractionDigits: 0 }).format(Math.round(n)) + " din";
