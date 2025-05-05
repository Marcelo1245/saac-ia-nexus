
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Link, Navigate } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import ProspectingFilters from '@/components/client/ProspectingFilters';
import ConfettiEffect from '@/components/client/ConfettiEffect';
import { useAuth } from '@/contexts/AuthContext';
import { Save, Download, Send, AlertCircle, Shield, Info, Mail, HelpCircle } from 'lucide-react';
import { toast } from 'sonner';
import { ProspectingFilters as ProspectingFiltersType } from '@/types/prospecting';

const ClientArea: React.FC = () => {
  const [activeTab, setActiveTab] = useState("company");
  const [step, setStep] = useState<'filters' | 'preview' | 'sent'>('filters');
  const [estimatedLeads, setEstimatedLeads] = useState(347);
  const [filters, setFilters] = useState<Partial<ProspectingFiltersType>>({});
  const [campaignName, setCampaignName] = useState<string>('');
  const [showConfetti, setShowConfetti] = useState(false);
  
  // Load saved filters from localStorage on component mount
  useEffect(() => {
    const savedFilters = localStorage.getItem('prospectingFilters');
    if (savedFilters) {
      try {
        setFilters(JSON.parse(savedFilters));
      } catch (error) {
        console.error('Error loading saved filters:', error);
      }
    }
    
    const savedCampaignName = localStorage.getItem('campaignName');
    if (savedCampaignName) {
      setCampaignName(savedCampaignName);
    }
  }, []);

  // Save filters to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('prospectingFilters', JSON.stringify(filters));
  }, [filters]);
  
  // Save campaign name to localStorage when it changes
  useEffect(() => {
    if (campaignName) {
      localStorage.setItem('campaignName', campaignName);
    }
  }, [campaignName]);

  const handleFiltersChange = (newFilters: Partial<ProspectingFiltersType>) => {
    setFilters(newFilters);
    
    // Simulated lead count calculation based on filter complexity
    const industriesCount = newFilters.industries?.length || 0;
    const companySizesCount = newFilters.companySizes?.length || 0;
    const hierarchyLevelsCount = newFilters.hierarchyLevels?.length || 0;
    const functionalRolesCount = newFilters.functionalRoles?.length || 0;
    
    // Base count minus 15% for each active filter category
    let estimate = 2500;
    if (industriesCount > 0) estimate = estimate * 0.85;
    if (companySizesCount > 0) estimate = estimate * 0.75;
    if (hierarchyLevelsCount > 0) estimate = estimate * 0.65;
    if (functionalRolesCount > 0) estimate = estimate * 0.70;
    
    // Add some randomness for realism
    const variance = Math.floor(estimate * 0.15);
    const finalEstimate = Math.floor(estimate + (Math.random() * variance * 2 - variance));
    
    setEstimatedLeads(finalEstimate);
  };

  const handleCampaignNameChange = (name: string) => {
    setCampaignName(name);
  };

  const handleExportFilters = () => {
    const dataStr = JSON.stringify(filters, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `${campaignName || 'saac-campaign'}-filters.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    toast.success("Filtros exportados com sucesso!");
  };

  const handleSubmit = () => {
    // In a real app, this would send data to your API
    if (!campaignName) {
      toast.error("Por favor, dê um nome à sua campanha.");
      return;
    }
    
    if (Object.values(filters).every(arr => !arr || arr.length === 0)) {
      toast.error("Por favor, selecione pelo menos um filtro.");
      return;
    }
    
    // Simulate API call
    setStep('sent');
    setShowConfetti(true);
    
    // Generate random campaign ID
    const campaignId = `SAAC-${Math.floor(100 + Math.random() * 900)}`;
    
    toast.success(`Solicitação #${campaignId} enviada com sucesso!`);
    
    // Clear localStorage after successful submission
    localStorage.removeItem('prospectingFilters');
    localStorage.removeItem('campaignName');
    
    // Hide confetti after a few seconds
    setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
  };

  const handleScheduleCall = () => {
    toast.success("Agendamento de call solicitado. Nossa equipe entrará em contato em breve!");
  };

  return (
    <div className="min-h-screen bg-white pt-20 pb-16">
      <ConfettiEffect active={showConfetti} />
      
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Segmentação de Leads</h1>
          <p className="text-gray-600">Configure os filtros para encontrar os leads ideais para sua campanha</p>
        </div>

        {step === 'filters' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <ProspectingFilters 
                    onFiltersChange={handleFiltersChange} 
                    onCampaignNameChange={handleCampaignNameChange}
                    initialFilters={filters}
                    initialCampaignName={campaignName}
                  />
                </CardContent>
              </Card>
              
              <div className="mt-6 flex flex-wrap gap-4">
                <Button 
                  variant="outline" 
                  onClick={handleExportFilters}
                  className="flex items-center gap-2"
                >
                  <Download size={16} />
                  Exportar Filtros
                </Button>
                
                <Button 
                  className="bg-[#7B2DFF] hover:bg-[#6620d9] text-white ml-auto flex items-center gap-2"
                  onClick={() => setStep('preview')}
                >
                  Avançar para Pré-visualização
                </Button>
              </div>
            </div>
            
            <div>
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Estimativa de Resultados</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500">Leads estimados:</p>
                      <p className="text-3xl font-bold text-[#7B2DFF]">
                        {estimatedLeads.toLocaleString()}
                        <span className="text-sm font-normal text-gray-500 ml-2">(±15%)</span>
                      </p>
                      
                      {estimatedLeads > 500 && (
                        <p className="text-xs text-[#00F5A0] mt-1">
                          ✨ Boa escolha! Esses filtros têm 28% mais conversão
                        </p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Filtros aplicados:</p>
                      <ul className="text-xs text-gray-600 space-y-1">
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
                          <li>Departamentos: {filters.functionalRoles.length} selecionados</li>
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
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {step === 'preview' && (
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Pré-visualização de Leads</h2>
                <p className="text-sm text-gray-500 mb-6">
                  Veja exemplos de leads que sua campanha irá alcançar com os filtros selecionados.
                </p>
                
                <div className="space-y-4">
                  {[
                    {
                      name: "Marcos Silva",
                      position: "Diretor de Tecnologia",
                      company: "TechBrasil Solutions",
                      industry: "SaaS",
                      size: "51-200",
                      level: "VP/Diretor",
                      department: "TI",
                      score: 87
                    },
                    {
                      name: "Ana Carolina Mendes",
                      position: "CEO",
                      company: "Inovação Digital",
                      industry: "Tecnologia",
                      size: "11-50",
                      level: "C-Level",
                      department: "Executivo",
                      score: 92
                    },
                    {
                      name: "Rafael Oliveira",
                      position: "Gerente de Marketing",
                      company: "Market Connect",
                      industry: "Marketing",
                      size: "51-200",
                      level: "Gerente",
                      department: "Marketing",
                      score: 78
                    }
                  ].map((lead, index) => (
                    <div key={index} className="border rounded-lg p-4 flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold">
                        {lead.name.charAt(0)}{lead.name.split(' ')[1]?.charAt(0)}
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-semibold">{lead.name}</h3>
                        <p className="text-sm text-gray-600">{lead.position} • {lead.company}</p>
                        
                        <div className="flex flex-wrap gap-2 mt-2">
                          <span className="text-xs bg-gray-100 rounded-full px-2 py-1">{lead.industry}</span>
                          <span className="text-xs bg-gray-100 rounded-full px-2 py-1">{lead.size} funcionários</span>
                          <span className="text-xs bg-gray-100 rounded-full px-2 py-1">{lead.level}</span>
                          <span className="text-xs bg-gray-100 rounded-full px-2 py-1">{lead.department}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          lead.score >= 90 ? 'bg-[#00F5A0]/20 text-[#00AA70]' :
                          lead.score >= 80 ? 'bg-[#7B2DFF]/20 text-[#7B2DFF]' :
                          'bg-blue-100 text-blue-600'
                        }`}>
                          <span className="text-sm font-bold">{lead.score}</span>
                        </div>
                        <span className="text-xs mt-1">Score</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => setStep('filters')}
              >
                Voltar para Filtros
              </Button>
              
              <Button 
                className="bg-[#7B2DFF] hover:bg-[#6620d9] text-white flex items-center gap-2"
                onClick={handleSubmit}
              >
                <Send size={16} />
                Enviar para Nossa Equipe
              </Button>
            </div>
          </div>
        )}
        
        {step === 'sent' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-[#00F5A0]/20 rounded-full flex items-center justify-center">
                <div className="w-16 h-16 bg-[#00F5A0]/40 rounded-full flex items-center justify-center">
                  <div className="w-12 h-12 bg-[#00F5A0] rounded-full flex items-center justify-center text-white">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Solicitação enviada com sucesso!</h2>
              <p className="text-gray-600">
                Nossa equipe analisará seus filtros e entrará em contato em breve com os resultados.
              </p>
            </div>
            
            <Alert className="bg-[#7B2DFF]/10 border-[#7B2DFF]/20">
              <AlertTitle className="text-[#7B2DFF]">Próximos passos</AlertTitle>
              <AlertDescription>
                <p className="mb-4">
                  Acompanhe o status da sua solicitação através do seu email. Você receberá uma atualização em até 24 horas.
                </p>
                <Button 
                  variant="outline" 
                  className="text-[#7B2DFF] border-[#7B2DFF] hover:bg-[#7B2DFF]/10"
                  onClick={handleScheduleCall}
                >
                  Agendar call de alinhamento
                </Button>
              </AlertDescription>
            </Alert>
            
            <div className="flex justify-center mt-8">
              <Button 
                variant="outline" 
                onClick={() => {
                  setStep('filters');
                  setFilters({});
                  setCampaignName('');
                }}
              >
                Iniciar nova segmentação
              </Button>
            </div>
          </div>
        )}

        <div className="mt-8 text-center">
          <Link to="/" className="text-gray-400 hover:text-[#7B2DFF] transition-colors">
            Voltar para página inicial
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ClientArea;
