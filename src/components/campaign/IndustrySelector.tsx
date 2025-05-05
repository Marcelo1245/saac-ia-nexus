
import React from 'react';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { Industry } from '@/types/prospecting';

interface IndustrySelectorProps {
  selected: string[];
  onChange: (selected: string[]) => void;
}

// Lista de indústrias pré-definidas (estendível)
const availableIndustries: Array<{ id: string; name: string }> = [
  { id: 'SaaS', name: 'SaaS' },
  { id: 'E-commerce', name: 'E-commerce' },
  { id: 'Fintech', name: 'Fintech' },
  { id: 'Health', name: 'Saúde' },
  { id: 'Education', name: 'Educação' },
  { id: 'Retail', name: 'Varejo' },
  { id: 'Manufacturing', name: 'Indústria' },
  { id: 'Professional', name: 'Serviços Profissionais' },
  { id: 'Technology', name: 'Tecnologia' },
  { id: 'Media', name: 'Mídia & Entretenimento' }
];

export const IndustrySelector: React.FC<IndustrySelectorProps> = ({ selected, onChange }) => {
  const handleToggleIndustry = (industryId: string) => {
    if (selected.includes(industryId)) {
      onChange(selected.filter(id => id !== industryId));
    } else {
      onChange([...selected, industryId]);
    }
  };

  const handleRemoveIndustry = (industryId: string) => {
    onChange(selected.filter(id => id !== industryId));
  };

  return (
    <div className="space-y-3">
      <div>
        <Label>Indústrias</Label>
        <p className="text-xs text-gray-400 mt-1">
          Selecione as indústrias que deseja incluir na sua campanha.
        </p>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-3">
        {selected.length > 0 ? (
          selected.map(industryId => {
            const industry = availableIndustries.find(i => i.id === industryId);
            return (
              <Badge 
                key={industryId} 
                variant="secondary"
                className="bg-saac-blue/20 text-saac-blue hover:bg-saac-blue/30 px-2 py-1"
              >
                {industry?.name || industryId}
                <button 
                  className="ml-1 hover:text-white" 
                  onClick={() => handleRemoveIndustry(industryId)}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            );
          })
        ) : (
          <div className="text-sm text-gray-400">Nenhuma indústria selecionada</div>
        )}
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
        {availableIndustries.map(industry => (
          <button
            key={industry.id}
            onClick={() => handleToggleIndustry(industry.id)}
            className={`px-3 py-2 rounded-md text-sm transition-colors ${
              selected.includes(industry.id)
                ? 'bg-saac-blue text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {industry.name}
          </button>
        ))}
      </div>
    </div>
  );
};
