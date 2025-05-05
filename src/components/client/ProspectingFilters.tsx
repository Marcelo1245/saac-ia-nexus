
import React, { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { IndustrySelector } from '@/components/campaign/IndustrySelector';
import { CompanySizeSelector } from '@/components/campaign/CompanySizeSelector';
import { HierarchyLevelSelector } from '@/components/campaign/HierarchyLevelSelector';
import { FunctionalRoleSelector } from '@/components/campaign/FunctionalRoleSelector';
import { ProspectingFilters as ProspectingFiltersType, Industry, CompanySize, HierarchyLevel, FunctionalRole, RecentActivity, Interaction, TechStack } from '@/types/prospecting';
import { Building, Users, Zap, Info } from 'lucide-react';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

interface ProspectingFiltersProps {
  onFiltersChange: (filters: Partial<ProspectingFiltersType>) => void;
  onCampaignNameChange: (name: string) => void;
  initialFilters?: Partial<ProspectingFiltersType>;
  initialCampaignName?: string;
}

const ProspectingFilters: React.FC<ProspectingFiltersProps> = ({ 
  onFiltersChange, 
  onCampaignNameChange,
  initialFilters,
  initialCampaignName
}) => {
  const [filters, setFilters] = useState<Partial<ProspectingFiltersType>>(initialFilters || {
    industries: [],
    companySizes: [],
    hierarchyLevels: [],
    functionalRoles: [],
    techStacks: [],
    recentActivities: [],
    interactions: [],
    annualRevenues: []
  });
  
  const [campaignName, setCampaignName] = useState(initialCampaignName || '');
  const [techInput, setTechInput] = useState('');
  const [topicInput, setTopicInput] = useState('');
  
  useEffect(() => {
    onFiltersChange(filters);
  }, [filters, onFiltersChange]);
  
  useEffect(() => {
    onCampaignNameChange(campaignName);
  }, [campaignName, onCampaignNameChange]);

  const handleIndustriesChange = (selected: string[]) => {
    setFilters(prev => ({ 
      ...prev, 
      industries: selected as Industry[] 
    }));
  };

  const handleCompanySizesChange = (selected: string[]) => {
    setFilters(prev => ({ 
      ...prev, 
      companySizes: selected as CompanySize[] 
    }));
  };

  const handleHierarchyLevelsChange = (selected: string[]) => {
    setFilters(prev => ({ 
      ...prev, 
      hierarchyLevels: selected as HierarchyLevel[] 
    }));
  };

  const handleFunctionalRolesChange = (selected: string[]) => {
    setFilters(prev => ({ 
      ...prev, 
      functionalRoles: selected as FunctionalRole[] 
    }));
  };
  
  const handleAddTech = () => {
    if (!techInput.trim()) return;
    
    const techToAdd = techInput.trim() as TechStack;
    const currentTechs = filters.techStacks || [];
    
    if (!currentTechs.includes(techToAdd)) {
      setFilters(prev => ({
        ...prev,
        techStacks: [...currentTechs, techToAdd]
      }));
    }
    
    setTechInput('');
  };
  
  const handleRemoveTech = (tech: TechStack) => {
    const currentTechs = filters.techStacks || [];
    setFilters(prev => ({
      ...prev,
      techStacks: currentTechs.filter(t => t !== tech)
    }));
  };
  
  const handleAddTopic = () => {
    if (!topicInput.trim()) return;
    
    const topicToAdd = topicInput.trim() as Interaction;
    const currentTopics = filters.interactions || [];
    
    if (!currentTopics.includes(topicToAdd)) {
      setFilters(prev => ({
        ...prev,
        interactions: [...currentTopics, topicToAdd]
      }));
    }
    
    setTopicInput('');
  };
  
  const handleRemoveTopic = (topic: Interaction) => {
    const currentTopics = filters.interactions || [];
    setFilters(prev => ({
      ...prev,
      interactions: currentTopics.filter(t => t !== topic)
    }));
  };
  
  const handleGrowthRateChange = (rate: string) => {
    const revenueGrowthRates = filters.annualRevenues || [];
    
    if (revenueGrowthRates.includes(rate as any)) {
      setFilters(prev => ({
        ...prev,
        annualRevenues: revenueGrowthRates.filter(r => r !== rate as any)
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        annualRevenues: [...revenueGrowthRates, rate as any]
      }));
    }
  };
  
  const handleRecentActivityChange = (activity: RecentActivity) => {
    const currentActivities = filters.recentActivities || [];
    
    if (currentActivities.includes(activity)) {
      setFilters(prev => ({
        ...prev,
        recentActivities: currentActivities.filter(a => a !== activity)
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        recentActivities: [...currentActivities, activity]
      }));
    }
  };
  
  const handleCampaignNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCampaignName(e.target.value);
  };

  // Predefined options for growth rates
  const growthRateOptions = [
    { id: '>10%', label: '>10% ao ano' },
    { id: '>20%', label: '>20% ao ano' },
    { id: '>30%', label: '>30% ao ano' }
  ];
  
  // Predefined options for recent activities
  const recentActivityOptions: { id: RecentActivity; label: string; tooltip?: string }[] = [
    { id: 'Mudou de cargo', label: 'Mudança de cargo', tooltip: 'Pessoas que mudaram de cargo nos últimos 90 dias' },
    { id: 'Contratou', label: 'Contratações recentes', tooltip: 'Empresas que fizeram contratações nos últimos 60 dias' },
    { id: 'Promovido', label: 'Promoção recente', tooltip: 'Profissionais promovidos nos últimos 90 dias' }
  ];

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <Label htmlFor="campaignName" className="text-sm font-medium">Nome da Campanha</Label>
        <Input
          id="campaignName"
          value={campaignName}
          onChange={handleCampaignNameChange}
          placeholder="Ex: Prospecção SaaS Q2 2025"
          className="mt-1"
        />
      </div>
      
      <Tabs defaultValue="company" className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="company" className="flex items-center gap-2">
            <Building size={16} />
            <span className="hidden sm:inline">Empresa</span>
          </TabsTrigger>
          <TabsTrigger value="contacts" className="flex items-center gap-2">
            <Users size={16} />
            <span className="hidden sm:inline">Contatos</span>
          </TabsTrigger>
          <TabsTrigger value="engagement" className="flex items-center gap-2">
            <Zap size={16} />
            <span className="hidden sm:inline">Engajamento</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="company" className="space-y-6">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Label className="text-sm font-medium">Indústrias</Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info size={14} className="text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-60 text-xs">
                      Selecione indústrias específicas para sua campanha. Quanto mais focado, melhores os resultados.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <IndustrySelector 
                selected={filters.industries || []} 
                onChange={handleIndustriesChange}
              />
            </div>
            
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Label className="text-sm font-medium">Tamanho da Empresa</Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info size={14} className="text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-60 text-xs">
                      Selecione os tamanhos de empresa ideais para seu produto ou serviço.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <CompanySizeSelector 
                selected={filters.companySizes || []} 
                onChange={handleCompanySizesChange}
              />
            </div>
            
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Label className="text-sm font-medium">Tecnologias Utilizadas</Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info size={14} className="text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-60 text-xs">
                      Tecnologias que as empresas-alvo já utilizam, ajudando a identificar fit com sua solução.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              
              <div className="flex gap-2 mb-3">
                <Input
                  placeholder="Ex: CRM, ERP, Salesforce..."
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddTech()}
                />
                <Button 
                  type="button" 
                  onClick={handleAddTech}
                  className="shrink-0"
                >
                  Adicionar
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {(filters.techStacks || []).length > 0 ? 
                  (filters.techStacks || []).map(tech => (
                    <Badge 
                      key={tech} 
                      variant="outline"
                      className="flex items-center gap-1 px-2 py-1 text-sm"
                    >
                      {tech}
                      <button 
                        type="button"
                        onClick={() => handleRemoveTech(tech)}
                        className="text-gray-500 hover:text-gray-700 ml-1 rounded-full h-4 w-4 flex items-center justify-center"
                      >
                        ×
                      </button>
                    </Badge>
                  )) : 
                  <p className="text-sm text-gray-500">Nenhuma tecnologia selecionada</p>
                }
              </div>
            </div>
            
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Label className="text-sm font-medium">Crescimento Anual</Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info size={14} className="text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-60 text-xs">
                      Empresas com estas taxas de crescimento nos últimos 12 meses.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {growthRateOptions.map(option => (
                  <Button
                    key={option.id}
                    type="button"
                    variant={filters.annualRevenues?.includes(option.id as any) ? "default" : "outline"}
                    className={filters.annualRevenues?.includes(option.id as any) ? 
                      "bg-[#7B2DFF] hover:bg-[#6620d9]" : 
                      "hover:bg-gray-100"
                    }
                    onClick={() => handleGrowthRateChange(option.id)}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="contacts" className="space-y-6">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Label className="text-sm font-medium">Nível Hierárquico</Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info size={14} className="text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-60 text-xs">
                      C-Level tem 3x mais chances de fechamento, mas ciclos de venda mais longos.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <HierarchyLevelSelector 
                selected={filters.hierarchyLevels || []} 
                onChange={handleHierarchyLevelsChange}
              />
            </div>
            
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Label className="text-sm font-medium">Departamentos</Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info size={14} className="text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-60 text-xs">
                      Selecione departamentos com maior fit para sua solução.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <FunctionalRoleSelector 
                selected={filters.functionalRoles || []} 
                onChange={handleFunctionalRolesChange}
              />
            </div>
            
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Label className="text-sm font-medium">Eventos Recentes</Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info size={14} className="text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-60 text-xs">
                      Mudanças profissionais recentes geralmente significam novas oportunidades de negócio.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {recentActivityOptions.map(option => (
                  <Tooltip key={option.id}>
                    <TooltipTrigger asChild>
                      <Button
                        type="button"
                        variant={filters.recentActivities?.includes(option.id) ? "default" : "outline"}
                        className={filters.recentActivities?.includes(option.id) ? 
                          "bg-[#7B2DFF] hover:bg-[#6620d9] w-full justify-start" : 
                          "hover:bg-gray-100 w-full justify-start"
                        }
                        onClick={() => handleRecentActivityChange(option.id)}
                      >
                        {option.label}
                      </Button>
                    </TooltipTrigger>
                    {option.tooltip && (
                      <TooltipContent>
                        <p className="w-60 text-xs">{option.tooltip}</p>
                      </TooltipContent>
                    )}
                  </Tooltip>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="engagement" className="space-y-6">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Label className="text-sm font-medium">Interação com sua marca</Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info size={14} className="text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-60 text-xs">
                      Leads que já interagiram com sua marca têm taxas de conversão mais altas.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                {[
                  { id: 'Visitou website', label: 'Visitou website' },
                  { id: 'Download whitepaper', label: 'Download de material' },
                  { id: 'Assistiu webinar', label: 'Assistiu webinar' },
                  { id: 'Participou de evento', label: 'Participou de evento' }
                ].map(option => (
                  <Button
                    key={option.id}
                    type="button"
                    variant={filters.interactions?.includes(option.id as Interaction) ? "default" : "outline"}
                    className={filters.interactions?.includes(option.id as Interaction) ? 
                      "bg-[#7B2DFF] hover:bg-[#6620d9]" : 
                      "hover:bg-gray-100"
                    }
                    onClick={() => {
                      const current = filters.interactions || [];
                      if (current.includes(option.id as Interaction)) {
                        setFilters(prev => ({
                          ...prev,
                          interactions: current.filter(i => i !== option.id as Interaction)
                        }));
                      } else {
                        setFilters(prev => ({
                          ...prev,
                          interactions: [...current, option.id as Interaction]
                        }));
                      }
                    }}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>
            
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Label className="text-sm font-medium">Tópicos de Interesse</Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info size={14} className="text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-60 text-xs">
                      Adicione tópicos relevantes para sua oferta para encontrar leads com interesses alinhados.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              
              <div className="flex gap-2 mb-3">
                <Input
                  placeholder="Ex: IA, Automação, Growth..."
                  value={topicInput}
                  onChange={(e) => setTopicInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddTopic()}
                />
                <Button 
                  type="button" 
                  onClick={handleAddTopic}
                  className="shrink-0"
                >
                  Adicionar
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {(filters.interactions || []).filter(i => 
                  !['Visitou website', 'Download whitepaper', 'Assistiu webinar', 'Participou de evento'].includes(i)
                ).length > 0 ? 
                  (filters.interactions || []).filter(i => 
                    !['Visitou website', 'Download whitepaper', 'Assistiu webinar', 'Participou de evento'].includes(i)
                  ).map(topic => (
                    <Badge 
                      key={topic} 
                      variant="outline"
                      className="flex items-center gap-1 px-2 py-1 text-sm"
                    >
                      {topic}
                      <button 
                        type="button"
                        onClick={() => handleRemoveTopic(topic)}
                        className="text-gray-500 hover:text-gray-700 ml-1 rounded-full h-4 w-4 flex items-center justify-center"
                      >
                        ×
                      </button>
                    </Badge>
                  )) : 
                  <p className="text-sm text-gray-500">Nenhum tópico adicionado</p>
                }
              </div>
              
              <div className="mt-6 p-3 bg-[#00F5A0]/10 rounded-lg text-sm">
                <p className="font-medium text-gray-700">💡 Dica de engajamento</p>
                <p className="text-gray-600 mt-1">
                  Campanhas com 3-5 tópicos de interesse têm 28% mais engajamento. Considere adicionar tópicos relevantes para sua persona.
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProspectingFilters;
