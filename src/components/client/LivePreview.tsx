
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { 
  Users, 
  TrendingUp, 
  CheckCircle, 
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ProspectingFilters as ProspectingFiltersType } from '@/types/prospecting';

interface LivePreviewProps {
  filters: Partial<ProspectingFiltersType>;
  estimatedLeads: number;
}

const LivePreview: React.FC<LivePreviewProps> = ({ filters, estimatedLeads }) => {
  // Calculate projected metrics based on filters
  const calculateConversionRate = (): number => {
    let rate = 8.3; // Base conversion rate
    
    // Adjust based on hierarchy levels (C-Level tends to convert less but with higher value)
    const hasClevel = filters.hierarchyLevels?.includes('C-Level');
    const hasManagers = filters.hierarchyLevels?.includes('Gerente');
    
    if (hasClevel) rate -= 2;
    if (hasManagers) rate += 3;
    
    // Adjust based on company size
    const hasSmallCompanies = filters.companySizes?.some(size => size.includes('1-10') || size.includes('11-50'));
    const hasEnterprises = filters.companySizes?.some(size => size.includes('1000+'));
    
    if (hasSmallCompanies) rate += 2;
    if (hasEnterprises) rate -= 1.5;
    
    // Cap the rate
    return Math.max(Math.min(rate, 15), 4);
  };
  
  const calculateProjectedCost = (): number => {
    // Base cost per lead
    const costPerLead = 9.5; 
    
    // Calculate monthly cost based on estimated leads
    return costPerLead * estimatedLeads;
  };
  
  const conversionRate = calculateConversionRate();
  const projectedCost = calculateProjectedCost();
  const expectedCloseRate = conversionRate * 0.3; // 30% of leads that convert will close
  const potentialDeals = Math.round(estimatedLeads * (conversionRate / 100) * 0.3);
  
  // Determine if the current filter combination is optimal
  const isOptimalCombination = (): boolean => {
    const hasIndustries = filters.industries && filters.industries.length > 0;
    const hasHierarchy = filters.hierarchyLevels && filters.hierarchyLevels.length > 0;
    const hasRoles = filters.functionalRoles && filters.functionalRoles.length > 0;
    
    return hasIndustries && hasHierarchy && hasRoles;
  };
  
  const isHighValueCombination = (): boolean => {
    const hasClevel = filters.hierarchyLevels?.includes('C-Level') || 
                      filters.hierarchyLevels?.includes('VP/Diretor');
    const hasTechSaaS = filters.industries?.includes('SaaS') || 
                         filters.industries?.includes('Tecnologia');
    
    return hasClevel && hasTechSaaS;
  };

  return (
    <Card className="sticky top-24">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          Estimativa de Resultados
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="ml-1 text-gray-400 focus:outline-none">
                  <HelpCircle size={14} />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs text-xs">Estimativas baseadas em dados históricos e padrões de comportamento de compra.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </h3>
        
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Users className="text-[#2563EB]" size={18} />
              <p className="text-sm text-gray-600">Leads estimados:</p>
            </div>
            <p className="text-3xl font-bold text-[#2563EB]">
              {estimatedLeads.toLocaleString()}
              <span className="text-sm font-normal text-gray-500 ml-2">(±15%)</span>
            </p>
            
            {isOptimalCombination() && (
              <p className="text-xs text-[#00C4A3] mt-1 flex items-center">
                <CheckCircle size={12} className="mr-1" />
                Boa escolha! Esses filtros têm 28% mais conversão
              </p>
            )}
            
            {isHighValueCombination() && (
              <p className="text-xs text-[#00C4A3] mt-1 flex items-center">
                <TrendingUp size={12} className="mr-1" />
                Combinação de alto valor! Ticket médio potencial de R$15k+
              </p>
            )}
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 space-y-4">
            <div>
              <p className="text-xs text-gray-500">Projeção de Custo:</p>
              <p className="text-lg font-semibold">R$ {projectedCost.toLocaleString()}/mês</p>
            </div>
            
            <div>
              <p className="text-xs text-gray-500">Taxa de Conversão Estimada:</p>
              <p className="text-lg font-semibold">{conversionRate.toFixed(1)}% <span className="text-xs font-normal text-gray-500">(base histórica)</span></p>
            </div>
            
            <div>
              <p className="text-xs text-gray-500">Oportunidades potenciais:</p>
              <p className="text-lg font-semibold">{potentialDeals} <span className="text-xs font-normal text-gray-500">deals/mês</span></p>
            </div>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm font-medium">Filtros aplicados:</p>
            <ul className="text-xs text-gray-600 space-y-1">
              {filters.countries?.length ? (
                <li>Países: {filters.countries.length} selecionados</li>
              ) : null}
              {filters.states?.length ? (
                <li>Estados: {filters.states.length} selecionados</li>
              ) : null}
              {filters.industries?.length ? (
                <li>Indústrias: {filters.industries.length} selecionadas</li>
              ) : null}
              {filters.companySizes?.length ? (
                <li>Tamanhos de empresa: {filters.companySizes.length} selecionados</li>
              ) : null}
              {filters.hierarchyLevels?.length ? (
                <li>Níveis hierárquicos: {filters.hierarchyLevels.length} selecionados</li>
              ) : null}
              {filters.functionalRoles?.length ? (
                <li>Funções: {filters.functionalRoles.length} selecionadas</li>
              ) : null}
              {filters.departments?.length ? (
                <li>Departamentos: {filters.departments.length} selecionados</li>
              ) : null}
              {filters.techStacks?.length ? (
                <li>Tecnologias: {filters.techStacks.length} selecionadas</li>
              ) : null}
              {filters.recentActivities?.length ? (
                <li>Eventos recentes: {filters.recentActivities.length} selecionados</li>
              ) : null}
              {filters.interactions?.length ? (
                <li>Interações: {filters.interactions.length} selecionadas</li>
              ) : null}
              {filters.customTags?.length ? (
                <li>Tags personalizadas: {filters.customTags.length} selecionadas</li>
              ) : null}
            </ul>
          </div>
          
          {Object.values(filters).every(arr => !arr || arr.length === 0) && (
            <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-md p-3 text-amber-700">
              <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
              <p className="text-xs">
                Selecione pelo menos um filtro para obter estimativas mais precisas.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LivePreview;
