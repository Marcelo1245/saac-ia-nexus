
import React from 'react';
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle } from 'lucide-react';

interface FilterGroupProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  helpText?: string;
}

const FilterGroup: React.FC<FilterGroupProps> = ({ 
  title, 
  description, 
  children,
  helpText
}) => {
  return (
    <div className="space-y-2 mb-6">
      <div className="flex items-center">
        <h3 className="text-sm font-medium text-gray-800">{title}</h3>
        {helpText && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6 ml-1">
                  <HelpCircle className="h-4 w-4 text-gray-400" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs text-xs">{helpText}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      {description && <p className="text-xs text-gray-500">{description}</p>}
      <div className="mt-1">{children}</div>
    </div>
  );
};

export default FilterGroup;
