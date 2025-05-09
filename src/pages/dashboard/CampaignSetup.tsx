import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ProspectingFilters, CampaignTemplate } from '@/types/prospecting';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { IndustrySelector } from '@/components/campaign/IndustrySelector';
import { CompanySizeSelector } from '@/components/campaign/CompanySizeSelector';
import { HierarchyLevelSelector } from '@/components/campaign/HierarchyLevelSelector';
import { FunctionalRoleSelector } from '@/components/campaign/FunctionalRoleSelector';
import { PredictedResults } from '@/components/campaign/PredictedResults';

// Fix the mock data structure to conform to our updated CampaignTemplate interface
const mockTemplates: CampaignTemplate[] = [
  {
    id: 'template1',
    name: 'Growth Hack SaaS B2B',
    description: 'Ideal para empresas de SaaS buscando crescimento rápido no mercado B2B',
    filters: {},
    createdAt: new Date().toISOString(),
    targetIndustries: ['SaaS', 'Fintech', 'E-commerce'],
    targetRoles: ['Marketing', 'Vendas'],
    presetFilters: {
      industries: ['SaaS', 'Fintech'],
      hierarchyLevels: ['VP/Diretor', 'Gerente'],
      functionalRoles: ['Marketing', 'Vendas']
    },
    conversionRate: 12.5,
    recommendedMessages: [
      {
        subject: 'Aumente suas vendas em 30% com automação',
        body: 'Olá {{primeiro_nome}}, notei que sua empresa {{empresa}} está expandindo...'
      }
    ]
  },
  {
    id: 'template2',
    name: 'Expansão para Varejo',
    description: 'Estratégia focada em empresas de varejo buscando soluções tecnológicas',
    filters: {},
    createdAt: new Date().toISOString(),
    targetIndustries: ['E-commerce', 'Retail'],
    targetRoles: ['TI', 'Operações'],
    presetFilters: {
      industries: ['E-commerce', 'Retail'],
      hierarchyLevels: ['C-Level', 'VP/Diretor'],
      functionalRoles: ['TI', 'Operações']
    },
    conversionRate: 8.3,
    recommendedMessages: [
      {
        subject: 'Solução completa para o varejo moderno',
        body: 'Olá {{primeiro_nome}}, vi que o {{empresa}} está buscando inovação no atendimento...'
      }
    ]
  }
];

const CampaignSetup: React.FC = () => {
  const [campaignName, setCampaignName] = useState('');
  const [campaignDescription, setCampaignDescription] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [currentStep, setCurrentStep] = useState(1);
  
  // Estado para os filtros
  const [filters, setFilters] = useState<Partial<ProspectingFilters>>({
    industries: [],
    companySizes: [],
    hierarchyLevels: [],
    functionalRoles: []
  });

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    const template = mockTemplates.find(t => t.id === templateId);
    
    if (template) {
      setCampaignName(template.name);
      setCampaignDescription(template.description);
      
      // Aplicar filtros pré-configurados do template
      if (template.presetFilters) {
        setFilters(prev => ({
          ...prev,
          ...template.presetFilters
        }));
      }
    }
  };

  const handleIndustriesChange = (selected: string[]) => {
    setFilters(prev => ({
      ...prev,
      industries: selected as any[]
    }));
  };

  const handleCompanySizesChange = (selected: string[]) => {
    setFilters(prev => ({
      ...prev,
      companySizes: selected as any[]
    }));
  };

  const handleHierarchyLevelsChange = (selected: string[]) => {
    setFilters(prev => ({
      ...prev,
      hierarchyLevels: selected as any[]
    }));
  };

  const handleFunctionalRolesChange = (selected: string[]) => {
    setFilters(prev => ({
      ...prev,
      functionalRoles: selected as any[]
    }));
  };

  const handleNextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };

  const handlePreviousStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSaveCampaign = () => {
    // Aqui seria feita a requisição para salvar a campanha
    console.log('Campanha salva', { campaignName, campaignDescription, filters });
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Configurar Campanha</h1>
        <p className="text-gray-400">
          Configure sua campanha de prospecção com filtros avançados.
        </p>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-white">Nova Campanha</CardTitle>
              <CardDescription className="text-gray-400">
                Passo {currentStep} de 3: {currentStep === 1 ? 'Informações Básicas' : currentStep === 2 ? 'Segmentação' : 'Previsão de Resultados'}
              </CardDescription>
            </div>
            <div className="flex items-center gap-1">
              {[1, 2, 3].map((step) => (
                <div 
                  key={step}
                  className={`w-2 h-2 rounded-full ${
                    step === currentStep 
                      ? 'bg-saac-blue' 
                      : step < currentStep 
                      ? 'bg-saac-blue opacity-50' 
                      : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="campaignName">Nome da Campanha</Label>
                  <Input
                    id="campaignName"
                    value={campaignName}
                    onChange={(e) => setCampaignName(e.target.value)}
                    className="bg-gray-700 border-gray-600"
                    placeholder="Ex: Prospecção Q3 2023"
                  />
                </div>
                
                <div>
                  <Label htmlFor="campaignDescription">Descrição</Label>
                  <Input
                    id="campaignDescription"
                    value={campaignDescription}
                    onChange={(e) => setCampaignDescription(e.target.value)}
                    className="bg-gray-700 border-gray-600"
                    placeholder="Objetivo e estratégia da campanha"
                  />
                </div>
                
                <div>
                  <Label>Template (opcional)</Label>
                  <Select value={selectedTemplate} onValueChange={handleTemplateSelect}>
                    <SelectTrigger className="bg-gray-700 border-gray-600">
                      <SelectValue placeholder="Selecione um template pré-configurado" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockTemplates.map((template) => (
                        <SelectItem key={template.id} value={template.id}>
                          {template.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-400 mt-1">
                    Templates aplicam configurações pré-otimizadas para cenários específicos.
                  </p>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button onClick={handleNextStep} className="bg-saac-blue hover:bg-blue-700">
                  Próximo
                </Button>
              </div>
            </div>
          )}
          
          {currentStep === 2 && (
            <div className="space-y-6">
              <Tabs defaultValue="demographic">
                <TabsList className="grid grid-cols-4">
                  <TabsTrigger value="demographic">Demografia</TabsTrigger>
                  <TabsTrigger value="engagement">Engajamento</TabsTrigger>
                  <TabsTrigger value="tech">Tecnologias</TabsTrigger>
                  <TabsTrigger value="contact">Contato</TabsTrigger>
                </TabsList>
                
                <TabsContent value="demographic" className="space-y-4 pt-4">
                  <IndustrySelector 
                    selected={filters.industries || []}
                    onChange={handleIndustriesChange}
                  />
                  
                  <CompanySizeSelector 
                    selected={filters.companySizes || []}
                    onChange={handleCompanySizesChange}
                  />
                </TabsContent>
                
                <TabsContent value="engagement" className="pt-4">
                  <div className="p-8 text-center text-gray-400">
                    Filtros de engajamento serão disponibilizados em breve.
                  </div>
                </TabsContent>
                
                <TabsContent value="tech" className="pt-4">
                  <div className="p-8 text-center text-gray-400">
                    Filtros de tecnologias serão disponibilizados em breve.
                  </div>
                </TabsContent>
                
                <TabsContent value="contact" className="space-y-4 pt-4">
                  <HierarchyLevelSelector 
                    selected={filters.hierarchyLevels || []}
                    onChange={handleHierarchyLevelsChange}
                  />
                  
                  <FunctionalRoleSelector 
                    selected={filters.functionalRoles || []}
                    onChange={handleFunctionalRolesChange}
                  />
                </TabsContent>
              </Tabs>
              
              <div className="flex justify-between">
                <Button 
                  onClick={handlePreviousStep} 
                  variant="outline"
                  className="border-gray-600 text-white hover:bg-gray-700"
                >
                  Voltar
                </Button>
                <Button onClick={handleNextStep} className="bg-saac-blue hover:bg-blue-700">
                  Próximo
                </Button>
              </div>
            </div>
          )}
          
          {currentStep === 3 && (
            <div className="space-y-6">
              <PredictedResults filters={filters} />
              
              <div className="flex justify-between">
                <Button 
                  onClick={handlePreviousStep} 
                  variant="outline"
                  className="border-gray-600 text-white hover:bg-gray-700"
                >
                  Voltar
                </Button>
                <Button 
                  onClick={handleSaveCampaign} 
                  className="bg-saac-blue hover:bg-blue-700"
                >
                  Salvar Campanha
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CampaignSetup;
