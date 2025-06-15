
import React, { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ProspectingFilters } from '@/types/prospecting';
import FilterGroup from '../FilterGroup';
import FilterChips from '../FilterChips';

interface PeopleFiltersProps {
  filters: Partial<ProspectingFilters>;
  isValueSelected: (category: keyof ProspectingFilters, value: string) => boolean;
  toggleFilterValue: (category: keyof ProspectingFilters, value: string) => void;
}

const seniorityLevels = [
  { id: "Trainee/Intern", label: "Estagiário/Trainee" },
  { id: "Entry", label: "Júnior/Associado" },
  { id: "Senior", label: "Sênior" },
  { id: "Manager", label: "Gerente" },
  { id: "Director", label: "Diretor" },
  { id: "VP", label: "Vice-Presidente (VP)" },
  { id: "CXO", label: "C-Level (CEO, CTO, CFO, etc.)" },
  { id: "Owner", label: "Proprietário/Fundador" }
];

const functions = [
  "Vendas",
  "Marketing",
  "Engenharia",
  "Finanças",
  "Recursos Humanos",
  "Operações",
  "Produto",
  "Tecnologia da Informação",
  "Atendimento ao Cliente",
  "Business Development",
  "Pesquisa e Desenvolvimento",
  "Jurídico",
  "Compras",
  "Qualidade",
  "Logística",
  "Administrativo",
  "Consultoria",
  "Educação",
  "Saúde",
  "Mídia e Comunicação",
  "Arte e Design",
  "Real Estate",
  "Programa e Gerenciamento de Projetos"
];

const jobTitles = [
  // C-Level
  "CEO", "CTO", "CFO", "CMO", "COO", "CHRO", "CPO", "CDO", "CIO", "CSO",
  
  // VP Level
  "VP Sales", "VP Marketing", "VP Engineering", "VP Finance", "VP Operations",
  "VP Product", "VP Technology", "VP Business Development", "VP Human Resources",
  
  // Director Level
  "Sales Director", "Marketing Director", "Engineering Director", "Finance Director",
  "Operations Director", "Product Director", "Technology Director", "HR Director",
  
  // Manager Level
  "Sales Manager", "Marketing Manager", "Engineering Manager", "Finance Manager",
  "Operations Manager", "Product Manager", "Project Manager", "Account Manager",
  "Regional Manager", "General Manager", "Brand Manager", "Digital Marketing Manager",
  
  // Specialist/Senior Level
  "Senior Software Engineer", "Senior Developer", "Senior Analyst", "Senior Consultant",
  "Software Engineer", "Data Scientist", "Business Analyst", "Account Executive",
  "Sales Representative", "Marketing Specialist", "HR Specialist", "Financial Analyst",
  "UX Designer", "UI Designer", "DevOps Engineer", "Data Analyst",
  
  // Entry Level
  "Junior Developer", "Junior Analyst", "Sales Associate", "Marketing Associate",
  "HR Associate", "Finance Associate", "Customer Success Representative",
  "Business Development Representative", "Inside Sales Representative"
];

const departments = [
  "Executivo/C-Level",
  "Vendas",
  "Marketing",
  "Engenharia/TI",
  "Produto",
  "Finanças",
  "Recursos Humanos",
  "Operações",
  "Atendimento ao Cliente",
  "Business Development",
  "Jurídico",
  "Pesquisa e Desenvolvimento",
  "Qualidade",
  "Compras/Procurement",
  "Logística/Supply Chain",
  "Administrativo",
  "Consultoria",
  "Mídia e Comunicação",
  "Arte e Design"
];

const PeopleFilters: React.FC<PeopleFiltersProps> = ({ 
  filters, 
  isValueSelected, 
  toggleFilterValue 
}) => {
  const [titleSearch, setTitleSearch] = useState<string>("");
  
  const filteredTitles = jobTitles.filter(title =>
    title.toLowerCase().includes(titleSearch.toLowerCase())
  );

  const handleTitleSelect = (title: string) => {
    toggleFilterValue('customTags', `title:${title}`);
    setTitleSearch("");
  };

  return (
    <>
      <FilterGroup 
        title="Título do Cargo" 
        helpText="Digite ou selecione títulos de cargos específicos. Use este filtro para segmentação precisa por posição."
      >
        <div className="space-y-3">
          <Input
            placeholder="Digite o título do cargo..."
            value={titleSearch}
            onChange={(e) => setTitleSearch(e.target.value)}
          />
          
          {titleSearch && (
            <div className="max-h-40 overflow-y-auto border rounded-md">
              {filteredTitles.slice(0, 10).map(title => (
                <div 
                  key={title}
                  className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                  onClick={() => handleTitleSelect(title)}
                >
                  {title}
                </div>
              ))}
              {filteredTitles.length === 0 && (
                <div className="p-2 text-sm text-gray-500">
                  Cargo não encontrado. Digite para adicionar "{titleSearch}"
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="mt-3">
          <Label className="text-sm font-medium">Cargos Selecionados:</Label>
          <div className="flex flex-wrap gap-1 mt-2">
            {(filters.customTags || [])
              .filter(tag => tag.startsWith('title:'))
              .map(tag => (
                <span 
                  key={tag} 
                  className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs flex items-center gap-1"
                >
                  {tag.replace('title:', '')}
                  <button 
                    onClick={() => toggleFilterValue('customTags', tag)}
                    className="text-green-600 hover:text-green-800"
                  >
                    ×
                  </button>
                </span>
              ))}
          </div>
        </div>
      </FilterGroup>

      <FilterGroup 
        title="Nível de Senioridade" 
        helpText="Filtre por nível hierárquico dentro da organização."
      >
        <div className="space-y-2">
          {seniorityLevels.map(level => (
            <div key={level.id} className="flex items-center space-x-2">
              <Checkbox 
                id={`seniority-${level.id}`} 
                checked={isValueSelected('hierarchyLevels', level.id)}
                onCheckedChange={() => toggleFilterValue('hierarchyLevels', level.id)}
              />
              <Label htmlFor={`seniority-${level.id}`} className="text-sm">{level.label}</Label>
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
        helpText="Selecione os departamentos onde os profissionais trabalham."
      >
        <div className="grid grid-cols-2 gap-2">
          {departments.map(dept => (
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
        helpText="Filtre por área de especialização ou função dentro da empresa."
      >
        <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
          {functions.map(func => (
            <div key={func} className="flex items-center space-x-2">
              <Checkbox 
                id={`function-${func}`} 
                checked={isValueSelected('functionalRoles', func)}
                onCheckedChange={() => toggleFilterValue('functionalRoles', func)}
              />
              <Label htmlFor={`function-${func}`} className="text-sm">{func}</Label>
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
