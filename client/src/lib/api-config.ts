// Centralized API configuration for external services
export const API_CONFIG = {
  // ETF Data API - External service for ETF information and analysis
  ETF_BASE_URL: 'https://vps-1126d382.vps.ovh.net',
  //DEV ETF_BASE_URL: 'http://127.0.0.1:8000',
  
  // API endpoints
  ENDPOINTS: {
    WORST_ETFS: '/api/worst_etfs',
    ETF_SEARCH: '/api/search', 
    ETF_HOLDINGS: '/api/etf',
    EXCHANGES: '/api/exchanges',
    FAMILIES: '/api/families',
    ETF_COUNT: '/api/count'
  }
} as const;

// Helper function to build full API URLs
export function buildApiUrl(endpoint: string, params?: Record<string, string | undefined>): string {
  const url = new URL(`${API_CONFIG.ETF_BASE_URL}${endpoint}`);
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        url.searchParams.append(key, value);
      }
    });
  }
  
  return url.toString();
}

// Common fetch wrapper with error handling
export async function apiRequest<T>(url: string): Promise<T> {
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
}