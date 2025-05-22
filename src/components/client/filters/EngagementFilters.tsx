
import React from 'react';
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ProspectingFilters } from '@/types/prospecting';
import FilterGroup from '../FilterGroup';
import FilterChips from '../FilterChips';

interface EngagementFiltersProps {
  filters: Partial<ProspectingFilters>;
  isValueSelected: (category: keyof ProspectingFilters, value: string) => boolean;
  toggleFilterValue: (category: keyof ProspectingFilters, value: string) => void;
}

const EngagementFilters: React.FC<EngagementFiltersProps> = ({ 
  filters, 
  isValueSelected, 
  toggleFilterValue 
}) => {
  return (
    <>
      <FilterGroup 
        title="Interações Recentes" 
        helpText="Filtre por contatos que tiveram interações específicas com sua marca."
      >
        <div className="grid grid-cols-2 gap-2">
          {[
            "Visitou o site", 
            "Baixou conteúdo", 
            "Participou de webinar", 
            "Solicitou demonstração", 
            "Abriu email", 
            "Clicou em anúncio"
          ].map(interaction => (
            <div key={interaction} className="flex items-center space-x-2">
              <Checkbox 
                id={`interaction-${interaction}`} 
                checked={isValueSelected('interactions', interaction)}
                onCheckedChange={() => toggleFilterValue('interactions', interaction)}
              />
              <Label htmlFor={`interaction-${interaction}`} className="text-sm">{interaction}</Label>
            </div>
          ))}
        </div>
        <FilterChips 
          category="interactions" 
          filters={filters}
          toggleFilterValue={toggleFilterValue}
        />
      </FilterGroup>
      
      <FilterGroup 
        title="Eventos Recentes" 
        helpText="Encontre pessoas com mudanças recentes que indicam oportunidades de venda."
      >
        <div className="grid grid-cols-2 gap-2">
          {[
            "Mudança de cargo", 
            "Nova contratação", 
            "Levantou investimento", 
            "Expansão", 
            "Fusão/Aquisição", 
            "Lançamento de produto"
          ].map(event => (
            <div key={event} className="flex items-center space-x-2">
              <Checkbox 
                id={`event-${event}`} 
                checked={isValueSelected('recentActivities', event)}
                onCheckedChange={() => toggleFilterValue('recentActivities', event)}
              />
              <Label htmlFor={`event-${event}`} className="text-sm">{event}</Label>
            </div>
          ))}
        </div>
        <FilterChips 
          category="recentActivities" 
          filters={filters}
          toggleFilterValue={toggleFilterValue}
        />
      </FilterGroup>
    </>
  );
};

export default EngagementFilters;
