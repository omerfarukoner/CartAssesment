import React from 'react';
import { renderHook, act } from '@testing-library/react-native';
import { CartProvider, useCart } from '../../src/context/CartContext';
import { Product } from '../../src/types/product.types';

jest.mock('../../src/services/cacheService', () => ({
  cacheService: {
    get: jest.fn(),
    set: jest.fn(),
  },
  CACHE_KEYS: {
    CART: 'cart',
  },
}));

jest.mock('../../src/utils/priceHelpers', () => ({
  calculateTotalPrice: jest.fn(items =>
    items.reduce(
      (sum: number, item: any) => sum + item.price * item.quantity,
      0,
    ),
  ),
}));

jest.mock('../../src/utils/logger', () => ({
  __esModule: true,
  default: {
    info: jest.fn(),
    debug: jest.fn(),
    error: jest.fn(),
  },
}));

const mockProduct1: Product = {
  id: 1,
  title: 'Test Product 1',
  description: 'Test description 1',
  price: 100,
  discountPercentage: 10,
  rating: 4.5,
  stock: 50,
  brand: 'Test Brand',
  category: 'test-category',
  thumbnail: 'https://test.com/thumb1.jpg',
  images: ['https://test.com/img1.jpg'],
  tags: ['test'],
};

const mockProduct2: Product = {
  id: 2,
  title: 'Test Product 2',
  description: 'Test description 2',
  price: 200,
  discountPercentage: 20,
  rating: 4.0,
  stock: 30,
  brand: 'Test Brand 2',
  category: 'test-category-2',
  thumbnail: 'https://test.com/thumb2.jpg',
  images: ['https://test.com/img2.jpg'],
  tags: ['test2'],
};

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <CartProvider>{children}</CartProvider>
);

describe('CartContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('useCart hook', () => {
    it('should throw error when used outside CartProvider', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      try {
        renderHook(() => useCart());
      } catch (error) {
        expect(error).toEqual(
          Error('useCart must be used within a CartProvider'),
        );
      }

      consoleSpy.mockRestore();
    });

    it('should initialize with empty cart', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      expect(result.current.cart).toEqual({
        items: [],
        totalItems: 0,
        totalPrice: 0,
      });
      expect(typeof result.current.addToCart).toBe('function');
      expect(typeof result.current.removeFromCart).toBe('function');
      expect(typeof result.current.updateQuantity).toBe('function');
      expect(typeof result.current.clearCart).toBe('function');
      expect(typeof result.current.isProductInCart).toBe('function');
      expect(typeof result.current.getProductQuantity).toBe('function');
    });
  });

  describe('cart operations', () => {
    it('should add product to cart', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addToCart(mockProduct1);
      });

      expect(result.current.cart.items).toHaveLength(1);
      expect(result.current.cart.items[0]).toEqual({
        product: mockProduct1,
        quantity: 1,
      });
      expect(result.current.cart.totalItems).toBe(1);
      expect(result.current.cart.totalPrice).toBe(100);
    });

    it('should increase quantity when adding same product', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addToCart(mockProduct1);
        result.current.addToCart(mockProduct1);
      });

      expect(result.current.cart.items).toHaveLength(1);
      expect(result.current.cart.items[0].quantity).toBe(2);
      expect(result.current.cart.totalItems).toBe(2);
      expect(result.current.cart.totalPrice).toBe(200);
    });

    it('should add multiple different products', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addToCart(mockProduct1);
        result.current.addToCart(mockProduct2);
      });

      expect(result.current.cart.items).toHaveLength(2);
      expect(result.current.cart.totalItems).toBe(2);
      expect(result.current.cart.totalPrice).toBe(300);
    });

    it('should remove product from cart', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addToCart(mockProduct1);
        result.current.addToCart(mockProduct2);
      });

      expect(result.current.cart.items).toHaveLength(2);

      act(() => {
        result.current.removeFromCart(mockProduct1.id);
      });

      expect(result.current.cart.items).toHaveLength(1);
      expect(result.current.cart.items[0].product.id).toBe(mockProduct2.id);
      expect(result.current.cart.totalItems).toBe(1);
      expect(result.current.cart.totalPrice).toBe(200);
    });

    it('should update product quantity', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addToCart(mockProduct1);
      });

      act(() => {
        result.current.updateQuantity(mockProduct1.id, 3);
      });

      expect(result.current.cart.items[0].quantity).toBe(3);
      expect(result.current.cart.totalItems).toBe(3);
      expect(result.current.cart.totalPrice).toBe(300);
    });

    it('should remove product when quantity is updated to 0', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addToCart(mockProduct1);
      });

      expect(result.current.cart.items).toHaveLength(1);

      act(() => {
        result.current.updateQuantity(mockProduct1.id, 0);
      });

      expect(result.current.cart.items).toHaveLength(0);
      expect(result.current.cart.totalItems).toBe(0);
      expect(result.current.cart.totalPrice).toBe(0);
    });

    it('should clear entire cart', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addToCart(mockProduct1);
        result.current.addToCart(mockProduct2);
      });

      expect(result.current.cart.items).toHaveLength(2);

      act(() => {
        result.current.clearCart();
      });

      expect(result.current.cart.items).toHaveLength(0);
      expect(result.current.cart.totalItems).toBe(0);
      expect(result.current.cart.totalPrice).toBe(0);
    });
  });

  describe('utility functions', () => {
    it('should check if product is in cart', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      expect(result.current.isProductInCart(mockProduct1.id)).toBe(false);

      act(() => {
        result.current.addToCart(mockProduct1);
      });

      expect(result.current.isProductInCart(mockProduct1.id)).toBe(true);
      expect(result.current.isProductInCart(mockProduct2.id)).toBe(false);
    });

    it('should get product quantity from cart', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      expect(result.current.getProductQuantity(mockProduct1.id)).toBe(0);

      act(() => {
        result.current.addToCart(mockProduct1);
        result.current.addToCart(mockProduct1);
      });

      expect(result.current.getProductQuantity(mockProduct1.id)).toBe(2);
      expect(result.current.getProductQuantity(mockProduct2.id)).toBe(0);
    });
  });

  describe('edge cases', () => {
    it('should handle updating quantity of non-existent product', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.updateQuantity(999, 5);
      });

      expect(result.current.cart.items).toHaveLength(0);
    });

    it('should handle removing non-existent product', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addToCart(mockProduct1);
      });

      expect(result.current.cart.items).toHaveLength(1);

      act(() => {
        result.current.removeFromCart(999);
      });

      expect(result.current.cart.items).toHaveLength(1);
    });

    it('should handle negative quantity update', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addToCart(mockProduct1);
      });

      act(() => {
        result.current.updateQuantity(mockProduct1.id, -1);
      });

      expect(result.current.cart.items).toHaveLength(0);
    });
  });
});
