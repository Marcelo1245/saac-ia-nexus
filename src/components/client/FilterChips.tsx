
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProspectingFilters } from '@/types/prospecting';

interface FilterChipsProps {
  category: keyof ProspectingFilters;
  filters: Partial<ProspectingFilters>;
  toggleFilterValue: (category: keyof ProspectingFilters, value: string) => void;
}

const FilterChips: React.FC<FilterChipsProps> = ({ 
  category, 
  filters, 
  toggleFilterValue 
}) => {
  const values = filters[category] as string[] || [];
  
  if (values.length === 0) return null;
  
  return (
    <div className="flex flex-wrap gap-1 mt-2">
      {values.map(value => (
        <Badge 
          key={value} 
          variant="outline"
          className="bg-white text-xs px-2 py-0.5 flex items-center gap-1"
        >
          {value}
          <Button
            variant="ghost"
            size="icon"
            className="h-3 w-3 ml-1 p-0"
            onClick={() => toggleFilterValue(category, value)}
          >
            <span className="sr-only">Remove</span>
            <svg width="5" height="5" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.5 1.5L4.5 4.5M1.5 4.5L4.5 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </Button>
        </Badge>
      ))}
    </div>
  );
};

export default FilterChips;
