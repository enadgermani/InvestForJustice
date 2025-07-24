import { useQuery } from '@tanstack/react-query';
import { buildApiUrl, apiRequest, API_CONFIG } from '../lib/api-config';

export interface Exchange {
  code: string;
  name: string;
}

export function useExchanges() {
  return useQuery<Exchange[]>({
    queryKey: ['exchanges'],
    queryFn: async () => {
      const url = buildApiUrl(API_CONFIG.ENDPOINTS.EXCHANGES);
      return apiRequest<Exchange[]>(url);
    },
    staleTime: 30 * 60 * 1000, // 30 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
  });
}