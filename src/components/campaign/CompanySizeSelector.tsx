
import React from 'react';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { CompanySize } from '@/types/prospecting';

interface CompanySizeSelectorProps {
  selected: string[];
  onChange: (selected: string[]) => void;
}

// Lista de tamanhos de empresa pré-definidos
const availableCompanySizes: Array<{ id: CompanySize; name: string }> = [
  { id: '1-10', name: '1-10 funcionários' },
  { id: '11-50', name: '11-50 funcionários' },
  { id: '51-200', name: '51-200 funcionários' },
  { id: '201-500', name: '201-500 funcionários' },
  { id: '501+', name: '501+ funcionários' }
];

export const CompanySizeSelector: React.FC<CompanySizeSelectorProps> = ({ selected, onChange }) => {
  const handleToggleSize = (sizeId: string) => {
    if (selected.includes(sizeId)) {
      onChange(selected.filter(id => id !== sizeId));
    } else {
      onChange([...selected, sizeId]);
    }
  };

  const handleRemoveSize = (sizeId: string) => {
    onChange(selected.filter(id => id !== sizeId));
  };

  return (
    <div className="space-y-3">
      <div>
        <Label>Tamanho da Empresa</Label>
        <p className="text-xs text-gray-400 mt-1">
          Selecione os tamanhos de empresa que deseja incluir na sua campanha.
        </p>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-3">
        {selected.length > 0 ? (
          selected.map(sizeId => {
            const size = availableCompanySizes.find(s => s.id === sizeId);
            return (
              <Badge 
                key={sizeId} 
                variant="secondary"
                className="bg-saac-blue/20 text-saac-blue hover:bg-saac-blue/30 px-2 py-1"
              >
                {size?.name || sizeId}
                <button 
                  className="ml-1 hover:text-white" 
                  onClick={() => handleRemoveSize(sizeId)}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            );
          })
        ) : (
          <div className="text-sm text-gray-400">Nenhum tamanho selecionado</div>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2">
        {availableCompanySizes.map(size => (
          <button
            key={size.id}
            onClick={() => handleToggleSize(size.id)}
            className={`px-3 py-2 rounded-md text-sm transition-colors ${
              selected.includes(size.id)
                ? 'bg-saac-blue text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {size.name}
          </button>
        ))}
      </div>
    </div>
  );
};
