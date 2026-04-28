
export const formatPriceChange = (change: number) => ({
  isPositive: change >= 0,
  arrow: change >= 0 ? '↑' : '↓',
  abs: Math.abs(change).toFixed(2),
});