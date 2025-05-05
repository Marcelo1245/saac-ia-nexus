
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';

interface HotLead {
  id: string;
  name: string;
  company: string;
  position: string;
  score: number;
  lastActivity: string;
}

// Dados simulados
const mockHotLeads: HotLead[] = [
  {
    id: '1',
    name: 'Carlos Silva',
    company: 'TechSoft',
    position: 'Diretor de TI',
    score: 92,
    lastActivity: 'Visitou a página de preços'
  },
  {
    id: '2',
    name: 'Mariana Costa',
    company: 'EcommerceGo',
    position: 'VP de Marketing',
    score: 88,
    lastActivity: 'Fez download do whitepaper'
  },
  {
    id: '3',
    name: 'André Mendes',
    company: 'SaaS Solutions',
    position: 'CEO',
    score: 85,
    lastActivity: 'Postou sobre automação'
  },
  {
    id: '4',
    name: 'Luiza Santos',
    company: 'FinTech Capital',
    position: 'Diretora de Inovação',
    score: 79,
    lastActivity: 'Visualizou casos de sucesso'
  }
];

export const HotLeadsList: React.FC = () => {
  const { data: hotLeads, isLoading } = useQuery({
    queryKey: ['hotLeads'],
    queryFn: () => {
      // Simula uma chamada de API
      return new Promise<HotLead[]>((resolve) => {
        setTimeout(() => resolve(mockHotLeads), 800);
      });
    }
  });

  if (isLoading) {
    return <div className="flex justify-center py-4">Carregando leads...</div>;
  }

  return (
    <div className="space-y-4">
      {hotLeads?.map((lead) => (
        <div key={lead.id} className="flex items-start gap-3 p-3 rounded-md hover:bg-gray-700 transition-colors">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-saac-blue text-white">
              {lead.name.split(' ').map(part => part[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-center mb-1">
              <h4 className="font-medium text-white truncate">{lead.name}</h4>
              <span className="text-xs px-2 py-1 rounded-full bg-saac-blue text-white">
                {lead.score}%
              </span>
            </div>
            <p className="text-sm text-gray-400 truncate">{lead.position} • {lead.company}</p>
            <div className="mt-2">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-400">Probabilidade de conversão</span>
              </div>
              <Progress value={lead.score} className="h-1.5" />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Última atividade: {lead.lastActivity}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
