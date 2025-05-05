
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ProspectingFilters } from '@/types/prospecting';
import { Progress } from '@/components/ui/progress';
import { Users, MessageSquare, Calendar } from 'lucide-react';

interface PredictedResultsProps {
  filters: Partial<ProspectingFilters>;
}

export const PredictedResults: React.FC<PredictedResultsProps> = ({ filters }) => {
  // Calculando estimativas baseadas nos filtros selecionados
  // Em uma implementação real, isso seria baseado em dados históricos e modelos preditivos
  
  const hasIndustries = filters.industries && filters.industries.length > 0;
  const hasCompanySizes = filters.companySizes && filters.companySizes.length > 0;
  const hasHierarchyLevels = filters.hierarchyLevels && filters.hierarchyLevels.length > 0;
  const hasFunctionalRoles = filters.functionalRoles && filters.functionalRoles.length > 0;
  
  // Quanto mais filtros selecionados, mais precisa é a segmentação
  const segmentationScore = [
    hasIndustries, 
    hasCompanySizes, 
    hasHierarchyLevels, 
    hasFunctionalRoles
  ].filter(Boolean).length * 25;
  
  // Estimativas de volume baseadas nos filtros
  let potentialLeads = 0;
  let expectedResponses = 0;
  let estimatedMeetings = 0;
  
  if (hasIndustries) {
    // Cálculo básico: cada indústria vale aproximadamente 100 leads
    potentialLeads += filters.industries!.length * 100;
  }
  
  if (hasCompanySizes) {
    // Ajuste baseado no tamanho das empresas
    const sizeMultiplier = filters.companySizes!.includes('501+') ? 1.5 : 1;
    potentialLeads = Math.round(potentialLeads * sizeMultiplier);
  }
  
  if (hasHierarchyLevels && hasFunctionalRoles) {
    // Níveis C-Level geralmente têm taxas de resposta mais baixas, mas maior qualidade
    const levelFactor = filters.hierarchyLevels!.includes('C-Level') ? 0.8 : 1.2;
    potentialLeads = Math.round(potentialLeads * levelFactor);
  }
  
  // Cálculos finais para estimar resultados
  expectedResponses = Math.round(potentialLeads * 0.10); // Taxa de resposta de 10%
  estimatedMeetings = Math.round(expectedResponses * 0.25); // 25% das respostas se convertem em reuniões
  
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-white">Resultados Previstos</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gray-700 border-gray-600">
          <CardContent className="pt-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center mr-3">
                <Users className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">Leads Potenciais</p>
                <p className="text-2xl font-bold text-white">{potentialLeads.toLocaleString()}</p>
              </div>
            </div>
            <p className="text-xs text-gray-400">
              Baseado nos filtros demográficos e de contato aplicados.
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-700 border-gray-600">
          <CardContent className="pt-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center mr-3">
                <MessageSquare className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">Respostas Esperadas</p>
                <p className="text-2xl font-bold text-white">{expectedResponses.toLocaleString()}</p>
              </div>
            </div>
            <p className="text-xs text-gray-400">
              Estimativa baseada em taxa de resposta média de 10%.
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-700 border-gray-600">
          <CardContent className="pt-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-saac-blue/10 flex items-center justify-center mr-3">
                <Calendar className="h-5 w-5 text-saac-blue" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">Reuniões Estimadas</p>
                <p className="text-2xl font-bold text-white">{estimatedMeetings.toLocaleString()}</p>
              </div>
            </div>
            <p className="text-xs text-gray-400">
              Aproximadamente 25% das respostas se convertem em reuniões.
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Card className="bg-gray-700 border-gray-600">
        <CardContent className="pt-6">
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium text-white">Qualidade da Segmentação</h4>
              <span className="text-sm font-medium text-white">{segmentationScore}%</span>
            </div>
            <Progress value={segmentationScore} className="h-2" />
          </div>
          
          <div className="space-y-2 text-sm">
            {!hasIndustries && (
              <p className="text-yellow-500">
                • Recomendamos adicionar filtros de indústria para melhorar a segmentação.
              </p>
            )}
            {!hasCompanySizes && (
              <p className="text-yellow-500">
                • Filtrar por tamanho de empresa ajuda a focar em seu público-alvo ideal.
              </p>
            )}
            {!hasHierarchyLevels && (
              <p className="text-yellow-500">
                • Selecionar níveis hierárquicos específicos melhora as taxas de conversão.
              </p>
            )}
            {!hasFunctionalRoles && (
              <p className="text-yellow-500">
                • Adicionar filtros de função garante que suas mensagens cheguem às pessoas certas.
              </p>
            )}
            {segmentationScore === 100 && (
              <p className="text-green-500">
                • Excelente segmentação! Sua campanha está bem definida.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
