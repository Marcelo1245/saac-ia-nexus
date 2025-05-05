
import React from 'react';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { FunctionalRole } from '@/types/prospecting';

interface FunctionalRoleSelectorProps {
  selected: string[];
  onChange: (selected: string[]) => void;
}

// Lista de funções pré-definidas
const availableFunctionalRoles: Array<{ id: FunctionalRole; name: string }> = [
  { id: 'Marketing', name: 'Marketing' },
  { id: 'Vendas', name: 'Vendas' },
  { id: 'TI', name: 'TI' },
  { id: 'Operações', name: 'Operações' },
  { id: 'Finanças', name: 'Finanças' },
  { id: 'RH', name: 'Recursos Humanos' },
  { id: 'Produto', name: 'Produto' },
  { id: 'Jurídico', name: 'Jurídico' }
];

export const FunctionalRoleSelector: React.FC<FunctionalRoleSelectorProps> = ({ selected, onChange }) => {
  const handleToggleRole = (roleId: string) => {
    if (selected.includes(roleId)) {
      onChange(selected.filter(id => id !== roleId));
    } else {
      onChange([...selected, roleId]);
    }
  };

  const handleRemoveRole = (roleId: string) => {
    onChange(selected.filter(id => id !== roleId));
  };

  return (
    <div className="space-y-3">
      <div>
        <Label>Função</Label>
        <p className="text-xs text-gray-400 mt-1">
          Selecione as funções que deseja incluir na sua campanha.
        </p>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-3">
        {selected.length > 0 ? (
          selected.map(roleId => {
            const role = availableFunctionalRoles.find(r => r.id === roleId);
            return (
              <Badge 
                key={roleId} 
                variant="secondary"
                className="bg-saac-blue/20 text-saac-blue hover:bg-saac-blue/30 px-2 py-1"
              >
                {role?.name || roleId}
                <button 
                  className="ml-1 hover:text-white" 
                  onClick={() => handleRemoveRole(roleId)}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            );
          })
        ) : (
          <div className="text-sm text-gray-400">Nenhuma função selecionada</div>
        )}
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {availableFunctionalRoles.map(role => (
          <button
            key={role.id}
            onClick={() => handleToggleRole(role.id)}
            className={`px-3 py-2 rounded-md text-sm transition-colors ${
              selected.includes(role.id)
                ? 'bg-saac-blue text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {role.name}
          </button>
        ))}
      </div>
    </div>
  );
};
