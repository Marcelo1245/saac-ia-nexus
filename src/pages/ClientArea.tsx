import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import FilterSystem from '@/components/client/FilterSystem';
import LivePreview from '@/components/client/LivePreview';
import SubmissionConfirmation from '@/components/client/SubmissionConfirmation';
import ConfettiEffect from '@/components/client/ConfettiEffect';
import { useAuth } from '@/contexts/AuthContext';
import { Filter, Building, Globe, Users, Briefcase, Save, Download, Send, AlertCircle, Shield, Info, Mail, HelpCircle, Rocket } from 'lucide-react';
import { toast } from 'sonner';
import { ProspectingFilters as ProspectingFiltersType } from '@/types/prospecting';

const ClientArea: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, isInitialized } = useAuth();
  
  const [activeTab, setActiveTab] = useState("company");
  const [step, setStep] = useState<'filters' | 'preview' | 'sent'>('filters');
  const [estimatedLeads, setEstimatedLeads] = useState(347);
  const [filters, setFilters] = useState<Partial<ProspectingFiltersType>>({});
  const [campaignName, setCampaignName] = useState<string>('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  // Check authentication
  useEffect(() => {
    if (isInitialized && !isAuthenticated) {
      navigate('/auth/login');
    }
  }, [isInitialized, isAuthenticated, navigate]);
  
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
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
    
    // Calculate leads based on filters
    let estimate = calculateLeadEstimate(newFilters);
    setEstimatedLeads(estimate);
  };

  const calculateLeadEstimate = (newFilters: Partial<ProspectingFiltersType>): number => {
    // Simulated lead count calculation based on filter complexity
    const industriesCount = newFilters.industries?.length || 0;
    const companySizesCount = newFilters.companySizes?.length || 0;
    const hierarchyLevelsCount = newFilters.hierarchyLevels?.length || 0;
    const functionalRolesCount = newFilters.functionalRoles?.length || 0;
    const countriesCount = newFilters.countries?.length || 0;
    const statesCount = newFilters.states?.length || 0;
    
    // Base count minus 15% for each active filter category
    let estimate = 2500;
    if (industriesCount > 0) estimate = estimate * 0.85;
    if (companySizesCount > 0) estimate = estimate * 0.75;
    if (hierarchyLevelsCount > 0) estimate = estimate * 0.65;
    if (functionalRolesCount > 0) estimate = estimate * 0.70;
    if (countriesCount > 0) estimate = estimate * 0.80;
    if (statesCount > 0) estimate = estimate * 0.85;
    
    // Add some randomness for realism
    const variance = Math.floor(estimate * 0.15);
    return Math.floor(estimate + (Math.random() * variance * 2 - variance));
  };

  const handleCampaignNameChange = (name: string) => {
    setCampaignName(name);
  };

  const handleExportFilters = () => {
    const dataStr = JSON.stringify(filters, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `${campaignName || 'saac-campaign'}-filtros.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    toast.success("Filtros exportados com sucesso!");
  };

  const handleSaveFilters = () => {
    localStorage.setItem('prospectingFilters', JSON.stringify(filters));
    localStorage.setItem('campaignName', campaignName);
    
    toast.success("Configuração salva com sucesso!");
  };

  const handleGoToPreview = () => {
    if (!campaignName) {
      toast.error("Por favor, dê um nome à sua campanha.");
      return;
    }
    
    if (Object.values(filters).every(arr => !arr || (Array.isArray(arr) && arr.length === 0))) {
      toast.error("Por favor, selecione pelo menos um filtro.");
      return;
    }
    
    setStep('preview');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = () => {
    // In a real app, this would send data to your API
    if (!campaignName) {
      toast.error("Por favor, dê um nome à sua campanha.");
      return;
    }
    
    if (Object.values(filters).every(arr => !arr || (Array.isArray(arr) && arr.length === 0))) {
      toast.error("Por favor, selecione pelo menos um filtro.");
      return;
    }
    
    // Simulate API call
    setStep('sent');
    setShowConfetti(true);
    
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

  const handleStartNewCampaign = () => {
    setStep('filters');
    setFilters({});
    setCampaignName('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderItem = (item: string[] | number, index: number) => {
    if (typeof item === 'number') {
      return <div key={index}>{item}</div>;
    }
    
    // Now TypeScript knows item is a string[]
    return <div key={index}>{item.join(', ')}</div>;
  };

  if (isInitialized && !isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <div className="min-h-screen bg-white pt-20 pb-16">
      <ConfettiEffect active={showConfetti} />
      
      <div className="container mx-auto px-4">
        {step === 'filters' && (
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Segmentação de Leads</h1>
            <p className="text-gray-600">Configure os filtros para encontrar os leads ideais para sua campanha</p>
          </div>
        )}
        
        {step === 'preview' && (
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Pré-visualização de Campanha</h1>
            <p className="text-gray-600">Confira os resultados estimados com base nos filtros selecionados</p>
          </div>
        )}
        
        {step === 'sent' && (
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Campanha Enviada</h1>
            <p className="text-gray-600">Sua solicitação foi enviada com sucesso para nossa equipe</p>
          </div>
        )}

        {step === 'filters' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <FilterSystem 
                    onFiltersChange={handleFiltersChange} 
                    onCampaignNameChange={handleCampaignNameChange}
                    initialFilters={filters}
                    initialCampaignName={campaignName}
                    onSaveFilters={handleSaveFilters}
                    onExportFilters={handleExportFilters}
                    onPreviewClick={handleGoToPreview}
                    estimatedLeads={estimatedLeads}
                    isMobile={isMobile}
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
                  className="bg-[#2563EB] hover:bg-blue-700 text-white ml-auto flex items-center gap-2"
                  onClick={handleGoToPreview}
                >
                  <Rocket size={16} />
                  Avançar para Pré-visualização
                </Button>
              </div>
            </div>
            
            <div className="hidden md:block">
              <LivePreview filters={filters} estimatedLeads={estimatedLeads} />
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
                          lead.score >= 90 ? 'bg-[#00C4A3]/20 text-[#00C4A3]' :
                          lead.score >= 80 ? 'bg-[#2563EB]/20 text-[#2563EB]' :
                          'bg-blue-100 text-blue-600'
                        }`}>
                          <span className="text-sm font-bold">{lead.score}</span>
                        </div>
                        <span className="text-xs mt-1">Score</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold mb-3">Resumo da Campanha</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Nome da campanha</p>
                      <p className="font-medium">{campaignName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Leads estimados</p>
                      <p className="font-medium">{estimatedLeads.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Filtros aplicados</p>
                      <p className="font-medium">
                        {Object.values(filters).flatMap(arr => arr || []).length} filtros
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Alert className="bg-[#00C4A3]/10 border-[#00C4A3]/20">
              <AlertCircle className="h-4 w-4 text-[#00C4A3]" />
              <AlertTitle className="text-[#00C4A3]">Tudo pronto para enviar!</AlertTitle>
              <AlertDescription>
                <p className="mb-2">Sua campanha será enviada para nossa equipe, que iniciará o processo de prospecção e você receberá os primeiros resultados em até 48 horas.</p>
              </AlertDescription>
            </Alert>
            
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => setStep('filters')}
              >
                Voltar para Filtros
              </Button>
              
              <Button 
                className="bg-[#2563EB] hover:bg-blue-700 text-white flex items-center gap-2"
                onClick={handleSubmit}
              >
                <Send size={16} />
                Enviar para Nossa Equipe
              </Button>
            </div>
          </div>
        )}
        
        {step === 'sent' && (
          <SubmissionConfirmation 
            onNewCampaign={handleStartNewCampaign}
            onScheduleCall={handleScheduleCall}
            campaignFilters={filters}
            campaignName={campaignName}
          />
        )}

        <div className="mt-8 text-center">
          <Link to="/" className="text-gray-400 hover:text-[#2563EB] transition-colors">
            Voltar para página inicial
          </Link>
        </div>
      </div>
      
      {/* Floating action button for mobile */}
      {step === 'filters' && isMobile && (
        <div className="fixed bottom-6 right-6 z-50">
          <Button 
            className="bg-[#2563EB] text-white rounded-full shadow-lg w-14 h-14 flex items-center justify-center"
            onClick={handleGoToPreview}
          >
            <Rocket size={20} />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ClientArea;
