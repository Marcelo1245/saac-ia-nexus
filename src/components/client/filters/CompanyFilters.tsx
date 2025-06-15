import React, { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ProspectingFilters } from '@/types/prospecting';
import FilterGroup from '../FilterGroup';
import FilterChips from '../FilterChips';

interface CompanyFiltersProps {
  filters: Partial<ProspectingFilters>;
  isValueSelected: (category: keyof ProspectingFilters, value: string) => boolean;
  toggleFilterValue: (category: keyof ProspectingFilters, value: string) => void;
}

const companySizes = [
  { id: "1-10", label: "1-10 funcionários (Startup/Micro)" },
  { id: "11-50", label: "11-50 funcionários (Pequena)" },
  { id: "51-200", label: "51-200 funcionários (Média)" },
  { id: "201-500", label: "201-500 funcionários (Média-Grande)" },
  { id: "501-1000", label: "501-1.000 funcionários (Grande)" },
  { id: "1001-5000", label: "1.001-5.000 funcionários (Muito Grande)" },
  { id: "5001-10000", label: "5.001-10.000 funcionários (Corporação)" },
  { id: "10001+", label: "10.001+ funcionários (Multinacional)" }
];

const industries = [
  "Tecnologia da Informação e Serviços",
  "Serviços Financeiros",
  "Saúde e Bem-Estar",
  "Educação",
  "Varejo e E-commerce",
  "Manufatura",
  "Imobiliário",
  "Consultoria",
  "Marketing e Publicidade",
  "Telecomunicações",
  "Energia e Serviços Públicos",
  "Transporte e Logística",
  "Mídia e Entretenimento",
  "Automotivo",
  "Agricultura",
  "Construção",
  "Alimentação e Bebidas",
  "Farmacêutico",
  "Recursos Humanos",
  "Jurídico",
  "Governo",
  "ONGs e Organizações Sem Fins Lucrativos",
  "Turismo e Hospitalidade",
  "Seguros",
  "Mineração",
  "Petróleo e Gás",
  "Química",
  "Têxtil e Vestuário",
  "Papel e Produtos Florestais",
  "Equipamentos Industriais"
];

const majorCompanies = [
  // Tech Companies
  "Microsoft", "Google", "Amazon", "Apple", "Meta", "Netflix", "Spotify", "Salesforce",
  "IBM", "Oracle", "SAP", "Adobe", "Uber", "Airbnb", "Twitter", "LinkedIn",
  
  // Brazilian Companies
  "Vale", "Petrobras", "Itaú Unibanco", "Banco do Brasil", "Bradesco", "Magazine Luiza",
  "Ambev", "JBS", "WEG", "Embraer", "Natura", "Localiza", "B3", "StoneCo",
  "Nubank", "iFood", "Mercado Livre", "Movile", "Stone", "PagSeguro",
  
  // Financial Services
  "JPMorgan Chase", "Bank of America", "Wells Fargo", "Goldman Sachs", "Morgan Stanley",
  "Citigroup", "American Express", "Visa", "Mastercard", "PayPal",
  
  // Other Major Corps
  "Johnson & Johnson", "Procter & Gamble", "Coca-Cola", "PepsiCo", "Nestlé",
  "Unilever", "Nike", "Adidas", "McDonald's", "Starbucks", "Walmart", "Target"
];

const CompanyFilters: React.FC<CompanyFiltersProps> = ({ 
  filters, 
  isValueSelected, 
  toggleFilterValue 
}) => {
  const [companySearch, setCompanySearch] = useState<string>("");
  
  const filteredCompanies = majorCompanies.filter(company =>
    company.toLowerCase().includes(companySearch.toLowerCase())
  );

  const handleCompanySelect = (company: string) => {
    toggleFilterValue('customTags', `company:${company}`);
    setCompanySearch("");
  };

  return (
    <>
      <FilterGroup 
        title="Nome da Empresa" 
        helpText="Digite o nome de empresas específicas que deseja incluir na segmentação."
      >
        <div className="space-y-3">
          <Input
            placeholder="Digite o nome da empresa..."
            value={companySearch}
            onChange={(e) => setCompanySearch(e.target.value)}
          />
          
          {companySearch && (
            <div className="max-h-40 overflow-y-auto border rounded-md">
              {filteredCompanies.slice(0, 10).map(company => (
                <div 
                  key={company}
                  className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                  onClick={() => handleCompanySelect(company)}
                >
                  {company}
                </div>
              ))}
              {filteredCompanies.length === 0 && (
                <div className="p-2 text-sm text-gray-500">
                  Empresa não encontrada. Digite para adicionar "{companySearch}"
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="mt-3">
          <Label className="text-sm font-medium">Empresas Selecionadas:</Label>
          <div className="flex flex-wrap gap-1 mt-2">
            {(filters.customTags || [])
              .filter(tag => tag.startsWith('company:'))
              .map(tag => (
                <span 
                  key={tag} 
                  className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs flex items-center gap-1"
                >
                  {tag.replace('company:', '')}
                  <button 
                    onClick={() => toggleFilterValue('customTags', tag)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              ))}
          </div>
        </div>
      </FilterGroup>
      
      <FilterGroup 
        title="Tamanho da Empresa" 
        helpText="Selecione as faixas de funcionários das empresas que deseja incluir."
      >
        <div className="space-y-2">
          {companySizes.map(size => (
            <div key={size.id} className="flex items-center space-x-2">
              <Checkbox 
                id={`size-${size.id}`} 
                checked={isValueSelected('companySizes', size.id)}
                onCheckedChange={() => toggleFilterValue('companySizes', size.id)}
              />
              <Label htmlFor={`size-${size.id}`} className="text-sm">{size.label}</Label>
            </div>
          ))}
        </div>
        <FilterChips 
          category="companySizes" 
          filters={filters}
          toggleFilterValue={toggleFilterValue}
        />
      </FilterGroup>
      
      <FilterGroup 
        title="Setor/Indústria" 
        helpText="Selecione os setores de atuação das empresas-alvo."
      >
        <div className="grid grid-cols-1 gap-2 max-h-60 overflow-y-auto">
          {industries.map(industry => (
            <div key={industry} className="flex items-center space-x-2">
              <Checkbox 
                id={`industry-${industry}`} 
                checked={isValueSelected('industries', industry)}
                onCheckedChange={() => toggleFilterValue('industries', industry)}
              />
              <Label htmlFor={`industry-${industry}`} className="text-sm">{industry}</Label>
            </div>
          ))}
        </div>
        <FilterChips 
          category="industries" 
          filters={filters}
          toggleFilterValue={toggleFilterValue}
        />
      </FilterGroup>
    </>
  );
};

export default CompanyFilters;
