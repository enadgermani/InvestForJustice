import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { AlertTriangle, PieChart, Search, Filter, Loader2 } from 'lucide-react';
import { useETFData } from '../hooks/use-etf-data';
import { useETFSearch } from '../hooks/use-etf-search';
import { useExchanges } from '../hooks/use-exchanges';
import { useFamilies } from '../hooks/use-families';
import { ETFHoldingsCard } from './etf-holdings-card';

export function ETFInfo() {
  const [etfSearchTerm, setEtfSearchTerm] = useState('');
  const [selectedExchange, setSelectedExchange] = useState('all');
  const [selectedFamily, setSelectedFamily] = useState('all');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  
  // Default ETF data (worst_etfs endpoint)
  const { data: defaultETFData = [], isLoading: isDefaultLoading, error: defaultError } = useETFData();
  
  // Search API data (only when search criteria exist - not just "all" selections)
  const hasSearchCriteria = Boolean(
    (debouncedSearchTerm && debouncedSearchTerm.trim()) || 
    selectedExchange !== 'all' || 
    selectedFamily !== 'all'
  );
  const { 
    data: searchETFData = [], 
    isLoading: isSearchLoading, 
    error: searchError 
  } = useETFSearch({
    q: debouncedSearchTerm,
    provider: selectedFamily !== 'all' ? selectedFamily : undefined,
    exchange: selectedExchange !== 'all' ? selectedExchange : undefined
  }, hasSearchCriteria);
  
  const { data: exchangesData = [], isLoading: isExchangesLoading } = useExchanges();
  const { data: familiesData = [], isLoading: isFamiliesLoading } = useFamilies();

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(etfSearchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [etfSearchTerm]);

  // Get exchanges and families from API data
  const exchanges = exchangesData.map(item => item.name).sort();
  const families = familiesData.sort();

  // Use search results if search criteria exist, otherwise use default data
  const etfData = hasSearchCriteria ? searchETFData : defaultETFData;
  const isLoading = hasSearchCriteria ? isSearchLoading : isDefaultLoading;
  const error = hasSearchCriteria ? searchError : defaultError;

  // Show page immediately with loading state instead of blocking navigation

  if (error) {
    return (
      <section className="py-16 bg-gradient-to-br from-slate-900 via-red-900 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AlertTriangle className="h-12 w-12 text-red-400 mx-auto mb-4" />
          <h3 className="text-white text-lg mb-2">Failed to load ETF data</h3>
          <p className="text-red-200">Please try again later</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-slate-900 via-red-900 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600 rounded-full mb-6">
            <PieChart className="h-8 w-8 text-white" />
          </div>
          <div className="flex items-center justify-center space-x-3 mb-4">
            <h2 className="text-3xl font-bold text-white">
              Worst ETFs for Ethical Investing
            </h2>
            {isLoading && <Loader2 className="h-6 w-6 animate-spin text-red-300" />}
          </div>
          <p className="text-xl text-red-100 max-w-3xl mx-auto mb-6">
            These are the worst-performing ETFs from an ethical investment perspective, with significant exposure to companies 
            involved in activities contributing to human rights violations in occupied territories.
          </p>
          
          {/* ETF Search and Filters */}
          <div className="max-w-4xl mx-auto">
            {/* Search Bar - Full width on mobile */}
            <div className="w-full mb-4">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search ETFs by ticker, name, or provider..."
                  value={etfSearchTerm}
                  onChange={(e) => setEtfSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 text-base sm:text-lg border-2 border-white/20 focus:border-white focus:ring-white rounded-xl bg-white/10 backdrop-blur text-white placeholder:text-white/70"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70 h-5 w-5" />
              </div>
            </div>
            
            {/* Filters - Re-enabled for API consistency */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center justify-center">
              <div className="flex items-center gap-2 justify-center">
                <Filter className="h-5 w-5 text-white/70 flex-shrink-0" />
                <span className="text-white/70 text-sm font-medium">Filters:</span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <Select value={selectedExchange} onValueChange={setSelectedExchange} disabled={isExchangesLoading}>
                  <SelectTrigger className="w-full sm:w-48 border-2 border-white/20 focus:border-white focus:ring-white rounded-xl bg-white/10 backdrop-blur text-white">
                    <SelectValue placeholder={isExchangesLoading ? "Loading..." : "All Exchanges"} />
                  </SelectTrigger>
                  <SelectContent className="z-50">
                    <SelectItem value="all">All Exchanges</SelectItem>
                    {exchanges.map(exchange => (
                      <SelectItem key={exchange} value={exchange}>
                        {exchange}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={selectedFamily} onValueChange={setSelectedFamily} disabled={isFamiliesLoading}>
                  <SelectTrigger className="w-full sm:w-48 border-2 border-white/20 focus:border-white focus:ring-white rounded-xl bg-white/10 backdrop-blur text-white">
                    <SelectValue placeholder={isFamiliesLoading ? "Loading..." : "All Providers"} />
                  </SelectTrigger>
                  <SelectContent className="z-50">
                    <SelectItem value="all">All Providers</SelectItem>
                    {families.map(family => (
                      <SelectItem key={family} value={family}>
                        {family}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Note about current data */}
            <div className="text-center">
              <p className="text-white/70 text-sm">
                Showing worst ETFs ranked by Palestinian-related holdings percentage
                {selectedExchange === 'all' && selectedFamily === 'all' ? '' : ' (Filters ready for API update)'}
              </p>
            </div>
            
            {/* Results count with loading indicator */}
            <div className="mt-4 text-center">
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin text-white/70" />
                  <p className="text-white/70 text-sm">Loading ETF database...</p>
                </div>
              ) : (
                <p className="text-white/70 text-sm">
                  Showing {etfData.length} ETFs
                  {selectedExchange !== 'all' && ` on ${selectedExchange}`}
                  {selectedFamily !== 'all' && ` from ${selectedFamily}`}
                  {hasSearchCriteria && ` (Search results)`}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Warning Banner */}
        <div className="bg-red-600 border border-red-500 rounded-xl p-6 mb-8">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-6 w-6 text-white mt-1 flex-shrink-0" />
            <div className="text-white">
              <h3 className="font-semibold mb-2">Ethical Investment Warning</h3>
              <p className="text-red-100">
                These ETFs have been identified as having the highest exposure to companies supporting activities 
                in occupied territories. Avoid these funds if you want your investments to align with human rights principles. 
                Consider ESG-focused alternatives instead.
              </p>
              {isLoading && (
                <div className="mt-3 flex items-center space-x-2 text-red-200 text-sm">
                  <Loader2 className="h-3 w-3 animate-spin" />
                  <span>Loading {etfData.length > 0 ? `${etfData.length}+` : ''} ETFs from database...</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ETF Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {isLoading ? (
            // Loading skeleton cards
            Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="bg-white/95 backdrop-blur border-slate-200 shadow-xl">
                <CardHeader className="pb-4">
                  <div className="animate-pulse">
                    <div className="h-6 bg-slate-200 rounded mb-2"></div>
                    <div className="flex space-x-2">
                      <div className="h-5 w-16 bg-slate-200 rounded"></div>
                      <div className="h-5 w-20 bg-slate-200 rounded"></div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 rounded-lg p-3 animate-pulse">
                      <div className="h-3 bg-slate-200 rounded mb-2"></div>
                      <div className="h-4 bg-slate-200 rounded"></div>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-3 animate-pulse">
                      <div className="h-3 bg-slate-200 rounded mb-2"></div>
                      <div className="h-4 bg-slate-200 rounded"></div>
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4 animate-pulse">
                    <div className="h-3 bg-slate-200 rounded mb-2"></div>
                    <div className="h-3 bg-slate-200 rounded mb-1"></div>
                    <div className="h-3 bg-slate-200 rounded w-3/4"></div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : error ? (
            <div className="col-span-full text-center py-12">
              <AlertTriangle className="h-12 w-12 text-red-400 mx-auto mb-4" />
              <h3 className="text-white text-lg mb-2">Failed to load ETF data</h3>
              <p className="text-red-200">Please try again later</p>
            </div>
          ) : (
            etfData.map((etf) => (
              <ETFHoldingsCard key={etf.symbol} etf={etf} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}