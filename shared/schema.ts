import { z } from "zod";

export const alternativeSchema = z.object({
  Name: z.string(),
  Description: z.string().optional(),
  Website: z.string().url(),
});

export const stockInfoSchema = z.object({
  symbol: z.string(),
  exchange: z.string(),
  currency: z.string().optional(),
}).optional();

export const companySchema = z.object({
  Name: z.string(),
  Description: z.string(),
  Website: z.string().url(),
  Alternatives: z.array(alternativeSchema).optional(),
  category: z.string().optional(),
  stockInfo: stockInfoSchema,
});

export const companiesArraySchema = z.array(companySchema);

export type Alternative = z.infer<typeof alternativeSchema>;
export type Company = z.infer<typeof companySchema>;
export type CompaniesArray = z.infer<typeof companiesArraySchema>;

export const CATEGORIES = [
  'Cloud', 'Commerce', 'Developer', 'Finance', 'HR', 
  'Healthcare', 'Marketing', 'Others', 'Productivity', 
  'Sales', 'Security', 'Web3'
] as const;

export type Category = typeof CATEGORIES[number];
