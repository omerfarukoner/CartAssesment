import { useState, useEffect, useCallback, useRef } from 'react';
import Logger from '../utils/logger';

export interface UseApiState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useApi = <T>(
  apiCall: (signal?: AbortSignal) => Promise<T>,
  dependencies: any[] = [],
): UseApiState<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const deps = dependencies;

  const fetchData = useCallback(async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    try {
      Logger.debug('Starting API call...');
      setIsLoading(true);
      setError(null);

      const result = await apiCall(abortController.signal);
      Logger.debug('API call completed', { hasData: !!result });

      if (!abortController.signal.aborted) {
        setData(result);
        Logger.debug('API data set successfully');
      }
    } catch (err: any) {
      if (!abortController.signal.aborted) {
        const errorMessage = err.message || 'An unexpected error occurred';
        setError(errorMessage);
        Logger.error('API fetch failed', {
          error: errorMessage,
          status: err.response?.status,
        });
      }
    } finally {
      if (!abortController.signal.aborted) {
        Logger.debug('Setting loading to false');
        setIsLoading(false);
      }
    }
  }, [apiCall]);

  const refetch = useCallback(async () => {
    await fetchData();
  }, [fetchData]);

  useEffect(() => {
    let isMounted = true;

    const runFetch = async () => {
      if (isMounted) {
        await fetchData();
      }
    };

    runFetch();

    return () => {
      isMounted = false;
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchData, ...deps]);

  return { data, isLoading, error, refetch };
};
