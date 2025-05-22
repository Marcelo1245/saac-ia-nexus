
import React from 'react';
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ProspectingFilters } from '@/types/prospecting';
import FilterGroup from '../FilterGroup';
import FilterChips from '../FilterChips';

interface PeopleFiltersProps {
  filters: Partial<ProspectingFilters>;
  isValueSelected: (category: keyof ProspectingFilters, value: string) => boolean;
  toggleFilterValue: (category: keyof ProspectingFilters, value: string) => void;
}

const PeopleFilters: React.FC<PeopleFiltersProps> = ({ 
  filters, 
  isValueSelected, 
  toggleFilterValue 
}) => {
  return (
    <>
      <FilterGroup 
        title="Nível Hierárquico" 
        helpText="Filtre por cargos de diferentes níveis hierárquicos."
      >
        <div className="grid grid-cols-3 gap-2">
          {["C-Level", "VP/Diretor", "Gerente", "Coordenador", "Especialista", "Analista"].map(level => (
            <div key={level} className="flex items-center space-x-2">
              <Checkbox 
                id={`level-${level}`} 
                checked={isValueSelected('hierarchyLevels', level)}
                onCheckedChange={() => toggleFilterValue('hierarchyLevels', level)}
              />
              <Label htmlFor={`level-${level}`} className="text-sm">{level}</Label>
            </div>
          ))}
        </div>
        <FilterChips 
          category="hierarchyLevels" 
          filters={filters}
          toggleFilterValue={toggleFilterValue}
        />
      </FilterGroup>
      
      <FilterGroup 
        title="Departamento" 
        helpText="Selecione os departamentos que deseja alcançar."
      >
        <div className="grid grid-cols-3 gap-2">
          {["Vendas", "Marketing", "TI", "RH", "Financeiro", "Operações", "Produto", "Executivo"].map(dept => (
            <div key={dept} className="flex items-center space-x-2">
              <Checkbox 
                id={`dept-${dept}`} 
                checked={isValueSelected('departments', dept)}
                onCheckedChange={() => toggleFilterValue('departments', dept)}
              />
              <Label htmlFor={`dept-${dept}`} className="text-sm">{dept}</Label>
            </div>
          ))}
        </div>
        <FilterChips 
          category="departments" 
          filters={filters}
          toggleFilterValue={toggleFilterValue}
        />
      </FilterGroup>
      
      <FilterGroup 
        title="Função Profissional" 
        helpText="Filtre por função específica dentro dos departamentos."
      >
        <div className="grid grid-cols-2 gap-2">
          {["CMO", "CFO", "CTO", "CEO", "Diretor de Marketing", "Diretor de Vendas", "Head de Growth", "VP de Produto"].map(role => (
            <div key={role} className="flex items-center space-x-2">
              <Checkbox 
                id={`role-${role}`} 
                checked={isValueSelected('functionalRoles', role)}
                onCheckedChange={() => toggleFilterValue('functionalRoles', role)}
              />
              <Label htmlFor={`role-${role}`} className="text-sm">{role}</Label>
            </div>
          ))}
        </div>
        <FilterChips 
          category="functionalRoles" 
          filters={filters}
          toggleFilterValue={toggleFilterValue}
        />
      </FilterGroup>
    </>
  );
};

export default PeopleFilters;
