
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

  const handleSaveConfiguration = () => {
    const selectedFilters = getAllSelectedFilters();
    if (selectedFilters.length === 0) {
      toast.error("Selecione pelo menos um filtro para definir seu ICP.");
      return;
    }
    onSaveConfiguration?.();
    toast.success("Configuração do ICP salva com sucesso!");
  };

  const handlePreview = () => {
    const selectedFilters = getAllSelectedFilters();
    if (selectedFilters.length === 0) {
      toast.error("Selecione filtros para visualizar os resultados.");
      return;
    }
    onPreview?.();
    toast.success("Gerando pré-visualização dos leads...");
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Defina o ICP (Perfil de Cliente Ideal) para segmentação de leads
        </h1>
        <p className="text-gray-600 text-lg">
          Configure os critérios para encontrar seus clientes ideais
        </p>
      </div>

      {/* Filtros Selecionados */}
      {getAllSelectedFilters().length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Filtros Aplicados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {getAllSelectedFilters().map((filter, index) => (
                <Badge 
                  key={index}
                  variant="secondary" 
                  className="px-3 py-1 text-sm flex items-center gap-2"
                >
                  {filter.displayValue}
                  <button
                    onClick={() => removeFilter(filter.category, filter.value)}
                    className="text-gray-500 hover:text-gray-700 ml-1"
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
      <Card>
        <CardContent className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="location" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Localização
              </TabsTrigger>
              <TabsTrigger value="company" className="flex items-center gap-2">
                <Building className="h-4 w-4" />
                Empresa
              </TabsTrigger>
              <TabsTrigger value="role" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Cargo/Função
              </TabsTrigger>
            </TabsList>

            <TabsContent value="location" className="space-y-6 mt-6">
              <LocationSection 
                filters={filters}
                updateFilter={updateFilter}
                toggleFilterValue={toggleFilterValue}
                isValueSelected={isValueSelected}
              />
            </TabsContent>

            <TabsContent value="company" className="space-y-6 mt-6">
              <CompanySection 
                filters={filters}
                updateFilter={updateFilter}
                toggleFilterValue={toggleFilterValue}
                isValueSelected={isValueSelected}
              />
            </TabsContent>

            <TabsContent value="role" className="space-y-6 mt-6">
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
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600">
          {getAllSelectedFilters().length > 0 && (
            <span>
              {getAllSelectedFilters().length} filtro(s) aplicado(s)
              {estimatedLeads > 0 && ` • ~${estimatedLeads.toLocaleString()} leads estimados`}
            </span>
          )}
        </div>
        
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleSaveConfiguration}>
            Salvar Configuração
          </Button>
          <Button onClick={handlePreview} className="bg-blue-600 hover:bg-blue-700">
            Pré-visualizar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ICPDefinition;
