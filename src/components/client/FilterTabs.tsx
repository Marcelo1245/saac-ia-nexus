
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { MapPin, Building, Users, Activity, Filter } from 'lucide-react';

interface FilterTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedFiltersCount: Record<string, number>;
}

const FilterTabs: React.FC<FilterTabsProps> = ({ 
  activeTab, 
  setActiveTab, 
  selectedFiltersCount 
}) => {
  return (
    <TabsList className="grid grid-cols-5 mb-4">
      <TabsTrigger value="location" className="flex items-center gap-1" onClick={() => setActiveTab("location")}>
        <MapPin size={16} />
        <span className="hidden sm:inline">Localização</span>
        {selectedFiltersCount.location > 0 && (
          <Badge variant="secondary" className="ml-1 bg-[#2563EB]/10 text-[#2563EB]">
            {selectedFiltersCount.location}
          </Badge>
        )}
      </TabsTrigger>
      
      <TabsTrigger value="company" className="flex items-center gap-1" onClick={() => setActiveTab("company")}>
        <Building size={16} />
        <span className="hidden sm:inline">Empresa</span>
        {selectedFiltersCount.company > 0 && (
          <Badge variant="secondary" className="ml-1 bg-[#2563EB]/10 text-[#2563EB]">
            {selectedFiltersCount.company}
          </Badge>
        )}
      </TabsTrigger>
      
      <TabsTrigger value="people" className="flex items-center gap-1" onClick={() => setActiveTab("people")}>
        <Users size={16} />
        <span className="hidden sm:inline">Pessoas</span>
        {selectedFiltersCount.people > 0 && (
          <Badge variant="secondary" className="ml-1 bg-[#2563EB]/10 text-[#2563EB]">
            {selectedFiltersCount.people}
          </Badge>
        )}
      </TabsTrigger>
      
      <TabsTrigger value="engagement" className="flex items-center gap-1" onClick={() => setActiveTab("engagement")}>
        <Activity size={16} />
        <span className="hidden sm:inline">Engajamento</span>
        {selectedFiltersCount.engagement > 0 && (
          <Badge variant="secondary" className="ml-1 bg-[#2563EB]/10 text-[#2563EB]">
            {selectedFiltersCount.engagement}
          </Badge>
        )}
      </TabsTrigger>
      
      <TabsTrigger value="custom" className="flex items-center gap-1" onClick={() => setActiveTab("custom")}>
        <Filter size={16} />
        <span className="hidden sm:inline">Personalizado</span>
        {selectedFiltersCount.custom > 0 && (
          <Badge variant="secondary" className="ml-1 bg-[#2563EB]/10 text-[#2563EB]">
            {selectedFiltersCount.custom}
          </Badge>
        )}
      </TabsTrigger>
    </TabsList>
  );
};

export default FilterTabs;
