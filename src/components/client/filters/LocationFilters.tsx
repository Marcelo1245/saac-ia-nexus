
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { ProspectingFilters } from '@/types/prospecting';
import FilterGroup from '../FilterGroup';
import FilterChips from '../FilterChips';

interface LocationFiltersProps {
  filters: Partial<ProspectingFilters>;
  isValueSelected: (category: keyof ProspectingFilters, value: string) => boolean;
  toggleFilterValue: (category: keyof ProspectingFilters, value: string) => void;
  updateFilter: (category: keyof ProspectingFilters, value: any) => void;
}

const LocationFilters: React.FC<LocationFiltersProps> = ({ 
  filters, 
  isValueSelected, 
  toggleFilterValue,
  updateFilter
}) => {
  return (
    <>
      <FilterGroup 
        title="País" 
        helpText="Selecione os países onde deseja encontrar leads."
      >
        <div className="grid grid-cols-2 gap-2">
          {["Brasil", "Estados Unidos", "Portugal", "Argentina", "Chile", "Colômbia"].map(country => (
            <div key={country} className="flex items-center space-x-2">
              <Checkbox 
                id={`country-${country}`} 
                checked={isValueSelected('countries', country)}
                onCheckedChange={() => toggleFilterValue('countries', country)}
              />
              <Label htmlFor={`country-${country}`} className="text-sm">{country}</Label>
            </div>
          ))}
        </div>
        <FilterChips 
          category="countries" 
          filters={filters}
          toggleFilterValue={toggleFilterValue}
        />
      </FilterGroup>
      
      <FilterGroup 
        title="Estado" 
        helpText="Filtre leads por estados específicos."
      >
        <div className="grid grid-cols-3 gap-2">
          {["São Paulo", "Rio de Janeiro", "Minas Gerais", "Paraná", "Santa Catarina", "Rio Grande do Sul"].map(state => (
            <div key={state} className="flex items-center space-x-2">
              <Checkbox 
                id={`state-${state}`} 
                checked={isValueSelected('states', state)}
                onCheckedChange={() => toggleFilterValue('states', state)}
              />
              <Label htmlFor={`state-${state}`} className="text-sm">{state}</Label>
            </div>
          ))}
        </div>
        <FilterChips 
          category="states" 
          filters={filters}
          toggleFilterValue={toggleFilterValue}
        />
      </FilterGroup>
      
      <FilterGroup 
        title="Raio de Distância" 
        description="Defina um raio de distância em torno de um CEP específico"
        helpText="Isso permite encontrar leads geograficamente próximos a um ponto central."
      >
        <div className="space-y-4">
          <div>
            <Label htmlFor="zipCode" className="text-sm">CEP Central</Label>
            <Input 
              id="zipCode" 
              placeholder="Ex: 01310-100" 
              className="mt-1"
            />
          </div>
          
          <div>
            <div className="flex justify-between">
              <Label className="text-sm">Raio (Km): {filters.radius || 0}</Label>
            </div>
            <Slider
              defaultValue={[filters.radius as number || 0]}
              max={100}
              step={5}
              className="mt-1"
              onValueChange={(value) => updateFilter('radius', value[0])}
            />
          </div>
        </div>
      </FilterGroup>
    </>
  );
};

export default LocationFilters;
