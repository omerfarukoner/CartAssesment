import Logger from './logger';

export const sleep = (ms: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, ms));

export const retry = async <T>(
  fn: () => Promise<T>,
  maxAttempts: number = 3,
  baseDelay: number = 1000,
  backoffMultiplier: number = 2,
  signal?: AbortSignal,
): Promise<T> => {
  let attempt = 1;

  while (attempt <= maxAttempts) {
    try {
      if (signal?.aborted) {
        throw new Error('Request was aborted');
      }

      const result = await fn();

      if (attempt > 1) {
        Logger.info(`Request succeeded on attempt ${attempt}`);
      }

      return result;
    } catch (error: any) {
      if (signal?.aborted) {
        throw error;
      }

      const shouldRetry =
        attempt < maxAttempts &&
        (!error.response || error.response.status >= 500);

      if (!shouldRetry) {
        Logger.error(`Request failed after ${attempt} attempts`, error);
        throw error;
      }

      const delay = baseDelay * Math.pow(backoffMultiplier, attempt - 1);
      Logger.warn(
        `Request failed on attempt ${attempt}, retrying in ${delay}ms`,
        {
          error: error.message,
          status: error.response?.status,
        },
      );

      await sleep(delay);
      attempt++;
    }
  }

  throw new Error('Max retry attempts reached');
};
