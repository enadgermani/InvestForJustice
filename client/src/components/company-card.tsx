import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ExternalLink, Leaf, AlertTriangle, ArrowUpRight } from 'lucide-react';
import { getStockInfo } from '../lib/stock-mappings';

interface Company {
  Name: string;
  Website: string;
  Description: string;
  category: string;
  Alternatives?: string[];
}

interface CompanyCardProps {
  company: Company;
}

export function CompanyCard({ company }: CompanyCardProps) {
  const alternativesCount = company.Alternatives?.length || 0;
  const stockInfo = getStockInfo(company.Name);
  
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Cloud': 'bg-blue-100 text-blue-800',
      'Security': 'bg-red-100 text-red-800',
      'Developer': 'bg-green-100 text-green-800',
      'Commerce': 'bg-yellow-100 text-yellow-800',
      'Finance': 'bg-purple-100 text-purple-800',
      'HR': 'bg-pink-100 text-pink-800',
      'Healthcare': 'bg-indigo-100 text-indigo-800',
      'Marketing': 'bg-orange-100 text-orange-800',
      'Productivity': 'bg-teal-100 text-teal-800',
      'Sales': 'bg-cyan-100 text-cyan-800',
      'Web3': 'bg-violet-100 text-violet-800'
    };
    return colors[category] || 'bg-slate-100 text-slate-800';
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-red-500">
      <CardContent className="p-6">
        {/* Company Header */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold text-slate-900">{company.Name}</h3>
            <button
              onClick={() => window.open(company.Website, '_blank')}
              className="text-slate-500 hover:text-slate-700 transition-colors"
              title="Visit website"
            >
              <ExternalLink className="h-3 w-3" />
            </button>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {company.category && (
              <Badge className={getCategoryColor(company.category)}>
                {company.category}
              </Badge>
            )}
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-red-500 rounded-full" title="Boycott target"></div>
              <span className="text-xs text-red-600 font-medium">BOYCOTT</span>
            </div>
            {stockInfo && (
              <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1.5 rounded-lg shadow-md">
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-1 min-w-0">
                  <span className="text-sm font-bold">📈 {stockInfo.symbol}</span>
                  <span className="text-xs opacity-90 sm:before:content-['('] sm:after:content-[')']">
                    {stockInfo.exchange}
                    {stockInfo.currency && ` · ${stockInfo.currency}`}
                  </span>
                </div>
              </div>
            )}
            {/* Stock loading indicator removed for cleaner UI */}
          </div>
        </div>

        {/* Company Description */}
        {company.Description && company.Description.trim() && (
          <div className="mb-4">
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
              <div className="text-sm text-slate-700">
                <strong>Company description:</strong> {company.Description}
              </div>
            </div>
          </div>
        )}

        {/* Alternatives Section */}
        {alternativesCount > 0 && (
          <div>
            <div className="flex items-center mb-3">
              <Leaf className="h-4 w-4 text-green-600 mr-2" />
              <h4 className="font-medium text-green-800">
                {alternativesCount} Ethical Alternative{alternativesCount > 1 ? 's' : ''}
              </h4>
            </div>
            <div className="space-y-2">
              {company.Alternatives?.map((alternative, index) => (
                <div key={index} className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h5 className="font-medium text-green-900">{alternative}</h5>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Alternatives Warning */}
        {alternativesCount === 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <div className="flex items-center">
              <AlertTriangle className="h-4 w-4 text-yellow-600 mr-2" />
              <span className="text-sm text-yellow-800">
                No alternatives listed yet. Consider contributing to the dataset.
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
