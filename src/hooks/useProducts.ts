import { useCallback } from 'react';
import { useApi } from './useApi';
import { productService } from '../services/productService';
import { ProductsResponse, Product } from '../types/product.types';

export const useProducts = (limit: number = 30, skip: number = 0) => {
  const apiCall = useCallback(
    (signal?: AbortSignal) => productService.getProducts(limit, skip, signal),
    [limit, skip],
  );

  return useApi<ProductsResponse>(apiCall, [limit, skip]);
};

export const useProduct = (productId: string) => {
  const apiCall = useCallback(
    (signal?: AbortSignal) => productService.getProduct(productId, signal),
    [productId],
  );

  return useApi<Product>(apiCall, [productId]);
};
