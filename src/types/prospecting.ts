
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
