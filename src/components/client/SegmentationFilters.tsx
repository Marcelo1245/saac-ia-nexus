
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { Slider } from '@/components/ui/slider';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { IndustrySelector } from '@/components/campaign/IndustrySelector';
import { CompanySizeSelector } from '@/components/campaign/CompanySizeSelector';
import { HierarchyLevelSelector } from '@/components/campaign/HierarchyLevelSelector';
import { FunctionalRoleSelector } from '@/components/campaign/FunctionalRoleSelector';
import { ProspectingFilters } from '@/types/prospecting';
import { toast } from 'sonner';

const SegmentationFilters: React.FC = () => {
  const [filters, setFilters] = useState<Partial<ProspectingFilters>>({
    industries: [],
    companySizes: [],
    annualRevenues: [],
    hierarchyLevels: [],
    functionalRoles: [],
    recentActivities: [],
    interactions: [],
    techStacks: []
  });
  
  const [campaignName, setCampaignName] = useState('');
  const [leadTarget, setLeadTarget] = useState<number[]>([100]);
  const [estimatedLeads, setEstimatedLeads] = useState(750);

  const handleIndustriesChange = (selected: string[]) => {
    setFilters(prev => ({ ...prev, industries: selected }));
    updateEstimate();
  };

  const handleCompanySizesChange = (selected: string[]) => {
    setFilters(prev => ({ ...prev, companySizes: selected }));
    updateEstimate();
  };

  const handleHierarchyLevelsChange = (selected: string[]) => {
    setFilters(prev => ({ ...prev, hierarchyLevels: selected }));
    updateEstimate();
  };

  const handleFunctionalRolesChange = (selected: string[]) => {
    setFilters(prev => ({ ...prev, functionalRoles: selected }));
    updateEstimate();
  };

  const handleAddTechStack = (tech: string) => {
    if (!tech) return;
    const currentTechs = filters.techStacks || [];
    if (!currentTechs.includes(tech)) {
      setFilters(prev => ({ 
        ...prev, 
        techStacks: [...currentTechs, tech]
      }));
      updateEstimate();
    }
  };

  const handleRemoveTechStack = (tech: string) => {
    const currentTechs = filters.techStacks || [];
    setFilters(prev => ({ 
      ...prev, 
      techStacks: currentTechs.filter(t => t !== tech)
    }));
    updateEstimate();
  };

  const handleAddRecentActivity = (activity: string) => {
    if (!activity) return;
    const currentActivities = filters.recentActivities || [];
    if (!currentActivities.includes(activity)) {
      setFilters(prev => ({ 
        ...prev, 
        recentActivities: [...currentActivities, activity]
      }));
      updateEstimate();
    }
  };

  const handleRemoveRecentActivity = (activity: string) => {
    const currentActivities = filters.recentActivities || [];
    setFilters(prev => ({ 
      ...prev, 
      recentActivities: currentActivities.filter(a => a !== activity)
    }));
    updateEstimate();
  };

  const handleAddInteraction = (interaction: string) => {
    if (!interaction) return;
    const currentInteractions = filters.interactions || [];
    if (!currentInteractions.includes(interaction)) {
      setFilters(prev => ({ 
        ...prev, 
        interactions: [...currentInteractions, interaction]
      }));
      updateEstimate();
    }
  };

  const handleRemoveInteraction = (interaction: string) => {
    const currentInteractions = filters.interactions || [];
    setFilters(prev => ({ 
      ...prev, 
      interactions: currentInteractions.filter(i => i !== interaction)
    }));
    updateEstimate();
  };

  const handleLeadTargetChange = (value: number[]) => {
    setLeadTarget(value);
  };

  const updateEstimate = () => {
    // Simulated estimate calculation
    const baseEstimate = 1000;
    const industryFactor = Math.max(0.2, 1 - (filters.industries?.length || 0) * 0.1);
    const sizeFactor = Math.max(0.2, 1 - (filters.companySizes?.length || 0) * 0.1);
    const roleFactor = Math.max(0.2, 1 - (filters.functionalRoles?.length || 0) * 0.1);
    const levelFactor = Math.max(0.2, 1 - (filters.hierarchyLevels?.length || 0) * 0.1);
    
    const newEstimate = Math.round(
      baseEstimate * industryFactor * sizeFactor * roleFactor * levelFactor
    );
    
    setEstimatedLeads(newEstimate);
  };

  const handleSaveCampaign = () => {
    if (!campaignName) {
      toast.error("Por favor, dê um nome à sua campanha.");
      return;
    }

    if (Object.values(filters).every(arr => arr?.length === 0)) {
      toast.error("Por favor, selecione pelo menos um filtro.");
      return;
    }

    // Aqui você salvaria a campanha no banco de dados
    toast.success("Campanha salva com sucesso!");
    
    // Simulação de redirecionamento para dashboard com nova campanha
    setTimeout(() => {
      toast.info("Sua campanha está sendo processada. Em breve você receberá os primeiros leads.");
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="space-y-4">
            <div>
              <Label htmlFor="campaignName">Nome da Campanha</Label>
              <Input
                id="campaignName"
                placeholder="Ex: Prospecção SaaS - Q1 2025"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                className="bg-gray-700 border-gray-600"
              />
            </div>
            
            <Accordion type="multiple" defaultValue={['demographics', 'contacts']} className="w-full">
              <AccordionItem value="demographics" className="border-gray-700">
                <AccordionTrigger className="text-white hover:no-underline">
                  Dados Demográficos da Empresa
                </AccordionTrigger>
                <AccordionContent className="space-y-6 pt-4">
                  <IndustrySelector 
                    selected={filters.industries || []} 
                    onChange={handleIndustriesChange} 
                  />
                  
                  <CompanySizeSelector 
                    selected={filters.companySizes || []} 
                    onChange={handleCompanySizesChange} 
                  />
                  
                  <div className="space-y-3">
                    <div>
                      <Label>Receita Anual</Label>
                      <p className="text-xs text-gray-400 mt-1">
                        Selecione as faixas de receita anual das empresas-alvo.
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                      {['<$1M', '$1M-$10M', '$10M-$50M', '>$50M'].map((revenue) => (
                        <button
                          key={revenue}
                          onClick={() => {
                            const currentRevenues = filters.annualRevenues || [];
                            if (currentRevenues.includes(revenue)) {
                              setFilters(prev => ({
                                ...prev,
                                annualRevenues: currentRevenues.filter(r => r !== revenue)
                              }));
                            } else {
                              setFilters(prev => ({
                                ...prev,
                                annualRevenues: [...currentRevenues, revenue]
                              }));
                            }
                            updateEstimate();
                          }}
                          className={`px-3 py-2 rounded-md text-sm transition-colors ${
                            (filters.annualRevenues || []).includes(revenue)
                              ? 'bg-saac-blue text-white'
                              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          }`}
                        >
                          {revenue}
                        </button>
                      ))}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="contacts" className="border-gray-700">
                <AccordionTrigger className="text-white hover:no-underline">
                  Filtros de Contato
                </AccordionTrigger>
                <AccordionContent className="space-y-6 pt-4">
                  <HierarchyLevelSelector 
                    selected={filters.hierarchyLevels || []} 
                    onChange={handleHierarchyLevelsChange} 
                  />
                  
                  <FunctionalRoleSelector 
                    selected={filters.functionalRoles || []} 
                    onChange={handleFunctionalRolesChange} 
                  />
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="engagement" className="border-gray-700">
                <AccordionTrigger className="text-white hover:no-underline">
                  Critérios de Engajamento
                </AccordionTrigger>
                <AccordionContent className="space-y-6 pt-4">
                  <div className="space-y-3">
                    <div>
                      <Label>Atividades Recentes</Label>
                      <p className="text-xs text-gray-400 mt-1">
                        Selecione as atividades recentes que os contatos devem ter realizado.
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      {(filters.recentActivities || []).length > 0 ? (
                        (filters.recentActivities || []).map(activity => (
                          <Badge 
                            key={activity} 
                            variant="secondary"
                            className="bg-saac-blue/20 text-saac-blue hover:bg-saac-blue/30 px-2 py-1"
                          >
                            {activity}
                            <button 
                              className="ml-1 hover:text-white" 
                              onClick={() => handleRemoveRecentActivity(activity)}
                            >
                              ×
                            </button>
                          </Badge>
                        ))
                      ) : (
                        <div className="text-sm text-gray-400">Nenhuma atividade selecionada</div>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      {['Postou conteúdo', 'Mudou de cargo', 'Contratou', 'Promovido', 'Aniversário de empresa'].map(activity => (
                        <button
                          key={activity}
                          onClick={() => handleAddRecentActivity(activity)}
                          className="px-3 py-2 rounded-md text-sm bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors"
                        >
                          {activity}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <Label>Interações com Sua Empresa</Label>
                      <p className="text-xs text-gray-400 mt-1">
                        Selecione as interações que os contatos devem ter tido com sua empresa.
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      {(filters.interactions || []).length > 0 ? (
                        (filters.interactions || []).map(interaction => (
                          <Badge 
                            key={interaction} 
                            variant="secondary"
                            className="bg-saac-blue/20 text-saac-blue hover:bg-saac-blue/30 px-2 py-1"
                          >
                            {interaction}
                            <button 
                              className="ml-1 hover:text-white" 
                              onClick={() => handleRemoveInteraction(interaction)}
                            >
                              ×
                            </button>
                          </Badge>
                        ))
                      ) : (
                        <div className="text-sm text-gray-400">Nenhuma interação selecionada</div>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {['Visitou website', 'Download whitepaper', 'Assistiu webinar', 'Participou de evento', 'Abriu e-mail', 'Clicou em anúncio'].map(interaction => (
                        <button
                          key={interaction}
                          onClick={() => handleAddInteraction(interaction)}
                          className="px-3 py-2 rounded-md text-sm bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors"
                        >
                          {interaction}
                        </button>
                      ))}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="technographics" className="border-gray-700">
                <AccordionTrigger className="text-white hover:no-underline">
                  Tecnologias Utilizadas (Technographics)
                </AccordionTrigger>
                <AccordionContent className="space-y-6 pt-4">
                  <div className="space-y-3">
                    <div>
                      <Label>Stack Tecnológico</Label>
                      <p className="text-xs text-gray-400 mt-1">
                        Selecione as tecnologias que as empresas-alvo devem utilizar.
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      {(filters.techStacks || []).length > 0 ? (
                        (filters.techStacks || []).map(tech => (
                          <Badge 
                            key={tech} 
                            variant="secondary"
                            className="bg-saac-blue/20 text-saac-blue hover:bg-saac-blue/30 px-2 py-1"
                          >
                            {tech}
                            <button 
                              className="ml-1 hover:text-white" 
                              onClick={() => handleRemoveTechStack(tech)}
                            >
                              ×
                            </button>
                          </Badge>
                        ))
                      ) : (
                        <div className="text-sm text-gray-400">Nenhuma tecnologia selecionada</div>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                      {['Salesforce', 'HubSpot', 'Zapier', 'Marketo', 'Adobe', 'SAP', 'Oracle', 'Zendesk'].map(tech => (
                        <button
                          key={tech}
                          onClick={() => handleAddTechStack(tech)}
                          className="px-3 py-2 rounded-md text-sm bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors"
                        >
                          {tech}
                        </button>
                      ))}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
        
        <div>
          <Card className="bg-gray-800 border-gray-700 sticky top-24">
            <CardHeader>
              <CardTitle className="text-white">Resumo da Segmentação</CardTitle>
              <CardDescription>Estatísticas estimadas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Total de Leads Estimados:</span>
                  <span className="text-xl font-bold text-saac-blue">{estimatedLeads.toLocaleString()}</span>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Meta de Leads:</span>
                    <span className="text-white">{leadTarget[0]}</span>
                  </div>
                  <Slider
                    defaultValue={[100]}
                    max={500}
                    min={10}
                    step={10}
                    value={leadTarget}
                    onValueChange={handleLeadTargetChange}
                    className="my-4"
                  />
                </div>
                
                <div className="text-xs text-gray-400">
                  Filtragem: {Math.round((leadTarget[0] / estimatedLeads) * 100)}% do universo disponível
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-white font-medium">Filtros Aplicados:</h3>
                <div className="space-y-1">
                  {(filters.industries || []).length > 0 && (
                    <div className="text-xs">
                      <span className="text-gray-400">Indústrias:</span> <span className="text-white">{filters.industries?.length}</span>
                    </div>
                  )}
                  {(filters.companySizes || []).length > 0 && (
                    <div className="text-xs">
                      <span className="text-gray-400">Tamanhos de Empresa:</span> <span className="text-white">{filters.companySizes?.length}</span>
                    </div>
                  )}
                  {(filters.annualRevenues || []).length > 0 && (
                    <div className="text-xs">
                      <span className="text-gray-400">Faixas de Receita:</span> <span className="text-white">{filters.annualRevenues?.length}</span>
                    </div>
                  )}
                  {(filters.hierarchyLevels || []).length > 0 && (
                    <div className="text-xs">
                      <span className="text-gray-400">Níveis Hierárquicos:</span> <span className="text-white">{filters.hierarchyLevels?.length}</span>
                    </div>
                  )}
                  {(filters.functionalRoles || []).length > 0 && (
                    <div className="text-xs">
                      <span className="text-gray-400">Funções:</span> <span className="text-white">{filters.functionalRoles?.length}</span>
                    </div>
                  )}
                  {(filters.recentActivities || []).length > 0 && (
                    <div className="text-xs">
                      <span className="text-gray-400">Atividades Recentes:</span> <span className="text-white">{filters.recentActivities?.length}</span>
                    </div>
                  )}
                  {(filters.interactions || []).length > 0 && (
                    <div className="text-xs">
                      <span className="text-gray-400">Interações:</span> <span className="text-white">{filters.interactions?.length}</span>
                    </div>
                  )}
                  {(filters.techStacks || []).length > 0 && (
                    <div className="text-xs">
                      <span className="text-gray-400">Tecnologias:</span> <span className="text-white">{filters.techStacks?.length}</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-saac-blue hover:bg-blue-700"
                onClick={handleSaveCampaign}
              >
                Salvar e Iniciar Campanha
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SegmentationFilters;
