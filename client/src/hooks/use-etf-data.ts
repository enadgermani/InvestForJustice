import { useQuery } from '@tanstack/react-query';
import { buildApiUrl, apiRequest, API_CONFIG } from '../lib/api-config';

export interface ETFData {
  symbol: string;
  name: string | null;
  currency: string | null;
  summary: string | null;
  category_group: string | null;
  category: string | null;
  family: string | null;
  exchange: string | null;
  rank?: number;
  gazalistpercentage?: number | null;
  holdings?: string | null;
}

// Removed fetchETFData - now using fetchETFDataWithCache for localStorage caching

const ETF_CACHE_KEY = 'etf-data-cache';
const ETF_CACHE_META_KEY = 'etf-data-meta';
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes
const CHUNK_SIZE = 1000; // ETFs per chunk to avoid localStorage size limits

// Helper functions for chunked localStorage
const saveToChunkedCache = (data: ETFData[]): boolean => {
  try {
    // Clear old chunks first
    clearChunkedCache();
    
    const chunks = [];
    for (let i = 0; i < data.length; i += CHUNK_SIZE) {
      chunks.push(data.slice(i, i + CHUNK_SIZE));
    }
    
    // Save each chunk
    chunks.forEach((chunk, index) => {
      localStorage.setItem(`${ETF_CACHE_KEY}-${index}`, JSON.stringify(chunk));
    });
    
    // Save metadata
    const metadata = {
      chunkCount: chunks.length,
      totalItems: data.length,
      timestamp: Date.now()
    };
    localStorage.setItem(ETF_CACHE_META_KEY, JSON.stringify(metadata));
    
    console.log(`[ETF Cache] Saved ${data.length} ETFs in ${chunks.length} chunks`);
    return true;
  } catch (e) {
    console.log('[ETF Cache] Failed to save chunked cache:', e);
    clearChunkedCache();
    return false;
  }
};

const loadFromChunkedCache = (): { data: ETFData[], timestamp: number } | null => {
  try {
    const metaData = localStorage.getItem(ETF_CACHE_META_KEY);
    if (!metaData) return null;
    
    const metadata = JSON.parse(metaData);
    const chunks: ETFData[] = [];
    
    // Load all chunks
    for (let i = 0; i < metadata.chunkCount; i++) {
      const chunkData = localStorage.getItem(`${ETF_CACHE_KEY}-${i}`);
      if (!chunkData) return null; // Missing chunk
      chunks.push(...JSON.parse(chunkData));
    }
    
    console.log(`[ETF Cache] Loaded ${chunks.length} ETFs from ${metadata.chunkCount} chunks`);
    return { data: chunks, timestamp: metadata.timestamp };
  } catch (e) {
    console.log('[ETF Cache] Failed to load chunked cache:', e);
    clearChunkedCache();
    return null;
  }
};

const clearChunkedCache = () => {
  try {
    const metaData = localStorage.getItem(ETF_CACHE_META_KEY);
    if (metaData) {
      const metadata = JSON.parse(metaData);
      for (let i = 0; i < metadata.chunkCount; i++) {
        localStorage.removeItem(`${ETF_CACHE_KEY}-${i}`);
      }
    }
    localStorage.removeItem(ETF_CACHE_META_KEY);
    // Also remove old non-chunked cache if exists
    localStorage.removeItem(ETF_CACHE_KEY);
  } catch (e) {
    // Ignore cleanup errors
  }
};

const fetchETFDataWithCache = async (): Promise<ETFData[]> => {
  console.log('[ETF API] Fetching worst ETFs data from API');
  
  const url = buildApiUrl(API_CONFIG.ENDPOINTS.WORST_ETFS);
  const data = await apiRequest<any[]>(url);
  console.log(`[ETF API] Fetched ${data.length} worst ETFs from API`);
  
  // Transform the API response to match our interface
  return data.map((etf: any) => ({
    symbol: etf.symbol || etf.Ticker || '',
    name: etf.name || (etf.EtfName !== 'etf_name' ? etf.EtfName : null),
    currency: etf.currency || null,
    summary: etf.summary || null,
    category_group: etf.category_group || null,
    category: etf.category || null,
    family: etf.family || null,
    exchange: etf.exchange || null,
    rank: etf.rank || null,
    gazalistpercentage: etf.GazaListPercentage >= 0 ? etf.GazaListPercentage : (etf.gazalistpercentage >= 0 ? etf.gazalistpercentage : null),
    holdings: etf.GazaListHoldings && etf.GazaListHoldings.length > 0 ? etf.GazaListHoldings.join(', ') : (etf.holdings || null),
  }));
};

// Add a global flag to prevent multiple simultaneous fetches
let isGloballyLoading = false;
let globalPromise: Promise<ETFData[]> | null = null;

export function useETFData() {
  return useQuery({
    queryKey: ['/api/worst-etfs'],
    queryFn: fetchETFDataWithCache,
    staleTime: 30 * 60 * 1000, // 30 minutes - ETF data doesn't change frequently
    gcTime: 60 * 60 * 1000, // 1 hour - keep in memory cache (v5 uses gcTime instead of cacheTime)
    retry: 3,
    refetchOnWindowFocus: false, // Don't refetch when user returns to tab
    refetchOnReconnect: false, // Don't refetch on network reconnect
  });
}