import { productService } from '../../src/services/productService';
import { Product, ProductsResponse } from '../../src/types/product.types';

jest.mock('../../src/services/apiClient', () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
  },
}));

jest.mock('../../src/utils/retry', () => ({
  retry: jest.fn(fn => fn()),
}));

jest.mock('../../src/utils/logger');

import apiClient from '../../src/services/apiClient';

const mockApiClient = apiClient as jest.Mocked<typeof apiClient>;

describe('productService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getProducts', () => {
    const mockProductsResponse: ProductsResponse = {
      products: [
        {
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
        } as Product,
        {
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
        } as Product,
      ],
      total: 2,
      skip: 0,
      limit: 30,
    };

    it('should fetch products with default parameters', async () => {
      mockApiClient.get.mockResolvedValue({ data: mockProductsResponse });

      const result = await productService.getProducts();

      expect(mockApiClient.get).toHaveBeenCalledWith('/products', {
        params: { limit: 10, skip: 0 },
        signal: undefined,
      });
      expect(result).toEqual(mockProductsResponse);
    });

    it('should fetch products with custom parameters', async () => {
      mockApiClient.get.mockResolvedValue({ data: mockProductsResponse });

      const result = await productService.getProducts(10, 5);

      expect(mockApiClient.get).toHaveBeenCalledWith('/products', {
        params: { limit: 10, skip: 5 },
        signal: undefined,
      });
      expect(result).toEqual(mockProductsResponse);
    });

    it('should pass abort signal when provided', async () => {
      const abortController = new AbortController();
      mockApiClient.get.mockResolvedValue({ data: mockProductsResponse });

      await productService.getProducts(30, 0, abortController.signal);

      expect(mockApiClient.get).toHaveBeenCalledWith('/products', {
        params: { limit: 30, skip: 0 },
        signal: abortController.signal,
      });
    });
  });

  describe('getProduct', () => {
    const mockProduct: Product = {
      id: 1,
      title: 'Test Product',
      description: 'Test description',
      price: 100,
      discountPercentage: 10,
      rating: 4.5,
      stock: 50,
      brand: 'Test Brand',
      category: 'test-category',
      thumbnail: 'https://test.com/thumb.jpg',
      images: ['https://test.com/img1.jpg', 'https://test.com/img2.jpg'],
      tags: ['test'],
    };

    it('should fetch single product by id', async () => {
      mockApiClient.get.mockResolvedValue({ data: mockProduct });

      const result = await productService.getProduct('1');

      expect(mockApiClient.get).toHaveBeenCalledWith('/products/1', {
        signal: undefined,
      });
      expect(result).toEqual(mockProduct);
    });

    it('should pass abort signal when provided', async () => {
      const abortController = new AbortController();
      mockApiClient.get.mockResolvedValue({ data: mockProduct });

      await productService.getProduct('1', abortController.signal);

      expect(mockApiClient.get).toHaveBeenCalledWith('/products/1', {
        signal: abortController.signal,
      });
    });
  });

  describe('error handling', () => {
    it('should handle API errors', async () => {
      const errorMessage = 'Network Error';
      mockApiClient.get.mockRejectedValue(new Error(errorMessage));

      await expect(productService.getProducts()).rejects.toThrow(errorMessage);
    });

    it('should handle 404 errors for single product', async () => {
      mockApiClient.get.mockRejectedValue({
        response: { status: 404 },
        message: 'Product not found',
      });

      await expect(productService.getProduct('999')).rejects.toMatchObject({
        response: { status: 404 },
      });
    });
  });
});
