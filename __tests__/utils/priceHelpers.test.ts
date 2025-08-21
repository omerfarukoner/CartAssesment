import {
  formatPrice,
  calculateDiscountedPrice,
  formatDiscountedPrice,
  calculateTotalPrice,
  calculateSavings,
} from '../../src/utils/priceHelpers';

describe('priceHelpers', () => {
  describe('formatPrice', () => {
    it('should format price with dollar sign and two decimal places', () => {
      expect(formatPrice(19.99)).toBe('$19.99');
      expect(formatPrice(100)).toBe('$100.00');
      expect(formatPrice(5.5)).toBe('$5.50');
    });
  });

  describe('calculateDiscountedPrice', () => {
    it('should calculate discounted price correctly', () => {
      expect(calculateDiscountedPrice(100, 20)).toBe(80);
      expect(calculateDiscountedPrice(50, 10)).toBe(45);
      expect(calculateDiscountedPrice(200, 0)).toBe(200);
    });
  });

  describe('formatDiscountedPrice', () => {
    it('should format discounted price correctly', () => {
      expect(formatDiscountedPrice(100, 20)).toBe('$80.00');
      expect(formatDiscountedPrice(50, 10)).toBe('$45.00');
    });
  });

  describe('calculateTotalPrice', () => {
    it('should calculate total price for multiple items', () => {
      const items = [
        { price: 10, quantity: 2 },
        { price: 25, quantity: 1 },
        { price: 5, quantity: 3 },
      ];
      expect(calculateTotalPrice(items)).toBe(60);
    });

    it('should return 0 for empty array', () => {
      expect(calculateTotalPrice([])).toBe(0);
    });
  });

  describe('calculateSavings', () => {
    it('should calculate savings correctly', () => {
      expect(calculateSavings(100, 20)).toBe(20);
      expect(calculateSavings(50, 10)).toBe(5);
      expect(calculateSavings(200, 0)).toBe(0);
    });
  });
});
