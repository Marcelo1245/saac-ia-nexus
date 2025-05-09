
export interface ProspectingFilters {
  // Location filters
  countries?: string[];
  states?: string[];
  cities?: string[];
  zipCodes?: string[];
  radius?: number;
  
  // Company filters
  industries?: string[];
  companySizes?: string[];
  revenue?: string[];
  techStacks?: string[];
  growth?: string[];
  
  // People filters
  hierarchyLevels?: string[];
  functionalRoles?: string[];
  departments?: string[];
  
  // Engagement filters
  interactions?: string[];
  recentActivities?: string[];
  interests?: string[];
  
  // Custom filters
  customTags?: string[];
  
  // Additional filters needed based on the errors
  annualRevenues?: string[];
}

// Define the specific types needed by components
export type CompanySize = string;
export type HierarchyLevel = string;
export type FunctionalRole = string;
export type Industry = string;
export type RecentActivity = string;
export type Interaction = string;
export type TechStack = string;
export type AnnualRevenue = string;

// Additional types needed by other components
export interface ContactTimeHeatmapData {
  day: string;
  hour: string;
  value: number;
}

export interface Lead {
  id: string;
  name: string;
  position?: string;
  company?: string;
  email?: string;
  phone?: string;
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'closed';
  score?: number;
  lastContact?: string;
}

export interface CampaignTemplate {
  id: string;
  name: string;
  description?: string;
  filters: Partial<ProspectingFilters>;
  createdAt: string;
}
