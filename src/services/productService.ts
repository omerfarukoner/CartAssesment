import apiClient from './apiClient';
import { retry } from '../utils/retry';
import { Product, ProductsResponse } from '../types/product.types';

export const productService = {
  getProducts: async (
    limit: number = 10,
    skip: number = 0,
    signal?: AbortSignal,
  ): Promise<ProductsResponse> => {
    return retry(
      async () => {
        const response = await apiClient.get('/products', {
          params: { limit, skip },
          signal,
        });
        return response.data;
      },
      3,
      1000,
      2,
      signal,
    );
  },

  getProduct: async (id: string, signal?: AbortSignal): Promise<Product> => {
    return retry(
      async () => {
        const response = await apiClient.get(`/products/${id}`, { signal });
        return response.data;
      },
      3,
      1000,
      2,
      signal,
    );
  },
};
