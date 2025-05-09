
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
  
  // Added field that was missing
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
  hour: string;  // Changed from number to string to match usage
  value: number;
}

export interface Lead {
  id: string;
  name: string;
  firstName?: string;  // Added missing properties used in KanbanBoard
  lastName?: string;   // Added missing properties used in KanbanBoard
  position?: string;
  company?: string;
  email?: string;
  phone?: string;
  status: 'new' | 'contacted' | 'engaged' | 'qualified' | 'proposal' | 'negotiation' | 'converted' | 'closed' | 'lost';  // Added 'engaged', 'converted', 'lost'
  score?: number;
  lastContact?: string;
  industry?: string;   // Added missing property used in KanbanBoard
  companySize?: string; // Added missing property used in KanbanBoard
  notes?: string;       // Added missing property used in KanbanBoard
  lastActivity?: Date;  // Added missing property used in KanbanBoard
  linkedInUrl?: string;
  campaignId?: string;
}

export interface CampaignTemplate {
  id: string;
  name: string;
  description?: string;
  filters: Partial<ProspectingFilters>;
  createdAt: string;
  presetFilters?: Partial<ProspectingFilters>; // Added missing property used in CampaignSetup
  targetIndustries?: string[];  // Added missing property used in CampaignSetup
  targetRoles?: string[];       // Added missing property
  conversionRate?: number;      // Added missing property
  recommendedMessages?: Array<{ subject: string; body: string }>;  // Added missing property
}
