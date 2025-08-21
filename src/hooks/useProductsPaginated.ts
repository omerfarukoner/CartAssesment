import { useState, useCallback, useEffect } from 'react';
import { productService } from '../services/productService';
import { Product } from '../types/product.types';
import Logger from '../utils/logger';

interface UseProductsPaginatedResult {
  products: Product[];
  isLoading: boolean;
  isLoadingMore: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => void;
  refresh: () => void;
  totalProducts: number;
}

export const useProductsPaginated = (
  pageSize: number = 10,
): UseProductsPaginatedResult => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const loadProducts = useCallback(
    async (page: number, isRefresh: boolean = false) => {
      try {
        if (isRefresh) {
          setIsLoading(true);
        } else {
          setIsLoadingMore(true);
        }

        setError(null);

        const skip = page * pageSize;

        if (!isRefresh) {
          await new Promise(resolve =>
            setTimeout(() => resolve(undefined), 500),
          );
        }

        const response = await productService.getProducts(pageSize, skip);

        setTotalProducts(response.total);

        if (isRefresh) {
          setProducts(response.products);
        } else {
          setProducts(prev => {
            const existingIds = new Set(prev.map(p => p.id));
            const newProducts = response.products.filter(
              p => !existingIds.has(p.id),
            );
            Logger.info('Adding new products', {
              existingCount: prev.length,
              newCount: newProducts.length,
              totalAfter: prev.length + newProducts.length,
            });
            return [...prev, ...newProducts];
          });
        }

        const totalLoaded = skip + response.products.length;
        setHasMore(totalLoaded < response.total);

        Logger.info('Products loaded successfully', {
          page,
          loaded: response.products.length,
          total: response.total,
          hasMore: totalLoaded < response.total,
        });
      } catch (err: any) {
        const errorMessage = err.message || 'Failed to load products';
        setError(errorMessage);
        Logger.error('Failed to load products', err);
      } finally {
        setIsLoading(false);
        setIsLoadingMore(false);
      }
    },
    [pageSize],
  );

  const loadMore = useCallback(() => {
    if (!isLoadingMore && !isLoading && hasMore) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      setIsLoadingMore(true);
      loadProducts(nextPage, false);
    }
  }, [isLoadingMore, isLoading, hasMore, currentPage, loadProducts]);

  const refresh = useCallback(() => {
    setCurrentPage(0);
    setProducts([]);
    setHasMore(true);
    loadProducts(0, true);
  }, [loadProducts]);

  useEffect(() => {
    loadProducts(0, true);
  }, [pageSize, loadProducts]);

  return {
    products,
    isLoading,
    isLoadingMore,
    error,
    hasMore,
    loadMore,
    refresh,
    totalProducts,
  };
};
