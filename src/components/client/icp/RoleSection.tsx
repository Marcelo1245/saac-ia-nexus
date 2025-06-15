
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ProspectingFilters } from '@/types/prospecting';

interface RoleSectionProps {
  filters: Partial<ProspectingFilters>;
  updateFilter: (category: keyof ProspectingFilters, value: any) => void;
  toggleFilterValue: (category: keyof ProspectingFilters, value: string) => void;
  isValueSelected: (category: keyof ProspectingFilters, value: string) => boolean;
}

const seniorityLevels = [
  { id: "Estagiário", label: "Estagiário" },
  { id: "Associado", label: "Associado" },
  { id: "Gerente", label: "Gerente" },
  { id: "Diretor", label: "Diretor" },
  { id: "VP", label: "Vice-Presidente (VP)" },
  { id: "CXO", label: "CXO (CEO, CTO, CFO, etc.)" }
];

const functions = [
  "Marketing",
  "Vendas",
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
  "Saúde"
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
  "Sales Representative", "Marketing Specialist", "HR Specialist", "Financial Analyst"
];

const RoleSection: React.FC<RoleSectionProps> = ({
  filters,
  updateFilter,
  toggleFilterValue,
  isValueSelected
}) => {
  const [titleSearch, setTitleSearch] = useState<string>("");

  const filteredTitles = jobTitles.filter(title =>
    title.toLowerCase().includes(titleSearch.toLowerCase())
  );

  const handleTitleSelect = (title: string) => {
    toggleFilterValue('customTags', `title:${title}`);
    setTitleSearch("");
  };

  const handleSenioritySelect = (level: string) => {
    toggleFilterValue('hierarchyLevels', level);
  };

  const handleFunctionSelect = (func: string) => {
    toggleFilterValue('functionalRoles', func);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <Label className="text-base font-medium">Título do Cargo</Label>
          <p className="text-sm text-gray-600 mb-2">Busque cargos específicos</p>
          <Input
            placeholder="Ex: CEO, Marketing Manager, Developer..."
            value={titleSearch}
            onChange={(e) => setTitleSearch(e.target.value)}
          />
          {titleSearch && (
            <div className="mt-2 max-h-40 overflow-y-auto border rounded-md bg-white">
              {filteredTitles.slice(0, 10).map(title => (
                <div 
                  key={title}
                  className="p-2 hover:bg-gray-100 cursor-pointer text-sm border-b last:border-b-0"
                  onClick={() => handleTitleSelect(title)}
                >
                  {title}
                </div>
              ))}
              {filteredTitles.length === 0 && (
                <div className="p-2 text-sm text-gray-500">
                  Nenhum cargo encontrado para "{titleSearch}"
                </div>
              )}
            </div>
          )}
        </div>

        <div>
          <Label className="text-base font-medium">Nível Hierárquico/Senioridade</Label>
          <p className="text-sm text-gray-600 mb-2">Posição na hierarquia organizacional</p>
          <Select onValueChange={handleSenioritySelect}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o nível..." />
            </SelectTrigger>
            <SelectContent>
              {seniorityLevels.map(level => (
                <SelectItem key={level.id} value={level.id}>
                  {level.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <Label className="text-base font-medium">Função</Label>
          <p className="text-sm text-gray-600 mb-2">Área de especialização profissional</p>
          <Select onValueChange={handleFunctionSelect}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione a função..." />
            </SelectTrigger>
            <SelectContent>
              {functions.map(func => (
                <SelectItem key={func} value={func}>
                  {func}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default RoleSection;
