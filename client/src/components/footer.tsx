import React from 'react';
import { Github, Heart, Building2, PieChart } from 'lucide-react';
import { Link } from 'wouter';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="flex items-center space-x-3 mb-4 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">✊</span>
              </div>
              <h3 className="text-lg font-bold">InvestForJustice</h3>
            </Link>
            <p className="text-slate-300 text-sm">
              Empowering ethical investment decisions through transparency and comprehensive data on Israeli tech companies and ETF holdings.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <Link href="/companies" className="hover:text-white flex items-center">
                  <Building2 className="h-4 w-4 mr-2" />
                  Company Database
                </Link>
              </li>
              <li>
                <Link href="/etfs" className="hover:text-white flex items-center">
                  <PieChart className="h-4 w-4 mr-2" />
                  ETF Database
                </Link>
              </li>
              <li>
                <a href="https://github.com/TechForPalestine/boycott-israeli-tech-companies-dataset" 
                   className="hover:text-white flex items-center">
                  <Github className="h-4 w-4 mr-2" />
                  Dataset Repository
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Get Involved</h4>
            <p className="text-slate-300 text-sm mb-4">
              Help improve our database by reporting incorrect information, suggesting ETF additions, or contributing company data corrections.
            </p>
            <div className="space-y-3">
              <a 
                href="https://github.com/TechForPalestine/boycott-israeli-tech-companies-dataset" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors w-full justify-center"
              >
                <Github className="h-4 w-4 mr-2" />
                Contribute to Dataset
              </a>
              <a 
                href="mailto:contact@investforjustice.com" 
                className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors w-full justify-center"
              >
                <Heart className="h-4 w-4 mr-2" />
                Contact Us
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-700 mt-8 pt-8 text-center">
          <p className="text-slate-400 text-sm">
            © 2025 InvestForJustice. Data sourced from community contributions. 
            Contact us at contact@investforjustice.com for data corrections or ETF additions.
          </p>
        </div>
      </div>
    </footer>
  );
}