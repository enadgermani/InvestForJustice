import React from 'react';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import { Search, Filter, Building2 } from 'lucide-react';

interface SearchFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  showOnlyPubliclyTraded: boolean;
  setShowOnlyPubliclyTraded: (show: boolean) => void;
  categories: string[];
}

export function SearchFilters({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  showOnlyPubliclyTraded,
  setShowOnlyPubliclyTraded,
  categories
}: SearchFiltersProps) {
  return (
    <div className="bg-white/90 backdrop-blur border border-slate-200 rounded-xl p-6 mb-8 shadow-lg">
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Input
            type="text"
            placeholder="Search companies by name, description, or alternatives..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 pr-4 py-3 text-base border-2 border-slate-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-slate-500 flex-shrink-0" />
            <span className="text-slate-700 text-sm font-medium">Filters:</span>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 flex-1 lg:flex-none lg:w-auto">
            <div className="flex-1 sm:flex-none sm:w-auto lg:w-48">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.sort().map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Button
              variant={showOnlyPubliclyTraded ? "default" : "outline"}
              onClick={() => setShowOnlyPubliclyTraded(!showOnlyPubliclyTraded)}
              className="whitespace-nowrap flex-shrink-0"
              size="default"
            >
              <Building2 className="h-4 w-4 mr-2" />
              Publicly Traded Only
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}