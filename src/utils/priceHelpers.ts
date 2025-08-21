export const formatPrice = (price: number): string => {
  return `$${price.toFixed(2)}`;
};

export const calculateDiscountedPrice = (
  price: number,
  discountPercentage: number,
): number => {
  return price * (1 - discountPercentage / 100);
};

export const formatDiscountedPrice = (
  price: number,
  discountPercentage: number,
): string => {
  const discountedPrice = calculateDiscountedPrice(price, discountPercentage);
  return formatPrice(discountedPrice);
};

export const calculateTotalPrice = (
  items: Array<{ price: number; quantity: number }>,
): number => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

export const calculateSavings = (
  originalPrice: number,
  discountPercentage: number,
): number => {
  return originalPrice * (discountPercentage / 100);
};
