import { useQuery } from '@tanstack/react-query';
import { fetchAllCompanies } from '../lib/github-api';

export function useCompanies() {
  return useQuery({
    queryKey: ['companies'],
    queryFn: fetchAllCompanies,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 3,
    retryDelay: 1000,
  });
}
