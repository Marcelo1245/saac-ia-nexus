
export type CompanySize = '1-10' | '11-50' | '51-200' | '201-500' | '501+';
export type AnnualRevenue = '<$1M' | '$1M-$10M' | '$10M-$50M' | '>$50M' | '>10%' | '>20%' | '>30%';
export type Industry = 'SaaS' | 'E-commerce' | 'Fintech' | 'Health' | 'Education' | 'Retail' | 'Manufacturing' | 'Professional' | 'Technology' | 'Media' | string;
export type HierarchyLevel = 'C-Level' | 'VP/Diretor' | 'Gerente' | string;
export type FunctionalRole = 'Marketing' | 'Vendas' | 'TI' | 'Operações' | 'Finanças' | 'RH' | 'Produto' | 'Jurídico' | string;

export type RecentActivity = 'Postou conteúdo' | 'Mudou de cargo' | 'Contratou' | 'Promovido' | 'Aniversário de empresa' | string;
export type Interaction = 'Visitou website' | 'Download whitepaper' | 'Assistiu webinar' | 'Participou de evento' | 'Abriu e-mail' | 'Clicou em anúncio' | string;
export type TechStack = 'Salesforce' | 'HubSpot' | 'Zapier' | 'Marketo' | 'Adobe' | 'SAP' | 'Oracle' | 'Zendesk' | 'CRM' | 'ERP' | string;

export interface ProspectingFilters {
  // Dados Demográficos
  industries: Industry[];
  companySizes: CompanySize[];
  annualRevenues: AnnualRevenue[];
  
  // Critérios de Engajamento
  recentActivities: RecentActivity[];
  interactions: Interaction[];
  
  // Tecnologias Usadas (Technographics)
  techStacks: TechStack[];
  
  // Filtros de Contato
  hierarchyLevels: HierarchyLevel[];
  functionalRoles: FunctionalRole[];
}

export interface Campaign {
  id: string;
  name: string;
  description: string;
  status: 'draft' | 'active' | 'paused' | 'completed';
  startDate?: Date;
  endDate?: Date;
  filters: ProspectingFilters;
  leadsTarget: number;
  leadsGenerated: number;
  meetingsBooked: number;
  conversionRate: number;
}

export interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  position: string;
  linkedInUrl?: string;
  industry: Industry;
  companySize: CompanySize;
  status: 'new' | 'contacted' | 'engaged' | 'qualified' | 'converted' | 'lost';
  score: number;
  lastActivity?: Date;
  notes?: string;
  campaignId: string;
}

export interface ContactTimeHeatmapData {
  day: 'segunda' | 'terça' | 'quarta' | 'quinta' | 'sexta' | 'sábado' | 'domingo';
  hour: number;
  value: number;
}

export interface CampaignTemplate {
  id: string;
  name: string;
  description: string;
  targetIndustries: Industry[];
  targetRoles: FunctionalRole[];
  presetFilters: Partial<ProspectingFilters>;
  conversionRate: number;
  recommendedMessages: {
    subject: string;
    body: string;
  }[];
}
