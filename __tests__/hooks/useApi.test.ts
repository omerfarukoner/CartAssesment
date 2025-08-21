import { act, renderHook, waitFor } from '@testing-library/react-native';
import { useApi } from '../../src/hooks/useApi';

jest.mock('../../src/utils/logger', () => ({
  __esModule: true,
  default: {
    debug: jest.fn(),
    info: jest.fn(),
    error: jest.fn(),
  },
}));

describe('useApi', () => {
  const mockApiCall = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with loading state', () => {
    mockApiCall.mockResolvedValue('test data');

    const { result } = renderHook(() => useApi(mockApiCall));

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe(null);
    expect(typeof result.current.refetch).toBe('function');
  });

  it('should fetch data successfully', async () => {
    const testData = { id: 1, name: 'Test Product' };
    mockApiCall.mockResolvedValue(testData);

    const { result } = renderHook(() => useApi(mockApiCall));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toEqual(testData);
    expect(result.current.error).toBe(null);
    expect(mockApiCall).toHaveBeenCalledTimes(1);
  });

  it('should handle API errors', async () => {
    const errorMessage = 'Network error';
    mockApiCall.mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useApi(mockApiCall));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe(errorMessage);
    expect(mockApiCall).toHaveBeenCalledTimes(1);
  });

  it('should refetch data when refetch is called', async () => {
    const testData1 = { id: 1, name: 'Test Product 1' };
    const testData2 = { id: 2, name: 'Test Product 2' };

    mockApiCall
      .mockResolvedValueOnce(testData1)
      .mockResolvedValueOnce(testData2);

    const { result } = renderHook(() => useApi(mockApiCall));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toEqual(testData1);

    await act(async () => {
      await result.current.refetch();
    });

    await waitFor(() => {
      expect(result.current.data).toEqual(testData2);
    });

    expect(mockApiCall).toHaveBeenCalledTimes(2);
  });

  it('should handle AbortSignal correctly', async () => {
    const testData = { id: 1, name: 'Test Product' };

    mockApiCall.mockImplementation(signal => {
      return new Promise((resolve, reject) => {
        if (signal?.aborted) {
          reject(new Error('Request aborted'));
        } else {
          resolve(testData);
        }
      });
    });

    const { result } = renderHook(() => useApi(mockApiCall));

    await waitFor(() => {
      expect(mockApiCall).toHaveBeenCalledWith(expect.any(AbortSignal));
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.data).toEqual(testData);
    });
  });

  it('should update when dependencies change', async () => {
    const testData1 = { id: 1, name: 'Test Product 1' };
    const testData2 = { id: 2, name: 'Test Product 2' };

    mockApiCall
      .mockResolvedValueOnce(testData1)
      .mockResolvedValueOnce(testData2);

    let dependency = 'dep1';

    const { result, rerender } = renderHook(() =>
      useApi(mockApiCall, [dependency]),
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toEqual(testData1);
    expect(mockApiCall).toHaveBeenCalledTimes(1);

    dependency = 'dep2';
    rerender({ dependency });

    await waitFor(() => {
      expect(result.current.data).toEqual(testData2);
    });

    expect(mockApiCall).toHaveBeenCalledTimes(2);
  });
});
