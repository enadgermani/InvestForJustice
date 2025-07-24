import { useQuery } from '@tanstack/react-query';
import { buildApiUrl, apiRequest, API_CONFIG } from '../lib/api-config';

export function useFamilies() {
  return useQuery<string[]>({
    queryKey: ['families'],
    queryFn: async () => {
      const url = buildApiUrl(API_CONFIG.ENDPOINTS.FAMILIES);
      return apiRequest<string[]>(url);
    },
    staleTime: 30 * 60 * 1000, // 30 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
  });
}