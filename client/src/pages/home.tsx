import React, { useEffect } from 'react';
import { useCompanies } from '../hooks/use-companies';
import { useETFCount } from '../hooks/use-etf-count';
import { useExchanges } from '../hooks/use-exchanges';
import { useFamilies } from '../hooks/use-families';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Loader2, AlertCircle, PieChart, Building2, Heart } from 'lucide-react';
import { Link } from 'wouter';
import { Footer } from '../components/footer';

export default function Home() {
  const { data: companies = [], isLoading, error } = useCompanies();
  const { data: etfCount } = useETFCount();
  const { data: exchanges = [] } = useExchanges();
  const { data: families = [] } = useFamilies();

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
            <p className="text-lg text-slate-600">Loading database...</p>
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
              <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Data</h3>
              <p className="text-red-600 mb-4">Unable to fetch data. Please try again later.</p>
              <Button onClick={() => window.location.reload()}>
                Try Again
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
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">✊</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">InvestForJustice</h1>
                <p className="text-sm text-slate-600">Ethical Investment Database</p>
              </div>
            </Link>
            <Badge variant="secondary" className="bg-red-100 text-red-800">
              {etfCount?.toLocaleString() || '36K+'} ETFs • {companies.length} Companies • {families.length} Providers
            </Badge>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-50 to-green-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-full h-48 bg-gradient-to-r from-red-200 to-green-200 rounded-xl shadow-lg mb-8 flex items-center justify-center">
            <div className="text-6xl">🕊️</div>
          </div>
          <h2 className="text-5xl font-bold text-slate-900 mb-6">
            Make Informed Ethical Choices
          </h2>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto mb-8">
            Comprehensive database of Israeli tech companies and ETF holdings. 
            Track {companies.length} companies across {etfCount?.toLocaleString() || '36,000+'} global ETFs from {families.length} providers on {exchanges.length} exchanges to make investment decisions that align with your values.
          </p>
          
          {/* Hero Statistics - Mobile Responsive */}
          <div className="mb-12">
            {/* Desktop Layout */}
            <div className="hidden md:flex justify-center items-center space-x-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600">
                  {etfCount?.toLocaleString() || '36K+'}
                </div>
                <div className="text-sm font-medium text-slate-600 uppercase tracking-wider">ETFs Tracked</div>
              </div>
              <div className="w-px h-16 bg-slate-300"></div>
              <div className="text-center">
                <div className="text-4xl font-bold text-red-600">
                  {companies.length}
                </div>
                <div className="text-sm font-medium text-slate-600 uppercase tracking-wider">Companies</div>
              </div>
              <div className="w-px h-16 bg-slate-300"></div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600">
                  {exchanges.length || 8}
                </div>
                <div className="text-sm font-medium text-slate-600 uppercase tracking-wider">Exchanges</div>
              </div>
              <div className="w-px h-16 bg-slate-300"></div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600">
                  {families.length || 400}
                </div>
                <div className="text-sm font-medium text-slate-600 uppercase tracking-wider">Providers</div>
              </div>
            </div>
            
            {/* Mobile Layout */}
            <div className="md:hidden grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-blue-600">
                  {etfCount?.toLocaleString() || '36K+'}
                </div>
                <div className="text-xs sm:text-sm font-medium text-slate-600 uppercase tracking-wider">ETFs</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-red-600">
                  {companies.length}
                </div>
                <div className="text-xs sm:text-sm font-medium text-slate-600 uppercase tracking-wider">Companies</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-green-600">
                  {exchanges.length || 8}
                </div>
                <div className="text-xs sm:text-sm font-medium text-slate-600 uppercase tracking-wider">Exchanges</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-purple-600">
                  {families.length || 400}
                </div>
                <div className="text-xs sm:text-sm font-medium text-slate-600 uppercase tracking-wider">Providers</div>
              </div>
            </div>
          </div>
          
          {/* Community Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-3xl mx-auto mb-12">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">i</span>
                </div>
              </div>
              <div className="text-sm text-blue-800">
                <p className="font-semibold mb-1">Community-Driven Initiative</p>
                <p>
                  This database is maintained by the community. If you notice missing companies, incorrect data, 
                  or have suggestions for additional ETFs, please contact us at{' '}
                  <a 
                    href="mailto:contact@investforjustice.com" 
                    className="text-blue-600 hover:text-blue-800 font-medium underline"
                  >
                    contact@investforjustice.com
                  </a>
                </p>
              </div>
            </div>
          </div>
          
          {/* Main Navigation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* ETFs Section */}
            <Card className="bg-white/90 backdrop-blur border-slate-200 shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-8 text-center h-full flex flex-col">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <PieChart className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Worst ETFs</h3>
                <p className="text-slate-600 mb-6 flex-grow">
                  Avoid {etfCount?.toLocaleString() || '36,000+'} worst-performing ETFs from an ethical perspective - 
                  those with highest exposure to companies in occupied territories.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-center space-x-2">
                    <Badge variant="outline" className="text-xs">Global Exchanges</Badge>
                    <Badge variant="outline" className="text-xs">Holdings Data</Badge>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Badge variant="outline" className="text-xs">Provider Info</Badge>
                    <Badge variant="outline" className="text-xs">Focus Areas</Badge>
                  </div>
                </div>
                <Link href="/etfs">
                  <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    <PieChart className="h-5 w-5 mr-2" />
                    Browse ETFs
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Companies Section */}
            <Card className="bg-white/90 backdrop-blur border-slate-200 shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-8 text-center h-full flex flex-col">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Building2 className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Company Database</h3>
                <p className="text-slate-600 mb-6 flex-grow">
                  Browse {companies.length} Israeli tech companies with detailed information, 
                  boycott rationale, and ethical alternatives.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-center space-x-2">
                    <Badge variant="outline" className="text-xs">Stock Information</Badge>
                    <Badge variant="outline" className="text-xs">Alternatives</Badge>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Badge variant="outline" className="text-xs">Category Filters</Badge>
                    <Badge variant="outline" className="text-xs">Search</Badge>
                  </div>
                </div>
                <Link href="/companies">
                  <Button size="lg" className="w-full bg-red-600 hover:bg-red-700 text-white">
                    <Building2 className="h-5 w-5 mr-2" />
                    Browse Companies
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Comprehensive Investment Intelligence</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Make informed decisions with our extensive database covering global markets and ethical alternatives
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <PieChart className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">ETF Tracking</h3>
              <p className="text-slate-600">Monitor holdings across 8 international exchanges including NASDAQ, NYSE, LSE</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Building2 className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Company Profiles</h3>
              <p className="text-slate-600">Detailed information including boycott rationale, stock data, and ethical alternatives</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Heart className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Community Driven</h3>
              <p className="text-slate-600">Maintained by the community with regular updates and data verification</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}