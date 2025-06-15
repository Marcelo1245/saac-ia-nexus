
import React from 'react';
import { Label } from '@/components/ui/label';
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

const companyTypes = [
  "Empresa pública",
  "Empresa privada", 
  "Instituição educacional",
  "Parceria",
  "Trabalhadores por conta própria",
  "Próprio",
  "Agência governamental"
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

const CompanySection: React.FC<CompanySectionProps> = ({
  filters,
  updateFilter,
  toggleFilterValue,
  isValueSelected
}) => {
  const handleCompanyTypeSelect = (type: string) => {
    toggleFilterValue('customTags', `companyType:${type}`);
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
          <Label className="text-base font-medium">Tipo de Empresa</Label>
          <p className="text-sm text-gray-600 mb-2">Selecione o tipo de organização</p>
          <Select onValueChange={handleCompanyTypeSelect}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o tipo..." />
            </SelectTrigger>
            <SelectContent>
              {companyTypes.map(type => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
