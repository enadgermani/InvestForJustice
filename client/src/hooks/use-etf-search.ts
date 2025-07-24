import { useQuery } from '@tanstack/react-query';
import { ETFData } from './use-etf-data';
import { buildApiUrl, apiRequest, API_CONFIG } from '../lib/api-config';

interface SearchParams {
  q?: string;
  provider?: string;
  exchange?: string;
}

const fetchETFSearch = async (params: SearchParams): Promise<ETFData[]> => {
  const searchParams = new URLSearchParams();
  
  // Only add parameters that have actual values (not "all" or empty)
  if (params.q && params.q.trim()) {
    searchParams.append('q', params.q.trim());
  }
  if (params.provider && params.provider !== 'all') {
    searchParams.append('provider', params.provider);
  }
  if (params.exchange && params.exchange !== 'all') {
    searchParams.append('exchange', params.exchange);
  }

  // Don't make API call if no search criteria
  if (searchParams.toString() === '') {
    return [];
  }

  const urlParams = Object.fromEntries(searchParams.entries());
  const url = buildApiUrl(API_CONFIG.ENDPOINTS.ETF_SEARCH, urlParams);
  console.log('[ETF Search] Calling API:', url);
  
  const data = await apiRequest<any[]>(url);
  console.log(`[ETF Search] Found ${data.length} results`);
  
  // Transform the API response to match our interface
  return data.map((etf: any) => ({
    symbol: etf.symbol || etf.Ticker || etf.ticker || '',
    name: etf.name || (etf.EtfName !== 'etf_name' ? etf.EtfName : null),
    currency: etf.currency || etf.Currency || null,
    summary: etf.summary || etf.Summary || null,
    category_group: etf.category_group || etf.CategoryGroup || null,
    category: etf.category || etf.Category || null,
    family: etf.family || etf.Family || null,
    exchange: etf.exchange || etf.Exchange || null,
    rank: etf.rank || null,
    gazalistpercentage: etf.GazaListPercentage >= 0 ? etf.GazaListPercentage : (etf.gazalistpercentage >= 0 ? etf.gazalistpercentage : null),
    holdings: etf.GazaListHoldings && etf.GazaListHoldings.length > 0 
      ? etf.GazaListHoldings.join(', ') 
      : (etf.holdings || null),
  }));
};

export function useETFSearch(params: SearchParams, enabled: boolean = true) {
  // Check if we have actual search criteria (not just "all" selections)
  const hasRealCriteria = Boolean(
    (params.q && params.q.trim()) || 
    (params.provider && params.provider !== 'all') || 
    (params.exchange && params.exchange !== 'all')
  );

  return useQuery({
    queryKey: ['/api/search', params],
    queryFn: () => fetchETFSearch(params),
    enabled: enabled && hasRealCriteria,
    staleTime: 5 * 60 * 1000, // 5 minutes - search results can be cached briefly
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
    refetchOnWindowFocus: false,
  });
}