import { useQuery } from '@tanstack/react-query';
import { buildApiUrl, apiRequest, API_CONFIG } from '../lib/api-config';

export interface EtfHoldings {
  Ticker: string;
  EtfName: string;
  FossilFuelsPercentage: number;
  FossilFuelsHoldings: string[];
  WeaponsPercentage: number;
  WeaponsHoldings: string[];
  GazaListPercentage: number;
  GazaListHoldings: string[];
}

export function useEtfHoldings(ticker: string | null) {
  return useQuery<EtfHoldings>({
    queryKey: ['etf-holdings', ticker],
    queryFn: async () => {
      if (!ticker) throw new Error('No ticker provided');
      
      // Remove "^" prefix if present
      const cleanTicker = ticker.startsWith('^') ? ticker.slice(1) : ticker;
      
      const url = buildApiUrl(`${API_CONFIG.ENDPOINTS.ETF_HOLDINGS}/${cleanTicker}`);
      return apiRequest<EtfHoldings>(url);
    },
    enabled: !!ticker,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes (renamed from cacheTime in v5)
  });
}