
import React from 'react';
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ProspectingFilters } from '@/types/prospecting';
import FilterGroup from '../FilterGroup';
import FilterChips from '../FilterChips';

interface CustomFiltersProps {
  filters: Partial<ProspectingFilters>;
  isValueSelected: (category: keyof ProspectingFilters, value: string) => boolean;
  toggleFilterValue: (category: keyof ProspectingFilters, value: string) => void;
}

const CustomFilters: React.FC<CustomFiltersProps> = ({ 
  filters, 
  isValueSelected, 
  toggleFilterValue 
}) => {
  return (
    <FilterGroup 
      title="Tags exclusivas SAAC" 
      helpText="Filtros personalizados baseados em nossa IA proprietária."
    >
      <div className="grid grid-cols-2 gap-2">
        {[
          "Alta propensão de compra", 
          "Fit ideal", 
          "Expansão recente", 
          "Tech-savvy", 
          "Early adopter", 
          "Interesse em IA", 
          "Alto budget", 
          "Decision maker"
        ].map(tag => (
          <div key={tag} className="flex items-center space-x-2">
            <Checkbox 
              id={`tag-${tag}`} 
              checked={isValueSelected('customTags', tag)}
              onCheckedChange={() => toggleFilterValue('customTags', tag)}
            />
            <Label htmlFor={`tag-${tag}`} className="text-sm">{tag}</Label>
          </div>
        ))}
      </div>
      <FilterChips 
        category="customTags" 
        filters={filters}
        toggleFilterValue={toggleFilterValue}
      />
    </FilterGroup>
  );
};

export default CustomFilters;
