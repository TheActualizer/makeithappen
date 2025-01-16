import { useState, useCallback } from 'react';
import { apiClient } from '@/api/client';
import { cacheService } from '@/services/cacheService';
import { API_CONFIG } from '@/api/config';
import type { ApiResponse } from '@/api/types';

interface UseApiOptions {
  cacheDuration?: number;
  cacheKey?: string;
}

export function useApi<T>(endpoint: string, options: UseApiOptions = {}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T | null>(null);

  const fetchData = useCallback(async () => {
    const { cacheDuration = API_CONFIG.cacheDuration, cacheKey } = options;

    if (cacheKey) {
      const cachedData = cacheService.get<T>(cacheKey);
      if (cachedData) {
        console.log(`useApi: Using cached data for ${cacheKey}`);
        setData(cachedData);
        return;
      }
    }

    setLoading(true);
    setError(null);

    try {
      console.log(`useApi: Fetching data from ${endpoint}`);
      const response: ApiResponse<T> = await apiClient.get(endpoint);

      if (response.error) {
        throw new Error(response.error);
      }

      setData(response.data);

      if (cacheKey && response.data) {
        cacheService.set(cacheKey, response.data, cacheDuration);
      }
    } catch (err) {
      console.error(`useApi: Error fetching data from ${endpoint}`, err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [endpoint, options]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
}