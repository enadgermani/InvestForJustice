import React, { useState, useEffect } from 'react';
import { ETFInfo } from '../components/etf-info';
import { ArrowLeft, Building2, ArrowUp } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Link } from 'wouter';
import { Footer } from '../components/footer';
import { useETFData } from '../hooks/use-etf-data';
import { useETFCount } from '../hooks/use-etf-count';
import { useExchanges } from '../hooks/use-exchanges';
import { useFamilies } from '../hooks/use-families';

export default function ETFs() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { data: etfData = [], isLoading } = useETFData();
  const { data: etfCount, isLoading: isCountLoading } = useETFCount();
  const { data: exchanges = [], isLoading: isExchangesLoading } = useExchanges();
  const { data: families = [], isLoading: isFamiliesLoading } = useFamilies();

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
                <p className="text-xs sm:text-sm text-slate-600">ETF Database</p>
              </div>
            </Link>
            <div className="flex items-center justify-end">
              <Link href="/companies">
                <Button variant="outline" size="sm" className="text-xs sm:text-sm px-3 py-1.5">
                  <Building2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  <span className="hidden xs:inline">View </span>Companies
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
            <span className="text-slate-700 font-medium">Worst ETFs</span>
            <span className="text-slate-400">/</span>
            <Link href="/companies" className="text-blue-600 hover:text-blue-800">
              Companies
            </Link>
          </div>
        </div>
      </nav>

      {/* ETF Statistics */}
      <section className="py-6 bg-gradient-to-r from-red-50 to-red-100 border-b border-red-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center space-x-8">
            <div className="text-center">
              <div className="text-xl font-bold text-red-700">
                {isCountLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-pulse bg-red-300 h-6 w-8 rounded"></div>
                  </div>
                ) : (
                  etfCount?.toLocaleString() || '36,552'
                )}
              </div>
              <div className="text-xs text-red-600">ETFs</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-red-700">
                {isExchangesLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-pulse bg-red-300 h-6 w-6 rounded"></div>
                  </div>
                ) : (
                  exchanges.length
                )}
              </div>
              <div className="text-xs text-red-600">Exchanges</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-red-700">
                {isFamiliesLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-pulse bg-red-300 h-6 w-8 rounded"></div>
                  </div>
                ) : (
                  families.length
                )}
              </div>
              <div className="text-xs text-red-600">Providers</div>
            </div>
          </div>
        </div>
      </section>

      {/* ETF Content */}
      <ETFInfo />

      {/* Footer */}
      <Footer />

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 bg-red-600 hover:bg-red-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 ease-in-out hover:scale-110"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}