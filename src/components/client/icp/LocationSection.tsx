
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ProspectingFilters } from '@/types/prospecting';

interface LocationSectionProps {
  filters: Partial<ProspectingFilters>;
  updateFilter: (category: keyof ProspectingFilters, value: any) => void;
  toggleFilterValue: (category: keyof ProspectingFilters, value: string) => void;
  isValueSelected: (category: keyof ProspectingFilters, value: string) => boolean;
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

const LocationSection: React.FC<LocationSectionProps> = ({
  filters,
  updateFilter,
  toggleFilterValue,
  isValueSelected
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

  const handleCountrySelect = (country: string) => {
    setSelectedCountry(country);
    toggleFilterValue('countries', country);
  };

  const handleStateSelect = (state: string) => {
    toggleFilterValue('states', state);
  };

  const handleMetroSelect = (metro: string) => {
    toggleFilterValue('customTags', metro);
  };

  const filteredCities = getCitiesForCountry(selectedCountry).filter(city =>
    city.toLowerCase().includes(citySearch.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <Label className="text-base font-medium">País</Label>
          <p className="text-sm text-gray-600 mb-2">Selecione os países onde deseja encontrar leads</p>
          <Select onValueChange={handleCountrySelect}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione um país..." />
            </SelectTrigger>
            <SelectContent>
              {countries.map(country => (
                <SelectItem key={country} value={country}>
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-base font-medium">Região/Estado</Label>
          <p className="text-sm text-gray-600 mb-2">Estados ou regiões específicas</p>
          {selectedCountry ? (
            <Select onValueChange={handleStateSelect}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um estado..." />
              </SelectTrigger>
              <SelectContent>
                {getStatesForCountry(selectedCountry).map(state => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <div className="p-3 border rounded-md bg-gray-50 text-gray-500 text-sm">
              Selecione um país primeiro
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <Label className="text-base font-medium">Cidade</Label>
          <p className="text-sm text-gray-600 mb-2">Busque cidades específicas</p>
          <Input
            placeholder="Digite o nome da cidade..."
            value={citySearch}
            onChange={(e) => setCitySearch(e.target.value)}
          />
          {selectedCountry && citySearch && (
            <div className="mt-2 max-h-40 overflow-y-auto border rounded-md bg-white">
              {filteredCities.map(city => (
                <div 
                  key={city}
                  className="p-2 hover:bg-gray-100 cursor-pointer text-sm border-b last:border-b-0"
                  onClick={() => {
                    toggleFilterValue('cities', city);
                    setCitySearch("");
                  }}
                >
                  {city}
                </div>
              ))}
              {filteredCities.length === 0 && (
                <div className="p-2 text-sm text-gray-500">
                  Nenhuma cidade encontrada
                </div>
              )}
            </div>
          )}
        </div>

        <div>
          <Label className="text-base font-medium">Área Metropolitana</Label>
          <p className="text-sm text-gray-600 mb-2">Grandes regiões metropolitanas</p>
          <Select onValueChange={handleMetroSelect}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione uma área metropolitana..." />
            </SelectTrigger>
            <SelectContent>
              {metropolitanAreas.map(area => (
                <SelectItem key={area} value={area}>
                  {area}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default LocationSection;
