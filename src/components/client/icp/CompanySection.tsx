import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ProspectingFilters } from '@/types/prospecting';

interface CompanySectionProps {
  filters: Partial<ProspectingFilters>;
  updateFilter: (category: keyof ProspectingFilters, value: any) => void;
  toggleFilterValue: (category: keyof ProspectingFilters, value: string) => void;
  isValueSelected: (category: keyof ProspectingFilters, value: string) => boolean;
}

const companySizes = [
  { id: "1-10", label: "1-10 funcionários" },
  { id: "11-50", label: "11-50 funcionários" },
  { id: "51-200", label: "51-200 funcionários" },
  { id: "201-500", label: "201-500 funcionários" },
  { id: "501-1000", label: "501-1.000 funcionários" },
  { id: "1001+", label: "1.001+ funcionários" }
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

const CompanySection: React.FC<CompanySectionProps> = ({
  filters,
  updateFilter,
  toggleFilterValue,
  isValueSelected
}) => {
  const [companySearch, setCompanySearch] = useState<string>("");

  const filteredCompanies = majorCompanies.filter(company =>
    company.toLowerCase().includes(companySearch.toLowerCase())
  );

  const handleCompanySelect = (company: string) => {
    toggleFilterValue('customTags', `company:${company}`);
    setCompanySearch("");
  };

  const handleSizeSelect = (size: string) => {
    toggleFilterValue('companySizes', size);
  };

  const handleIndustrySelect = (industry: string) => {
    toggleFilterValue('industries', industry);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <Label className="text-base font-medium">Nome da Empresa</Label>
          <p className="text-sm text-gray-600 mb-2">Digite nomes de empresas específicas</p>
          <Input
            placeholder="Ex: Microsoft, Google, Nubank..."
            value={companySearch}
            onChange={(e) => setCompanySearch(e.target.value)}
          />
          {companySearch && (
            <div className="mt-2 max-h-40 overflow-y-auto border rounded-md bg-white">
              {filteredCompanies.slice(0, 10).map(company => (
                <div 
                  key={company}
                  className="p-2 hover:bg-gray-100 cursor-pointer text-sm border-b last:border-b-0"
                  onClick={() => handleCompanySelect(company)}
                >
                  {company}
                </div>
              ))}
              {filteredCompanies.length === 0 && (
                <div className="p-2 text-sm text-gray-500">
                  Nenhuma empresa encontrada para "{companySearch}"
                </div>
              )}
            </div>
          )}
        </div>

        <div>
          <Label className="text-base font-medium">Tamanho da Empresa</Label>
          <p className="text-sm text-gray-600 mb-2">Faixas de número de funcionários</p>
          <Select onValueChange={handleSizeSelect}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o tamanho..." />
            </SelectTrigger>
            <SelectContent>
              {companySizes.map(size => (
                <SelectItem key={size.id} value={size.id}>
                  {size.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <Label className="text-base font-medium">Setor/Indústria</Label>
          <p className="text-sm text-gray-600 mb-2">Área de atuação da empresa</p>
          <Select onValueChange={handleIndustrySelect}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o setor..." />
            </SelectTrigger>
            <SelectContent>
              {industries.map(industry => (
                <SelectItem key={industry} value={industry}>
                  {industry}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default CompanySection;
