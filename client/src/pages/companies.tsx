import React, { useState, useMemo, useEffect } from 'react';
import { useCompanies } from '../hooks/use-companies';
import { CompanyCard } from '../components/company-card';
import { SearchFilters } from '../components/search-filters';
import { Statistics } from '../components/statistics';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Loader2, AlertCircle, ArrowUp, Building2, PieChart, Search } from 'lucide-react';
import { Link } from 'wouter';
import { Footer } from '../components/footer';
import { getCompaniesWithStockInfo } from '../lib/stock-mappings';

interface Company {
  Name: string;
  Website: string;
  Description: string;
  category: string;
  Alternatives?: string[];
}

// Companies that have verified stock information
const companiesWithStockInfo = getCompaniesWithStockInfo();

export default function Companies() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showOnlyPubliclyTraded, setShowOnlyPubliclyTraded] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const { data: companies = [], isLoading, error } = useCompanies();

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredCompanies = useMemo(() => {
    let filtered = companies;

    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(company => company.category === selectedCategory);
    }

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(company => {
        // Search in company name only (exact partial match)
        const nameMatch = company.Name.toLowerCase().includes(term);
        
        // Search in description only if it's a substantial match (not just fragments)
        const descriptionMatch = company.Description.toLowerCase().includes(term);
        
        // Don't search in alternatives to avoid confusion - alternatives are suggestions, not company names
        
        return nameMatch || descriptionMatch;
      });
    }

    // Apply publicly traded filter
    if (showOnlyPubliclyTraded) {
      filtered = filtered.filter(company => 
        companiesWithStockInfo.has(company.Name)
      );
    }

    // Sort companies alphabetically by name
    return filtered.sort((a, b) => a.Name.localeCompare(b.Name));
  }, [companies, searchTerm, selectedCategory, showOnlyPubliclyTraded]);

  const scrollToContent = () => {
    const element = document.getElementById('company-search');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
            <p className="text-lg text-slate-600">Loading company database...</p>
            <p className="text-sm text-slate-500 mt-2">Fetching data from GitHub repository</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="flex items-center justify-center min-h-screen">
          <Card className="max-w-md mx-4">
            <CardContent className="p-6 text-center">
              <AlertCircle className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-red-800 mb-2">Unable to Load Company Data</h3>
              <p className="text-red-600 mb-4">
                Failed to fetch company information from the GitHub repository. Please check your internet connection and try again.
              </p>
              <Button 
                onClick={() => window.location.reload()} 
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Retry Loading
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-4 sm:py-0 sm:h-16 space-y-3 sm:space-y-0">
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-red-600 to-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm sm:text-base">✊</span>
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-slate-900">InvestForJustice</h1>
                <p className="text-xs sm:text-sm text-slate-600">Company Database</p>
              </div>
            </Link>
            <div className="flex items-center justify-end">
              <Link href="/etfs">
                <Button variant="outline" size="sm" className="text-xs sm:text-sm px-3 py-1.5">
                  <PieChart className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  <span className="hidden xs:inline">View </span>ETFs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Breadcrumb */}
      <nav className="bg-slate-100 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 py-3 text-sm">
            <Link href="/etfs" className="text-blue-600 hover:text-blue-800">
              ETFs
            </Link>
            <span className="text-slate-400">/</span>
            <span className="text-slate-700 font-medium">Companies</span>
          </div>
        </div>
      </nav>

      {/* Compact Statistics */}
      <section className="py-6 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center space-x-8">
            <div className="text-center">
              <div className="text-xl font-bold text-red-600">{companies.length}</div>
              <div className="text-xs text-slate-600">Companies</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-blue-600">8</div>
              <div className="text-xs text-slate-600">Exchanges</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-green-600">12</div>
              <div className="text-xs text-slate-600">Categories</div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div id="company-search">
            <SearchFilters
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              showOnlyPubliclyTraded={showOnlyPubliclyTraded}
              setShowOnlyPubliclyTraded={setShowOnlyPubliclyTraded}
              categories={Array.from(new Set(companies.map(c => c.category)))}
            />
          </div>
        </div>
      </section>

      {/* Technology Choice Warning */}
      <section className="bg-red-50 border-l-4 border-red-500 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm">!</span>
            </div>
            <div>
              <h4 className="font-semibold text-red-800 mb-1">Technology Choice Impact</h4>
              <p className="text-red-700 text-sm">
                Using products from these companies may indirectly support activities contributing to human rights violations. 
                Choose alternatives that align with your values.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Grid */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-slate-600 text-lg">
              {filteredCompanies.length} companies found
              {selectedCategory !== 'all' && ` in ${selectedCategory}`}
              {showOnlyPubliclyTraded && ' (publicly traded only)'}
            </p>
          </div>
          
          {filteredCompanies.length === 0 ? (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900 mb-2">No companies found</h3>
              <p className="text-slate-500">Try adjusting your search terms or filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredCompanies.map((company) => (
                <CompanyCard 
                  key={company.Name} 
                  company={company}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Scroll to top button */}
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 rounded-full w-12 h-12 shadow-lg bg-blue-600 hover:bg-blue-700"
          size="sm"
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
}