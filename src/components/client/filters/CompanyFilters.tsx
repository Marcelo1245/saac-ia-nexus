
import React from 'react';
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ProspectingFilters } from '@/types/prospecting';
import FilterGroup from '../FilterGroup';
import FilterChips from '../FilterChips';

interface CompanyFiltersProps {
  filters: Partial<ProspectingFilters>;
  isValueSelected: (category: keyof ProspectingFilters, value: string) => boolean;
  toggleFilterValue: (category: keyof ProspectingFilters, value: string) => void;
}

const CompanyFilters: React.FC<CompanyFiltersProps> = ({ 
  filters, 
  isValueSelected, 
  toggleFilterValue 
}) => {
  return (
    <>
      <FilterGroup 
        title="Indústria" 
        helpText="Selecione os segmentos de mercado das empresas que deseja alcançar."
      >
        <div className="grid grid-cols-2 gap-2">
          {["SaaS", "Finanças", "Varejo", "Saúde", "Educação", "Tecnologia", "Manufatura", "Serviços"].map(industry => (
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
      
      <FilterGroup 
        title="Tamanho da Empresa" 
        helpText="Filtre empresas pelo número de funcionários."
      >
        <div className="grid grid-cols-3 gap-2">
          {["1-10", "11-50", "51-200", "201-500", "501-1000", "1000+"].map(size => (
            <div key={size} className="flex items-center space-x-2">
              <Checkbox 
                id={`size-${size}`} 
                checked={isValueSelected('companySizes', size)}
                onCheckedChange={() => toggleFilterValue('companySizes', size)}
              />
              <Label htmlFor={`size-${size}`} className="text-sm">{size} func.</Label>
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
        title="Tecnologias Utilizadas" 
        helpText="Encontre empresas que utilizam tecnologias específicas."
      >
        <div className="grid grid-cols-2 gap-2">
          {["CRM", "ERP", "Marketing Automation", "Cloud Services", "WordPress", "E-commerce", "Data Analytics"].map(tech => (
            <div key={tech} className="flex items-center space-x-2">
              <Checkbox 
                id={`tech-${tech}`} 
                checked={isValueSelected('techStacks', tech)}
                onCheckedChange={() => toggleFilterValue('techStacks', tech)}
              />
              <Label htmlFor={`tech-${tech}`} className="text-sm">{tech}</Label>
            </div>
          ))}
        </div>
        <FilterChips 
          category="techStacks" 
          filters={filters}
          toggleFilterValue={toggleFilterValue}
        />
      </FilterGroup>
    </>
  );
};

export default CompanyFilters;
