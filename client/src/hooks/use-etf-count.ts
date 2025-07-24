import { useQuery } from '@tanstack/react-query';
import { buildApiUrl, apiRequest, API_CONFIG } from '../lib/api-config';

export function useETFCount() {
  return useQuery({
    queryKey: ['/api/etf-count'],
    queryFn: async (): Promise<number> => {
      const url = buildApiUrl(API_CONFIG.ENDPOINTS.ETF_COUNT);
      const data = await apiRequest<{ count: number }>(url);
      return data.count;
    },
    staleTime: 30 * 60 * 1000, // 30 minutes - ETF count doesn't change frequently
    gcTime: 60 * 60 * 1000, // 1 hour - keep in memory cache
    retry: 3,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}