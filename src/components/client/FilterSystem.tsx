
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Search, Download } from 'lucide-react';
import { ProspectingFilters as ProspectingFiltersType } from '@/types/prospecting';
import FilterGroup from './FilterGroup';
import FilterChips from './FilterChips';
import FilterTabs from './FilterTabs';
import LocationFilters from './filters/LocationFilters';
import CompanyFilters from './filters/CompanyFilters';
import PeopleFilters from './filters/PeopleFilters';
import EngagementFilters from './filters/EngagementFilters';
import CustomFilters from './filters/CustomFilters';

export interface FilterSystemProps {
  onFiltersChange: (filters: Partial<ProspectingFiltersType>) => void;
  onCampaignNameChange: (name: string) => void;
  initialFilters?: Partial<ProspectingFiltersType>;
  initialCampaignName?: string;
  onSaveFilters?: () => void;
  onExportFilters?: () => void;
  onPreviewClick?: () => void;
  estimatedLeads?: number;
  isMobile?: boolean;
}

const FilterSystem: React.FC<FilterSystemProps> = ({
  onFiltersChange,
  onCampaignNameChange,
  initialFilters = {},
  initialCampaignName = '',
  onSaveFilters,
  onExportFilters,
  onPreviewClick,
  estimatedLeads = 0,
  isMobile = false
}) => {
  const [activeTab, setActiveTab] = useState("location");
  const [filters, setFilters] = useState<Partial<ProspectingFiltersType>>(initialFilters);
  const [campaignName, setCampaignName] = useState<string>(initialCampaignName);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFiltersCount, setSelectedFiltersCount] = useState<Record<string, number>>({
    location: 0,
    company: 0,
    people: 0,
    engagement: 0,
    custom: 0
  });

  // Update parent component when filters change
  useEffect(() => {
    onFiltersChange(filters);
    
    // Count filters per category
    const locationCount = (filters.countries?.length || 0) + 
                          (filters.states?.length || 0) + 
                          (filters.zipCodes?.length || 0) + 
                          (filters.radius ? 1 : 0);
    
    const companyCount = (filters.industries?.length || 0) + 
                         (filters.companySizes?.length || 0) + 
                         (filters.revenue?.length || 0) + 
                         (filters.techStacks?.length || 0);
    
    const peopleCount = (filters.hierarchyLevels?.length || 0) + 
                        (filters.functionalRoles?.length || 0) + 
                        (filters.departments?.length || 0);
    
    const engagementCount = (filters.interactions?.length || 0) + 
                            (filters.recentActivities?.length || 0);
    
    const customCount = (filters.customTags?.length || 0);
    
    setSelectedFiltersCount({
      location: locationCount,
      company: companyCount,
      people: peopleCount,
      engagement: engagementCount,
      custom: customCount
    });
  }, [filters, onFiltersChange]);

  // Handle campaign name change
  useEffect(() => {
    onCampaignNameChange(campaignName);
  }, [campaignName, onCampaignNameChange]);

  // Update filter function
  const updateFilter = (category: keyof ProspectingFiltersType, value: any) => {
    setFilters(prev => ({
      ...prev,
      [category]: value
    }));
  };

  // Toggle filter value in array
  const toggleFilterValue = (category: keyof ProspectingFiltersType, value: string) => {
    setFilters(prev => {
      const currentValues = prev[category] as string[] || [];
      const valueExists = currentValues.includes(value);
      
      const newValues = valueExists
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      
      return {
        ...prev,
        [category]: newValues
      };
    });
  };

  // Check if value is selected in filter
  const isValueSelected = (category: keyof ProspectingFiltersType, value: string): boolean => {
    return (filters[category] as string[] || []).includes(value);
  };

  // Mobile view: accordion style
  if (isMobile) {
    return (
      <div className="space-y-4">
        <div className="mb-4">
          <Label htmlFor="campaignName">Nome da Campanha</Label>
          <Input
            id="campaignName"
            value={campaignName}
            onChange={(e) => setCampaignName(e.target.value)}
            placeholder="Ex: Prospecção Q2 2024"
            className="mt-1"
          />
        </div>
        
        <div className="relative mb-4">
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar filtros..."
            className="pl-10"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
        </div>
        
        {/* Mobile accordion view would go here - simplified for now */}
        <Accordion type="single" collapsible>
          {/* Content would go here */}
        </Accordion>
        
        <div className="mt-6 flex justify-between">
          <Button variant="outline" className="gap-2" onClick={onExportFilters}>
            <Download size={16} />
            Exportar Filtros
          </Button>
          
          <Button className="gap-2 bg-[#2563EB]" onClick={onPreviewClick}>
            Pré-visualizar ({estimatedLeads})
          </Button>
        </div>
      </div>
    );
  }

  // Desktop view: tabs style
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
        <div className="w-full sm:w-2/3">
          <Label htmlFor="campaignName">Nome da Campanha</Label>
          <Input
            id="campaignName"
            value={campaignName}
            onChange={(e) => setCampaignName(e.target.value)}
            placeholder="Ex: Prospecção Q2 2024"
            className="mt-1"
          />
        </div>
        
        <div className="w-full sm:w-1/3 relative">
          <Label htmlFor="searchFilters">Buscar filtros</Label>
          <div className="relative mt-1">
            <Input
              id="searchFilters"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar..."
              className="pl-10"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="location" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <FilterTabs 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          selectedFiltersCount={selectedFiltersCount}
        />
        
        <TabsContent value="location" className="space-y-4 p-1">
          <LocationFilters 
            filters={filters} 
            isValueSelected={isValueSelected} 
            toggleFilterValue={toggleFilterValue} 
            updateFilter={updateFilter}
          />
        </TabsContent>
        
        <TabsContent value="company" className="space-y-4 p-1">
          <CompanyFilters 
            filters={filters} 
            isValueSelected={isValueSelected} 
            toggleFilterValue={toggleFilterValue}
          />
        </TabsContent>
        
        <TabsContent value="people" className="space-y-4 p-1">
          <PeopleFilters 
            filters={filters} 
            isValueSelected={isValueSelected} 
            toggleFilterValue={toggleFilterValue}
          />
        </TabsContent>
        
        <TabsContent value="engagement" className="space-y-4 p-1">
          <EngagementFilters 
            filters={filters} 
            isValueSelected={isValueSelected} 
            toggleFilterValue={toggleFilterValue}
          />
        </TabsContent>
        
        <TabsContent value="custom" className="space-y-4 p-1">
          <CustomFilters 
            filters={filters} 
            isValueSelected={isValueSelected} 
            toggleFilterValue={toggleFilterValue}
          />
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-between">
        {onSaveFilters && (
          <Button variant="outline" className="gap-2" onClick={onSaveFilters}>
            Salvar Configuração
          </Button>
        )}
        
        {onExportFilters && (
          <Button variant="outline" className="gap-2" onClick={onExportFilters}>
            <Download size={16} />
            Exportar Filtros
          </Button>
        )}
        
        {onPreviewClick && (
          <Button className="gap-2 bg-[#2563EB]" onClick={onPreviewClick}>
            Pré-visualizar ({estimatedLeads})
          </Button>
        )}
      </div>
    </div>
  );
};

export default FilterSystem;
