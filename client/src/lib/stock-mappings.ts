// Stock information mappings - moved from backend to make this a static site
export interface StockInfo {
  symbol: string;
  exchange: string;
  currency?: string;
}

// Manual mappings for verified publicly traded companies ONLY
export const stockMappings: Record<string, StockInfo> = {
  // Big Tech companies
  'Microsoft': { symbol: 'MSFT', exchange: 'NASDAQ', currency: 'USD' },
  'Apple': { symbol: 'AAPL', exchange: 'NASDAQ', currency: 'USD' },
  'Intel': { symbol: 'INTC', exchange: 'NASDAQ', currency: 'USD' },
  'Nvidia': { symbol: 'NVDA', exchange: 'NASDAQ', currency: 'USD' },
  'Dell': { symbol: 'DELL', exchange: 'NYSE', currency: 'USD' },
  'AMD': { symbol: 'AMD', exchange: 'NASDAQ', currency: 'USD' },
  
  // Israeli companies on US exchanges (NASDAQ/NYSE)
  'Wix': { symbol: 'WIX', exchange: 'NASDAQ', currency: 'USD' },
  'Check Point': { symbol: 'CHKP', exchange: 'NASDAQ', currency: 'USD' },
  'CheckPoint': { symbol: 'CHKP', exchange: 'NASDAQ', currency: 'USD' },
  'CyberArk': { symbol: 'CYBR', exchange: 'NASDAQ', currency: 'USD' },
  'Cellebrite': { symbol: 'CLBT', exchange: 'NASDAQ', currency: 'USD' },
  'Amdocs': { symbol: 'DOX', exchange: 'NASDAQ', currency: 'USD' },
  'Nice': { symbol: 'NICE', exchange: 'NASDAQ', currency: 'USD' },
  'Nice Systems': { symbol: 'NICE', exchange: 'NASDAQ', currency: 'USD' },
  'SolarEdge': { symbol: 'SEDG', exchange: 'NASDAQ', currency: 'USD' },
  'Mobileye': { symbol: 'MBLY', exchange: 'NASDAQ', currency: 'USD' },
  'Fiverr': { symbol: 'FVRR', exchange: 'NYSE', currency: 'USD' },
  'Monday.com': { symbol: 'MNDY', exchange: 'NASDAQ', currency: 'USD' },
  'IronSource': { symbol: 'IS', exchange: 'NYSE', currency: 'USD' },
  'Payoneer': { symbol: 'PAYO', exchange: 'NASDAQ', currency: 'USD' },
  'Riskified': { symbol: 'RSKD', exchange: 'NYSE', currency: 'USD' },
  'Similarweb': { symbol: 'SMWB', exchange: 'NYSE', currency: 'USD' },
  'Tufin': { symbol: 'TUFN', exchange: 'NYSE', currency: 'USD' },
  'JFrog': { symbol: 'FROG', exchange: 'NASDAQ', currency: 'USD' },
  'SentinelOne': { symbol: 'S', exchange: 'NYSE', currency: 'USD' },
  'Elbit Systems': { symbol: 'ESLT', exchange: 'NASDAQ', currency: 'USD' },
  'Teva Pharmaceutical': { symbol: 'TEVA', exchange: 'NYSE', currency: 'USD' },
  'ICL Group': { symbol: 'ICL', exchange: 'NYSE', currency: 'USD' },
  
  // Israeli companies on London Stock Exchange (LSE)
  'Playtech': { symbol: 'PTEC.L', exchange: 'LSE', currency: 'GBP' },
  'Plus500': { symbol: 'PLUS.L', exchange: 'LSE', currency: 'GBP' },
  'MTI Wireless Edge': { symbol: 'MWE.L', exchange: 'LSE', currency: 'GBP' },
  'Windward': { symbol: 'WNWD.L', exchange: 'LSE', currency: 'GBP' },
  'Evoke': { symbol: 'EVOK.L', exchange: 'LSE', currency: 'GBP' },
  'XLMedia': { symbol: 'XLM.L', exchange: 'LSE', currency: 'GBP' },
  
  // Israeli companies on Tel Aviv Stock Exchange (TASE)
  'Elbit Systems (TASE)': { symbol: 'ESLT.TA', exchange: 'TASE', currency: 'ILS' },
  'ICL Group (TASE)': { symbol: 'ICL.TA', exchange: 'TASE', currency: 'ILS' },
  'Bank Hapoalim': { symbol: 'POLI.TA', exchange: 'TASE', currency: 'ILS' },
  'Bank Leumi': { symbol: 'LUMI.TA', exchange: 'TASE', currency: 'ILS' },
  'Teva (TASE)': { symbol: 'TEVA.TA', exchange: 'TASE', currency: 'ILS' },
  'Check Point (TASE)': { symbol: 'CHKP.TA', exchange: 'TASE', currency: 'ILS' },
  'Nice (TASE)': { symbol: 'NICE.TA', exchange: 'TASE', currency: 'ILS' },
  
  // Israeli companies on European exchanges
  'Playtech (Frankfurt)': { symbol: 'PYT.F', exchange: 'XETRA', currency: 'EUR' },
  'Plus500 (Frankfurt)': { symbol: 'PL5.F', exchange: 'XETRA', currency: 'EUR' },
  
  // Israeli companies on Toronto Stock Exchange (TSX)
  'Teva (TSX)': { symbol: 'TEVA.TO', exchange: 'TSX', currency: 'CAD' },
  
  // Israeli companies on Australian Securities Exchange (ASX)
  'Elbit Systems (ASX)': { symbol: 'ELB.AX', exchange: 'ASX', currency: 'AUD' },
};

// Companies that are NOT publicly traded (to prevent false matches)
export const notPubliclyTraded = new Set([
  'Anima', 'Apiiro', 'Blink Ops', 'Komodor', 'Tabnine', 'Snyk', 'Wiz',
  'Lightico', 'Lusha', 'Gong', 'Walkme', 'Verbit', 'TimeOS', 'Rupert',
  'Powtoon', 'Kryon Systems', 'Honeybook', 'Groove', 'Connecteam',
  'Bizzabo', 'Substrata', 'Intail.ai', 'Graphiti', 'Dany', 'Aligned',
  'Walnut', 'Sweep', 'Demoleap', 'Dealhub', 'Talon', 'Stellar Cyber',
  'Silverfort', 'Sentra', 'Salt Security', 'SafeBreach', 'Panoray',
  'Noname Security', 'Dig Security', 'Descope', 'Cybereason', 'Claroty',
  'AXONIUS', 'Argus Cyber Security', 'Aqua Security', 'Sablier', 'Rivery'
]);

// Function to get stock info for a company
export function getStockInfo(companyName: string): StockInfo | null {
  const cleanName = companyName.trim();
  
  // Check if company is explicitly NOT publicly traded
  if (notPubliclyTraded.has(cleanName)) {
    return null;
  }
  
  // Check manual mappings
  if (stockMappings[cleanName]) {
    return stockMappings[cleanName];
  }
  
  return null;
}

// Get all companies with stock info for filtering
export function getCompaniesWithStockInfo(): Set<string> {
  return new Set(Object.keys(stockMappings));
}