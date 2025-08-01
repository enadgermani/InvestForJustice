import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ExternalLink, ChevronDown, ChevronUp, Loader2, AlertTriangle, Info } from 'lucide-react';
import { useEtfHoldings } from '../hooks/use-etf-holdings';

interface ETF {
  symbol: string;
  name: string | null;
  currency?: string | null;
  summary?: string | null;
  category_group?: string | null;
  category?: string | null;
  family?: string | null;
  exchange?: string | null;
  gazalistpercentage?: number | null;
  holdings?: string | null;
}

interface ETFHoldingsCardProps {
  etf: ETF;
}

export function ETFHoldingsCard({ etf }: ETFHoldingsCardProps) {
    console.log('ETF received:', etf.holdings); // <-- Add this line

  const [showHoldings, setShowHoldings] = useState(false);
  const [fetchTicker, setFetchTicker] = useState<string | null>(null);
  
  const { data: holdings, isLoading, error } = useEtfHoldings(fetchTicker);

  const handleShowHoldings = () => {
    if (!showHoldings && !fetchTicker) {
      // If holdings are not shown and no ticker is set, fetch the holdings for the current ETF
      console.log('Fetching holdings for ticker:', etf.symbol);
      setFetchTicker(etf.symbol);
      console.log('ShowHolding for '+ etf.symbol +' to:', showHoldings);
    }
    // Toggle the visibility of holdings
    console.log('Toggling holdings visibility:', !showHoldings);

    setShowHoldings(!showHoldings);
  };
  
  const formatSummary = (summary?: string | null) => {
  if (!summary) return null;
  return summary.replace(/\n/g, '<br>');
};

  const formatPercentage = (percentage: number) => {
    if (percentage === 0) return '0%';
    return `${percentage.toFixed(2)}%`;
  };

  const getPercentageColor = (percentage: number) => {
    if (percentage === 0) return 'text-green-600';
    if (percentage < 5) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Card className="bg-white/95 backdrop-blur border-slate-200 shadow-xl h-full flex flex-col">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl font-bold text-slate-900 mb-2 line-clamp-2 min-h-[56px]">
              {etf.name || etf.symbol}
            </CardTitle>
            <div className="flex items-center space-x-3 flex-wrap gap-2">
              <Badge variant="secondary" className="bg-slate-100 text-slate-800 font-mono">
                {etf.symbol}
              </Badge>
              <Badge variant="outline" className="text-blue-700 border-blue-300">
                {etf.category || 'Category N/A'}
              </Badge>
              <Badge variant="outline" className="text-green-700 border-green-300">
                {etf.currency || 'Currency N/A'}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6 flex-1 flex flex-col">
        {/* Key Stats - Fixed height section */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-slate-50 rounded-lg p-3">
            <div className="text-sm text-slate-600 mb-1">Provider</div>
            <div className="font-semibold text-slate-900 text-sm">{etf.family || 'Not available'}</div>
          </div>
          <div className="bg-slate-50 rounded-lg p-3">
            <div className="text-sm text-slate-600 mb-1">Exchange</div>
            <div className="font-semibold text-slate-900 text-sm">{etf.exchange || 'Not available'}</div>
          </div>
          <div className="bg-slate-50 rounded-lg p-3">
            <div className="text-sm text-slate-600 mb-1">Category</div>
            <div className="font-semibold text-slate-900 text-sm">{etf.category_group || 'Not available'}</div>
          </div>
        </div>

      {/* Summary/Description - Fixed minimum height */}
<div className="bg-slate-50 rounded-lg p-4 flex-1 min-h-[120px]">
  <h4 className="text-sm font-semibold text-slate-700 mb-2">Major Repsonsability</h4>
  {etf.summary ? (
    <div
      className="text-slate-600 text-sm leading-relaxed space-y-2"
      dangerouslySetInnerHTML={{ __html: etf.summary }}
    />
  ) : (
    <p className="text-slate-500 text-sm italic">
      Summary not available - will be provided when API is updated
    </p>
  )}
</div>


        {/* Ethical Analysis Section */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <h4 className="text-sm font-semibold text-red-800">Ethical Investment Analysis</h4>
            </div>
            {/* Show snippet data with percentage if available */}
            {etf.gazalistpercentage !== null && etf.gazalistpercentage !== undefined && (
              <Badge 
                variant="outline" 
                className={`text-xs ${getPercentageColor(etf.gazalistpercentage)} border-current`}
              >
                {formatPercentage(etf.gazalistpercentage)}
              </Badge>
            )}
          </div>
          
          
          {/* Mobile-friendly button layout */}
          <div className="space-y-2">
            <p className="text-xs text-red-700 text-center">
              {etf.gazalistpercentage !== null ? 'View detailed analysis below' : 'Click to analyze holdings'}
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={handleShowHoldings}
              className="w-full flex items-center justify-center space-x-2 border-red-300 hover:bg-red-100 text-xs"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin text-red-600" />
              ) : showHoldings ? (
                <ChevronUp className="h-4 w-4 text-red-600" />
              ) : (
                <ChevronDown className="h-4 w-4 text-red-600" />
              )}
              <span className="text-red-700 sm:text-xs">
                {isLoading ? 'Loading...' : showHoldings ? 'Hide Details' : 'Show Detailed Analysis'}
              </span>
            </Button>
          </div>
          
          {/* Holdings Analysis Results - Appears directly below the button */}
          {showHoldings && (
            <div className="mt-4 pt-4 border-t border-red-300">
            {error ? (
              <div className="flex items-center space-x-2 text-red-600 text-sm">
                <AlertTriangle className="h-4 w-4" />
                <span>Unable to load holdings analysis</span>
              </div>
            ) : holdings ? (
              <div className="space-y-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Info className="h-4 w-4 text-red-600" />
                  <h4 className="font-semibold text-red-800 text-sm">Holdings Analysis Results</h4>
                </div>

                {/* Complete Holdings Data */}
                <div className="space-y-3">
                  {/* Palestinian-Related Holdings */}
                  <div className="bg-white rounded-lg p-3 border border-red-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-red-800">
                        Palestinian-Related Holdings
                      </span>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${getPercentageColor(holdings.GazaListPercentage)} border-current`}
                      >
                        {formatPercentage(holdings.GazaListPercentage)}
                      </Badge>
                    </div>
                    
                    {holdings.GazaListHoldings && holdings.GazaListHoldings.length > 0 ? (
                      <div className="space-y-1 max-h-40 overflow-y-auto">
                        {holdings.GazaListHoldings.map((holding, index) => (
                          <div key={index} className="text-xs text-red-700 bg-red-50 rounded px-2 py-1">
                            {holding}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-xs text-green-700 bg-green-50 rounded px-2 py-1">
                        ✓ No Palestinian-related holdings detected
                      </div>
                    )}
                  </div>

                 {/* Fossil Fuels Holdings */}
           {/*           <div className="bg-white rounded-lg p-3 border border-red-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-red-800">
                            Fossil Fuels Holdings
                          </span>
                          <Badge
                            variant="outline"
                            className={`text-xs ${getPercentageColor(holdings.FossilFuelsPercentage)} border-current`}
                          >
                            {formatPercentage(holdings.FossilFuelsPercentage)}
                          </Badge>
                        </div>

                        {holdings.FossilFuelsHoldings && holdings.FossilFuelsHoldings.length > 0 ? (
                          <div className="space-y-1 max-h-40 overflow-y-auto">
                            {holdings.FossilFuelsHoldings.map((holding, index) => (
                              <div key={index} className="text-xs text-red-700 bg-red-50 rounded px-2 py-1">
                                {holding}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-xs text-green-700 bg-green-50 rounded px-2 py-1">
                            ✓ No fossil fuels holdings detected
                          </div>
                        )}
                      </div>
           */ }
            {/* Weapons Holdings */}
            { /*     <div className="bg-white rounded-lg p-3 border border-red-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-red-800">
                        Weapons Holdings
                      </span>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${getPercentageColor(holdings.WeaponsPercentage)} border-current`}
                      >
                        {formatPercentage(holdings.WeaponsPercentage)}
                      </Badge>
                    </div>
                    
                    {holdings.WeaponsHoldings && holdings.WeaponsHoldings.length > 0 ? (
                      <div className="space-y-1 max-h-40 overflow-y-auto">
                        {holdings.WeaponsHoldings.map((holding, index) => (
                          <div key={index} className="text-xs text-red-700 bg-red-50 rounded px-2 py-1">
                            {holding}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-xs text-green-700 bg-green-50 rounded px-2 py-1">
                        ✓ No weapons holdings detected
                      </div>
                    )}
                  </div>

            */}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="h-6 w-6 animate-spin text-red-600" />
              </div>
            )}
            </div>
          )}
        </div>

        {/* Yahoo Finance Link */}
        <div className="pt-4 border-t border-slate-200 mt-auto">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
            onClick={() => window.open(`https://finance.yahoo.com/quote/${etf.symbol}`, '_blank')}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            View on Yahoo Finance
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}