// GitHub API integration for fetching company data
export interface Company {
  Name: string;
  Website: string;
  Description: string;
  category: string;
  Alternatives?: string[];
}

const GITHUB_RAW_BASE = 'https://raw.githubusercontent.com/TechForPalestine/boycott-israeli-tech-companies-dataset/main';



export async function fetchAllCompanies(): Promise<Company[]> {
  try {
    // These categories match exactly with the GitHub repository file names
    const categories = [
      'Cloud', 'Commerce', 'Developer', 'Finance', 'HR', 
      'Healthcare', 'Marketing', 'Others', 'Productivity', 
      'Sales', 'Security', 'Web3'
    ];

    const companyPromises = categories.map(category => 
      fetchCategoryCompanies(category)
    );

    const categoryResults = await Promise.all(companyPromises);
    const allCompanies = categoryResults.flat();
    
    if (allCompanies.length === 0) {
      throw new Error('No company data available from GitHub repository');
    }
    
    // Remove duplicates by company name (keep first occurrence)
    const uniqueCompanies = allCompanies.filter((company, index, array) => 
      array.findIndex(c => c.Name === company.Name) === index
    );
    
    console.log(`Loaded ${allCompanies.length} total companies, ${uniqueCompanies.length} unique companies after deduplication`);
    
    return uniqueCompanies;
  } catch (error) {
    console.error('Error fetching companies from GitHub:', error);
    throw error;
  }
}

async function fetchCategoryCompanies(category: string): Promise<Company[]> {
  try {
    // Use category name as-is since we're now passing the correct capitalized names
    const response = await fetch(`${GITHUB_RAW_BASE}/dataset/companies/${category}.yaml`);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${category} companies (HTTP ${response.status})`);
    }
    
    const yamlText = await response.text();
    // Use js-yaml library which is already included in index.html
    const companies = parseYamlData(yamlText, category);
    return companies;
  } catch (error) {
    console.error(`Error fetching ${category} companies:`, error);
    return [];
  }
}

function parseYamlData(yamlText: string, category: string): Company[] {
  try {
    // Use js-yaml library which is already loaded via CDN in index.html
    const yamlData = (window as any).jsyaml.load(yamlText);
    const companies: Company[] = [];
    
    if (Array.isArray(yamlData)) {
      for (const item of yamlData) {
        if (item && typeof item === 'object') {
          const company: Company = {
            Name: item.Name || '',
            Website: item.Website || '',
            Description: item.Description || '',
            category: category,
            Alternatives: Array.isArray(item.Alternatives) 
              ? item.Alternatives.map((alt: any) => {
                  if (typeof alt === 'string') return alt;
                  if (alt && typeof alt === 'object' && alt.Name) return alt.Name;
                  return '';
                }).filter(Boolean)
              : []
          };
          
          if (company.Name) {
            companies.push(company);
          }
        }
      }
    }
    
    return companies;
  } catch (error) {
    console.error(`Error parsing YAML for ${category}:`, error);
    return [];
  }
}