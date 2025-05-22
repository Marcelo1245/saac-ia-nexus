
export interface ProspectingFilters {
  // Localização
  countries?: string[];
  states?: string[];
  cities?: string[];
  zipCodes?: string[];
  radius?: number;
  
  // Empresa
  industries?: string[];
  companySizes?: string[];
  revenue?: string[];
  techStacks?: string[];
  
  // Pessoas
  hierarchyLevels?: string[];
  functionalRoles?: string[];
  departments?: string[];
  jobTenure?: string[];
  education?: string[];
  
  // Engajamento
  interactions?: string[];
  recentActivities?: string[];
  
  // Personalizado
  customTags?: string[];
  
  // Meta dados
  campaignName?: string;
  dateRange?: {
    from: Date;
    to: Date;
  };
  
  // Added back for compatibility with existing components
  annualRevenues?: string[];
}

export interface ProspectingCampaign {
  id: string;
  name: string;
  filters: ProspectingFilters;
  createdAt: Date;
  updatedAt: Date;
  status: 'draft' | 'active' | 'paused' | 'completed';
  results?: {
    total: number;
    contacted: number;
    responded: number;
    converted: number;
  };
}

export interface ProspectLead {
  id: string;
  name: string;
  title: string;
  company: string;
  email: string;
  phone?: string;
  linkedIn?: string;
  location: string;
  status: 'new' | 'contacted' | 'responded' | 'qualified' | 'converted' | 'lost';
  score?: number;
  lastActivity?: Date;
  campaignId: string;
}

// Define type aliases needed by components
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
  firstName?: string;
  lastName?: string;
  position?: string;
  company?: string;
  email?: string;
  phone?: string;
  status: 'new' | 'contacted' | 'engaged' | 'qualified' | 'proposal' | 'negotiation' | 'converted' | 'closed' | 'lost';
  score?: number;
  lastContact?: string;
  industry?: string;
  companySize?: string;
  notes?: string;
  lastActivity?: Date;
  linkedInUrl?: string;
  campaignId?: string;
}

export interface CampaignTemplate {
  id: string;
  name: string;
  description?: string;
  filters: Partial<ProspectingFilters>;
  createdAt: string;
  presetFilters?: Partial<ProspectingFilters>;
  targetIndustries?: string[];
  targetRoles?: string[];
  conversionRate?: number;
  recommendedMessages?: Array<{ subject: string; body: string }>;
}
