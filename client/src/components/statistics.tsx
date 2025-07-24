import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { TrendingUp, Building2, Globe, DollarSign } from 'lucide-react';

interface Company {
  Name: string;
  category: string;
  Website: string;
  Description: string;
  Alternatives?: string[];
}

interface StatisticsProps {
  companies: Company[];
  publiclyTradedCount: number;
}

export function Statistics({ companies, publiclyTradedCount }: StatisticsProps) {
  const totalCompanies = companies.length;
  
  // Calculate category distribution
  const categoryCounts = companies.reduce((acc, company) => {
    acc[company.category] = (acc[company.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topCategories = Object.entries(categoryCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  // Calculate alternatives statistics
  const totalAlternatives = companies.reduce((sum, company) => 
    sum + (company.Alternatives?.length || 0), 0
  );

  const stats = [
    {
      icon: Building2,
      label: 'Total Companies',
      value: totalCompanies.toLocaleString(),
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: TrendingUp,
      label: 'Publicly Traded',
      value: publiclyTradedCount.toLocaleString(),
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      icon: Globe,
      label: 'Categories',
      value: Object.keys(categoryCounts).length.toString(),
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      icon: DollarSign,
      label: 'Alternatives',
      value: totalAlternatives.toLocaleString(),
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="bg-white/95 backdrop-blur border-slate-200 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className={`inline-flex items-center justify-center w-12 h-12 ${stat.bgColor} rounded-full mb-4`}>
                <Icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div className="text-2xl font-bold text-slate-900 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-slate-600">
                {stat.label}
              </div>
            </CardContent>
          </Card>
        );
      })}
      
      {/* Top Categories */}
      <Card className="col-span-2 lg:col-span-4 bg-white/95 backdrop-blur border-slate-200 shadow-lg">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Top Categories</h3>
          <div className="flex flex-wrap gap-2">
            {topCategories.map(([category, count]) => (
              <Badge key={category} variant="secondary" className="text-sm">
                {category}: {count} companies
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}