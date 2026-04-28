



export const formatPrice = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
};

export const formatMarketCap = (value: number): string => {
  if (value >= 1e9) {
    return (value / 1e9).toFixed(2) + "B";
  }
  return (value / 1e6).toFixed(2) + "M";
};