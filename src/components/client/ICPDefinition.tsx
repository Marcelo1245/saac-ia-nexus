import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Building, Users } from 'lucide-react';
import { ProspectingFilters } from '@/types/prospecting';
import LocationSection from './icp/LocationSection';
import CompanySection from './icp/CompanySection';
import RoleSection from './icp/RoleSection';
import { toast } from 'sonner';

interface ICPDefinitionProps {
  onSaveConfiguration?: () => void;
  onPreview?: () => void;
  estimatedLeads?: number;
}

const ICPDefinition: React.FC<ICPDefinitionProps> = ({
  onSaveConfiguration,
  onPreview,
  estimatedLeads = 0
}) => {
  const [filters, setFilters] = useState<Partial<ProspectingFilters>>({});
  const [activeTab, setActiveTab] = useState("location");

  const updateFilter = (category: keyof ProspectingFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [category]: value
    }));
  };

  const toggleFilterValue = (category: keyof ProspectingFilters, value: string) => {
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

  const isValueSelected = (category: keyof ProspectingFilters, value: string): boolean => {
    return (filters[category] as string[] || []).includes(value);
  };

  const getAllSelectedFilters = () => {
    const allFilters: Array<{category: string, value: string, displayValue: string}> = [];
    
    // Localização
    if (filters.countries?.length) {
      filters.countries.forEach(country => {
        allFilters.push({category: 'countries', value: country, displayValue: country});
      });
    }
    if (filters.states?.length) {
      filters.states.forEach(state => {
        allFilters.push({category: 'states', value: state, displayValue: state});
      });
    }
    if (filters.cities?.length) {
      filters.cities.forEach(city => {
        allFilters.push({category: 'cities', value: city, displayValue: city});
      });
    }
    
    // Empresa
    if (filters.industries?.length) {
      filters.industries.forEach(industry => {
        allFilters.push({category: 'industries', value: industry, displayValue: industry});
      });
    }
    if (filters.companySizes?.length) {
      filters.companySizes.forEach(size => {
        allFilters.push({category: 'companySizes', value: size, displayValue: `${size} funcionários`});
      });
    }
    
    // Cargo/Função
    if (filters.hierarchyLevels?.length) {
      filters.hierarchyLevels.forEach(level => {
        allFilters.push({category: 'hierarchyLevels', value: level, displayValue: level});
      });
    }
    if (filters.functionalRoles?.length) {
      filters.functionalRoles.forEach(role => {
        allFilters.push({category: 'functionalRoles', value: role, displayValue: role});
      });
    }
    if (filters.departments?.length) {
      filters.departments.forEach(dept => {
        allFilters.push({category: 'departments', value: dept, displayValue: dept});
      });
    }
    
    // Tags customizadas (empresas e cargos)
    if (filters.customTags?.length) {
      filters.customTags.forEach(tag => {
        if (tag.startsWith('company:')) {
          allFilters.push({category: 'customTags', value: tag, displayValue: `Empresa: ${tag.replace('company:', '')}`});
        } else if (tag.startsWith('title:')) {
          allFilters.push({category: 'customTags', value: tag, displayValue: `Cargo: ${tag.replace('title:', '')}`});
        } else {
          allFilters.push({category: 'customTags', value: tag, displayValue: tag});
        }
      });
    }
    
    return allFilters;
  };

  const removeFilter = (category: string, value: string) => {
    if (category === 'customTags') {
      toggleFilterValue('customTags', value);
    } else {
      toggleFilterValue(category as keyof ProspectingFilters, value);
    }
  };

  const handleSendICP = () => {
    const selectedFilters = getAllSelectedFilters();
    if (selectedFilters.length === 0) {
      toast.error("Selecione pelo menos um filtro para definir seu ICP.");
      return;
    }
    onSaveConfiguration?.();
    toast.success("ICP enviado com sucesso!");
  };

  return (
    <div className="space-y-8 pt-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold premium-title mb-4">
          Defina o ICP (Perfil de Cliente Ideal) para segmentação de leads
        </h1>
        <p className="premium-text text-xl">
          Configure os critérios para encontrar seus clientes ideais
        </p>
      </div>

      {/* Filtros Selecionados */}
      {getAllSelectedFilters().length > 0 && (
        <Card className="premium-card rounded-xl border-0 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl premium-title">Filtros Aplicados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {getAllSelectedFilters().map((filter, index) => (
                <Badge 
                  key={index}
                  variant="secondary" 
                  className="px-4 py-2 text-sm flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                >
                  {filter.displayValue}
                  <button
                    onClick={() => removeFilter(filter.category, filter.value)}
                    className="text-white/80 hover:text-white ml-1 text-lg font-medium"
                  >
                    ×
                  </button>
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Seções de Filtros */}
      <Card className="premium-card rounded-xl border-0 shadow-xl">
        <CardContent className="p-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gradient-to-r from-slate-100 to-slate-200 p-1 rounded-lg shadow-inner">
              <TabsTrigger 
                value="location" 
                className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-md rounded-md premium-text font-medium"
              >
                <MapPin className="h-4 w-4" />
                Localização
              </TabsTrigger>
              <TabsTrigger 
                value="company" 
                className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-md rounded-md premium-text font-medium"
              >
                <Building className="h-4 w-4" />
                Empresa
              </TabsTrigger>
              <TabsTrigger 
                value="role" 
                className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-md rounded-md premium-text font-medium"
              >
                <Users className="h-4 w-4" />
                Cargo/Função
              </TabsTrigger>
            </TabsList>

            <TabsContent value="location" className="space-y-6 mt-8">
              <LocationSection 
                filters={filters}
                updateFilter={updateFilter}
                toggleFilterValue={toggleFilterValue}
                isValueSelected={isValueSelected}
              />
            </TabsContent>

            <TabsContent value="company" className="space-y-6 mt-8">
              <CompanySection 
                filters={filters}
                updateFilter={updateFilter}
                toggleFilterValue={toggleFilterValue}
                isValueSelected={isValueSelected}
              />
            </TabsContent>

            <TabsContent value="role" className="space-y-6 mt-8">
              <RoleSection 
                filters={filters}
                updateFilter={updateFilter}
                toggleFilterValue={toggleFilterValue}
                isValueSelected={isValueSelected}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Ações */}
      <div className="flex justify-between items-center pb-16">
        <div className="text-sm premium-text">
          {getAllSelectedFilters().length > 0 && (
            <span className="font-medium">
              {getAllSelectedFilters().length} filtro(s) aplicado(s)
              {estimatedLeads > 0 && ` • ~${estimatedLeads.toLocaleString()} leads estimados`}
            </span>
          )}
        </div>
        
        <div className="flex gap-4">
          <Button 
            variant="outline" 
            onClick={handleSendICP}
            className="px-6 py-2 border-2 border-slate-300 premium-text hover:bg-slate-50 hover:border-slate-400 transition-all duration-200 rounded-lg shadow-sm font-medium"
          >
            Salvar Configuração
          </Button>
          <Button 
            onClick={handleSendICP} 
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 font-medium"
          >
            Enviar ICP
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ICPDefinition;
