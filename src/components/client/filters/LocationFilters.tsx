
import React, { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProspectingFilters } from '@/types/prospecting';
import FilterGroup from '../FilterGroup';
import FilterChips from '../FilterChips';

interface LocationFiltersProps {
  filters: Partial<ProspectingFilters>;
  isValueSelected: (category: keyof ProspectingFilters, value: string) => boolean;
  toggleFilterValue: (category: keyof ProspectingFilters, value: string) => void;
  updateFilter: (category: keyof ProspectingFilters, value: any) => void;
}

const countries = [
  "Brasil", "Estados Unidos", "Canadá", "Reino Unido", "Alemanha", "França", 
  "Espanha", "Itália", "Portugal", "Argentina", "Chile", "Colômbia", "México",
  "Peru", "Uruguai", "Holanda", "Bélgica", "Suíça", "Áustria", "Austrália", "Japão"
];

const brazilStates = [
  "Acre", "Alagoas", "Amapá", "Amazonas", "Bahia", "Ceará", "Distrito Federal",
  "Espírito Santo", "Goiás", "Maranhão", "Mato Grosso", "Mato Grosso do Sul",
  "Minas Gerais", "Pará", "Paraíba", "Paraná", "Pernambuco", "Piauí",
  "Rio de Janeiro", "Rio Grande do Norte", "Rio Grande do Sul", "Rondônia",
  "Roraima", "Santa Catarina", "São Paulo", "Sergipe", "Tocantins"
];

const usStates = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
  "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana",
  "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts",
  "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska",
  "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina",
  "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island",
  "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont",
  "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
];

const brazilMajorCities = [
  "São Paulo", "Rio de Janeiro", "Belo Horizonte", "Brasília", "Salvador", "Fortaleza",
  "Manaus", "Curitiba", "Recife", "Porto Alegre", "Belém", "Goiânia", "Guarulhos",
  "Campinas", "São Luís", "São Gonçalo", "Maceió", "Duque de Caxias", "Natal", "Teresina"
];

const usMajorCities = [
  "New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia",
  "San Antonio", "San Diego", "Dallas", "San Jose", "Austin", "Jacksonville",
  "Fort Worth", "Columbus", "Charlotte", "San Francisco", "Indianapolis", "Seattle",
  "Denver", "Washington", "Boston", "Detroit", "Nashville", "Memphis", "Portland"
];

const metropolitanAreas = [
  "Grande São Paulo", "Grande Rio de Janeiro", "Grande Belo Horizonte", "Grande Brasília",
  "Grande Salvador", "Grande Fortaleza", "Grande Recife", "Grande Porto Alegre",
  "Grande Curitiba", "Região do ABC Paulista", "New York Metropolitan Area", 
  "Los Angeles Metro", "Chicago Metro", "San Francisco Bay Area", "Washington Metro",
  "Greater London", "Greater Paris", "Greater Toronto Area"
];

const LocationFilters: React.FC<LocationFiltersProps> = ({ 
  filters, 
  isValueSelected, 
  toggleFilterValue,
  updateFilter
}) => {
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [citySearch, setCitySearch] = useState<string>("");
  
  const getStatesForCountry = (country: string) => {
    switch (country) {
      case "Brasil":
        return brazilStates;
      case "Estados Unidos":
        return usStates;
      default:
        return [];
    }
  };

  const getCitiesForCountry = (country: string) => {
    switch (country) {
      case "Brasil":
        return brazilMajorCities;
      case "Estados Unidos":
        return usMajorCities;
      default:
        return [];
    }
  };

  const filteredCities = getCitiesForCountry(selectedCountry).filter(city =>
    city.toLowerCase().includes(citySearch.toLowerCase())
  );

  return (
    <>
      <FilterGroup 
        title="País" 
        helpText="Selecione os países onde deseja encontrar leads. Esta seleção afetará as opções de região e cidade disponíveis."
      >
        <div className="grid grid-cols-2 gap-2">
          {countries.map(country => (
            <div key={country} className="flex items-center space-x-2">
              <Checkbox 
                id={`country-${country}`} 
                checked={isValueSelected('countries', country)}
                onCheckedChange={() => {
                  toggleFilterValue('countries', country);
                  if (!isValueSelected('countries', country)) {
                    setSelectedCountry(country);
                  }
                }}
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
        title="Região/Estado" 
        helpText="Filtre leads por estados ou regiões específicas. As opções variam conforme o país selecionado."
      >
        {selectedCountry && (
          <div className="grid grid-cols-3 gap-2">
            {getStatesForCountry(selectedCountry).map(state => (
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
        )}
        {!selectedCountry && (
          <p className="text-sm text-gray-500">Selecione um país primeiro para ver as regiões disponíveis</p>
        )}
        <FilterChips 
          category="states" 
          filters={filters}
          toggleFilterValue={toggleFilterValue}
        />
      </FilterGroup>

      <FilterGroup 
        title="Cidade" 
        helpText="Busque e selecione cidades específicas. Digite para filtrar as opções disponíveis."
      >
        <div className="space-y-3">
          <Input
            placeholder="Digite o nome da cidade..."
            value={citySearch}
            onChange={(e) => setCitySearch(e.target.value)}
            className="mb-2"
          />
          
          {selectedCountry && (
            <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
              {filteredCities.map(city => (
                <div key={city} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`city-${city}`} 
                    checked={isValueSelected('cities', city)}
                    onCheckedChange={() => toggleFilterValue('cities', city)}
                  />
                  <Label htmlFor={`city-${city}`} className="text-sm">{city}</Label>
                </div>
              ))}
            </div>
          )}
          
          {!selectedCountry && (
            <p className="text-sm text-gray-500">Selecione um país primeiro para ver as cidades disponíveis</p>
          )}
        </div>
        <FilterChips 
          category="cities" 
          filters={filters}
          toggleFilterValue={toggleFilterValue}
        />
      </FilterGroup>

      <FilterGroup 
        title="Área Metropolitana" 
        helpText="Selecione áreas metropolitanas específicas para uma segmentação mais ampla."
      >
        <div className="grid grid-cols-2 gap-2">
          {metropolitanAreas.map(area => (
            <div key={area} className="flex items-center space-x-2">
              <Checkbox 
                id={`metro-${area}`} 
                checked={filters.customTags?.includes(area) || false}
                onCheckedChange={() => toggleFilterValue('customTags', area)}
              />
              <Label htmlFor={`metro-${area}`} className="text-sm">{area}</Label>
            </div>
          ))}
        </div>
      </FilterGroup>
    </>
  );
};

export default LocationFilters;
