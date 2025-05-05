
import React from 'react';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { HierarchyLevel } from '@/types/prospecting';

interface HierarchyLevelSelectorProps {
  selected: string[];
  onChange: (selected: string[]) => void;
}

// Lista de níveis hierárquicos pré-definidos
const availableHierarchyLevels: Array<{ id: HierarchyLevel; name: string }> = [
  { id: 'C-Level', name: 'C-Level' },
  { id: 'VP/Diretor', name: 'VP/Diretor' },
  { id: 'Gerente', name: 'Gerente' }
];

export const HierarchyLevelSelector: React.FC<HierarchyLevelSelectorProps> = ({ selected, onChange }) => {
  const handleToggleLevel = (levelId: string) => {
    if (selected.includes(levelId)) {
      onChange(selected.filter(id => id !== levelId));
    } else {
      onChange([...selected, levelId]);
    }
  };

  const handleRemoveLevel = (levelId: string) => {
    onChange(selected.filter(id => id !== levelId));
  };

  return (
    <div className="space-y-3">
      <div>
        <Label>Nível Hierárquico</Label>
        <p className="text-xs text-gray-400 mt-1">
          Selecione os níveis hierárquicos que deseja incluir na sua campanha.
        </p>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-3">
        {selected.length > 0 ? (
          selected.map(levelId => {
            const level = availableHierarchyLevels.find(l => l.id === levelId);
            return (
              <Badge 
                key={levelId} 
                variant="secondary"
                className="bg-saac-blue/20 text-saac-blue hover:bg-saac-blue/30 px-2 py-1"
              >
                {level?.name || levelId}
                <button 
                  className="ml-1 hover:text-white" 
                  onClick={() => handleRemoveLevel(levelId)}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            );
          })
        ) : (
          <div className="text-sm text-gray-400">Nenhum nível selecionado</div>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        {availableHierarchyLevels.map(level => (
          <button
            key={level.id}
            onClick={() => handleToggleLevel(level.id)}
            className={`px-3 py-2 rounded-md text-sm transition-colors ${
              selected.includes(level.id)
                ? 'bg-saac-blue text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {level.name}
          </button>
        ))}
      </div>
    </div>
  );
};
