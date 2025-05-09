
import React from 'react';
import { Lead } from '@/types/prospecting';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MessageSquare, Mail, Calendar, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface KanbanBoardProps {
  leads: Lead[];
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({ leads }) => {
  // Agrupar leads por status
  const leadsByStatus: Record<string, Lead[]> = {
    new: [],
    contacted: [],
    engaged: [],
    qualified: [],
    converted: []
  };
  
  leads.forEach(lead => {
    if (lead.status !== 'lost') {
      // Use optional chaining to safely access the status
      const status = lead.status || 'new';
      // Only add to known status categories
      if (leadsByStatus[status]) {
        leadsByStatus[status].push(lead);
      }
    }
  });
  
  // Configuração de cores e títulos para as colunas
  const columnConfig = {
    new: { title: 'Novos', color: 'border-blue-500', bgColor: 'bg-blue-500/10' },
    contacted: { title: 'Contatados', color: 'border-yellow-500', bgColor: 'bg-yellow-500/10' },
    engaged: { title: 'Engajados', color: 'border-purple-500', bgColor: 'bg-purple-500/10' },
    qualified: { title: 'Qualificados', color: 'border-green-500', bgColor: 'bg-green-500/10' },
    converted: { title: 'Convertidos', color: 'border-saac-blue', bgColor: 'bg-saac-blue/10' }
  };
  
  // Helper to safely get initials from a lead
  const getInitials = (lead: Lead): string => {
    if (lead.firstName && lead.lastName) {
      return `${lead.firstName.charAt(0)}${lead.lastName.charAt(0)}`;
    } else if (lead.name) {
      const nameParts = lead.name.split(' ');
      if (nameParts.length > 1) {
        return `${nameParts[0].charAt(0)}${nameParts[1].charAt(0)}`;
      }
      return lead.name.charAt(0);
    }
    return 'LD'; // Default fallback
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto pb-6">
      {Object.entries(leadsByStatus).map(([status, statusLeads]) => (
        <div key={status} className="min-w-[300px]">
          <div className={`rounded-t-md p-3 ${columnConfig[status as keyof typeof columnConfig].bgColor}`}>
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-white">
                {columnConfig[status as keyof typeof columnConfig].title}
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-gray-800 text-white text-xs">
                {statusLeads.length}
              </span>
            </div>
          </div>
          
          <div className={`h-full space-y-3 p-3 rounded-b-md border-t-2 ${columnConfig[status as keyof typeof columnConfig].color} bg-gray-800`}>
            {statusLeads.map(lead => (
              <Card key={lead.id} className="bg-gray-700 border-gray-600 hover:border-gray-500 transition-colors">
                <CardContent className="p-3">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarFallback className="bg-saac-blue text-white text-xs">
                          {getInitials(lead)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium text-white text-sm">
                          {lead.firstName && lead.lastName ? 
                            `${lead.firstName} ${lead.lastName}` : 
                            lead.name}
                        </h4>
                        <p className="text-gray-400 text-xs">{lead.position}</p>
                      </div>
                    </div>
                    <div 
                      className={`h-6 w-6 rounded-full flex items-center justify-center ${
                        lead.score && lead.score >= 80 ? 'bg-green-500/20 text-green-500' :
                        lead.score && lead.score >= 60 ? 'bg-yellow-500/20 text-yellow-500' :
                        'bg-gray-500/20 text-gray-400'
                      }`}
                    >
                      <Star className="h-3 w-3" />
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <p className="text-white text-sm font-medium">{lead.company}</p>
                    {lead.industry && lead.companySize && (
                      <p className="text-gray-400 text-xs">
                        {lead.industry} • {lead.companySize} funcionários
                      </p>
                    )}
                  </div>
                  
                  {lead.notes && (
                    <p className="text-gray-300 text-xs mb-3 border-l-2 border-gray-500 pl-2 italic">
                      {lead.notes}
                    </p>
                  )}
                  
                  <div className="flex justify-between items-center">
                    <div className="text-gray-400 text-xs">
                      {lead.lastActivity ? lead.lastActivity.toLocaleDateString('pt-BR') : '—'}
                    </div>
                    <div className="flex space-x-1">
                      <Button size="icon" variant="ghost" className="h-6 w-6">
                        <Mail className="h-3 w-3" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-6 w-6">
                        <Calendar className="h-3 w-3" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-6 w-6">
                        <MessageSquare className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {statusLeads.length === 0 && (
              <div className="h-24 flex items-center justify-center border border-dashed border-gray-600 rounded-md">
                <p className="text-gray-500 text-sm">Nenhum lead neste estágio</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
