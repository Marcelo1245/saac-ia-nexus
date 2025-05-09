
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
}
