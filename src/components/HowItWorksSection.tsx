import React, { useRef, useEffect, useState } from 'react';
import { ArrowRight, Pause, Play, ChevronRight, ChevronLeft } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const HowItWorksSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.2,
      }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  useEffect(() => {
    if (!isVisible || isPaused) return;
    
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isVisible, isPaused]);
  
  const loadVoiceflowWidget = () => {
    // Create a unique script ID for this component
    const scriptId = 'voiceflow-script-how-it-works';
    
    // Remove any existing script to avoid conflicts
    const existingScript = document.getElementById(scriptId);
    if (existingScript) {
      existingScript.remove();
    }
    
    // Create and load the script
    const script = document.createElement('script');
    script.id = scriptId;
    script.type = 'text/javascript';
    script.onload = () => {
      console.log('Voiceflow script loaded in HowItWorksSection');
      // @ts-ignore
      if (window.voiceflow?.chat) {
        // @ts-ignore
        window.voiceflow.chat.load({
          verify: { projectID: '67d04783ad9ed2f668b04618' },
          url: 'https://general-runtime.voiceflow.com/',
          versionID: 'production',
          voice: {
            url: "https://runtime-api.voiceflow.com/"
          },
          render: {
            mode: 'overlay'
          }
        });
      }
    };
    script.onerror = () => {
      console.error('Failed to load Voiceflow script');
    };
    script.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs";
    document.head.appendChild(script);
  };
  
  const steps = [
    {
      title: "Integração e Configuração",
      description: "Conectamos o SAAC.IA com suas fontes de dados e personalizamos os critérios de prospecção de acordo com seu público-alvo ideal.",
      caseStudy: "A empresa XYZ aumentou em 40% sua taxa de conversão após integração personalizada com CRM existente.",
      technicalDetails: "Nossa API se conecta com mais de 50 plataformas diferentes, incluindo Salesforce, Hubspot, Pipedrive e RD Station, além de fontes de dados proprietárias."
    },
    {
      title: "Captura Automática de Leads",
      description: "O sistema busca e identifica continuamente potenciais clientes que se encaixam em seus critérios, em múltiplas fontes simultaneamente.",
      caseStudy: "Startup do setor financeiro capturou 3.500 leads qualificados em apenas 30 dias, um aumento de 300% em relação ao método manual anterior.",
      technicalDetails: "Utilizamos algoritmos de web scraping ético, reconhecimento de padrões e filtragem multicritério para captura precisa em redes sociais, diretórios empresariais e plataformas B2B."
    },
    {
      title: "Análise e Qualificação",
      description: "Cada lead é analisado individualmente quanto ao potencial de compra e adequação ao seu produto ou serviço.",
      caseStudy: "Consultoria empresarial reduziu custos de aquisição em 60% ao focar apenas nos leads com alta pontuação de qualificação.",
      technicalDetails: "Nossa IA analisa mais de 50 variáveis para cada lead, incluindo comportamento online, histórico de interações, dados demográficos e sinais de intenção de compra."
    },
    {
      title: "Personalização da Abordagem",
      description: "O sistema gera mensagens personalizadas para cada lead, considerando suas características específicas, desafios e interesses.",
      caseStudy: "Empresa de software B2B alcançou taxa de resposta de 28% (versus média do mercado de 3%) com mensagens altamente personalizadas.",
      technicalDetails: "Modelos de linguagem treinados especificamente para seu segmento geram mensagens que parecem escritas por humanos, adaptando tom, estilo e conteúdo para cada perfil."
    },
    {
      title: "Primeiro Contato Automatizado",
      description: "A IA inicia conversas personalizadas com os leads qualificados através de múltiplos canais.",
      caseStudy: "Agência de marketing digital aumentou sua capacidade de contato em 10x sem adicionar equipe de SDRs.",
      technicalDetails: "Sequências multicanal sincronizadas (e-mail, LinkedIn, WhatsApp) com timing otimizado baseado em análise comportamental de cada segmento."
    },
    {
      title: "Engajamento e Nutrição",
      description: "O sistema mantém contato contínuo, respondendo a perguntas e objeções de forma contextualizada.",
      caseStudy: "Empresa de logística aumentou ciclo de vida do lead em 45 dias, com 65% dos contatos mantendo engajamento contínuo.",
      technicalDetails: "Análise semântica de respostas permite identificar objeções, interesse ou confusão, adaptando automaticamente a estratégia de nutrição."
    },
    {
      title: "Agendamento de Reunião",
      description: "Quando o lead demonstra interesse, o sistema automaticamente agenda uma reunião com sua equipe de vendas.",
      caseStudy: "Empresa de tecnologia aumentou em 300% o número de demos agendadas sem intervenção humana no processo de qualificação.",
      technicalDetails: "Integração com calendários, detecção de sinais de compra e algoritmos de negociação para encontrar o melhor horário para ambas as partes."
    }
  ];

  const handleNextStep = () => {
    setActiveStep((prev) => (prev + 1) % steps.length);
  };

  const handlePrevStep = () => {
    setActiveStep((prev) => (prev - 1 + steps.length) % steps.length);
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  const toggleExpandStep = (index: number) => {
    if (expandedStep === index) {
      setExpandedStep(null);
    } else {
      setExpandedStep(index);
    }
  };

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="py-20 md:py-32 relative overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, #1A1A2E, #121212)' }}
    >
      {/* Background graphical elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/3 w-64 h-64 bg-saac-blue/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-saac-neon/10 rounded-full blur-[100px]"></div>
        {/* Cyberpunk grid lines */}
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full border-t border-b border-saac-blue/30 flex flex-col justify-between">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="border-t border-saac-blue/20"></div>
            ))}
          </div>
          <div className="absolute inset-0 h-full w-full border-l border-r border-saac-blue/30 flex flex-row justify-between">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="border-l border-saac-blue/20"></div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 
            className={`text-3xl md:text-4xl font-bold mb-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <span className="text-white">Como </span>
            <span className="text-gradient-blue">Funciona</span>
          </h2>
          
          <p 
            className={`text-gray-300 text-lg leading-relaxed transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            Conheça a jornada do lead dentro da SAAC.IA, desde a captura até o agendamento de reunião com sua equipe de vendas.
          </p>
        </div>
        
        {/* Timeline Controls */}
        <div className={`flex justify-center mb-8 transition-all duration-700 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="flex items-center space-x-4 glass-card px-6 py-3 rounded-full">
            <Button
              variant="ghost" 
              size="icon"
              onClick={handlePrevStep}
              className="text-gray-400 hover:text-white hover:bg-saac-blue/20"
            >
              <ChevronLeft size={20} />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={togglePause}
              className="text-gray-400 hover:text-white hover:bg-saac-blue/20"
            >
              {isPaused ? <Play size={20} /> : <Pause size={20} />}
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNextStep}
              className="text-gray-400 hover:text-white hover:bg-saac-blue/20"
            >
              <ChevronRight size={20} />
            </Button>
            
            <div className="text-sm text-gray-400">
              Passo {activeStep + 1} de {steps.length}
            </div>
          </div>
        </div>
        
        {/* Timeline */}
        <div 
          className={`relative transition-all duration-1000 mb-12 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Removed the timeline line that was here */}
          
          {/* Removed the animated progress bar that was here */}
          
          {/* Mobile timeline line - also removed */}
          
          {/* Mobile animated progress bar - also removed */}
          
          <div className="flex flex-col md:flex-row">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className={`flex-1 transition-all duration-500 ${
                  index === activeStep ? 'scale-105 z-10' : 'scale-95 opacity-50'
                }`}
                onMouseEnter={() => setHoveredStep(index)}
                onMouseLeave={() => setHoveredStep(null)}
              >
                <div className="flex md:flex-col items-start md:items-center md:justify-start text-left md:text-center py-6 md:px-4">
                  {/* Step number */}
                  <div 
                    className={`relative z-10 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-4 md:mr-0 md:mb-4 transition-colors duration-300 ${
                      index <= activeStep ? 'bg-saac-blue neon-outline' : 'bg-gray-700'
                    }`}
                  >
                    <span className="text-xs text-white font-bold">{index + 1}</span>
                  </div>
                  
                  <div>
                    <h4 className="text-white text-lg font-semibold mb-2">{step.title}</h4>
                    <p className="text-gray-400 text-sm">{step.description}</p>
                    
                    <Collapsible
                      open={expandedStep === index}
                      onOpenChange={() => toggleExpandStep(index)}
                      className="mt-3"
                    >
                      <CollapsibleTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-saac-blue hover:text-saac-neon text-xs font-medium p-0 h-auto"
                        >
                          Detalhes técnicos {expandedStep === index ? '−' : '+'}
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="mt-2">
                        <p className="text-sm text-gray-400 bg-gray-800/50 p-3 rounded-md">
                          {step.technicalDetails}
                        </p>
                      </CollapsibleContent>
                    </Collapsible>
                  </div>
                </div>
                
                {hoveredStep === index && (
                  <div className="absolute mt-2 md:mt-0 md:top-full left-0 md:left-1/2 md:transform md:-translate-x-1/2 z-20 w-64 md:w-72">
                    <Card className="glass-card border border-saac-blue/30 animate-fade-in">
                      <CardContent className="p-4">
                        <h5 className="text-saac-neon text-sm font-semibold mb-2">Case de Sucesso</h5>
                        <p className="text-white text-xs">{step.caseStudy}</p>
                      </CardContent>
                    </Card>
                  </div>
                )}
                
                {/* Removed the arrow that was here */}
              </div>
            ))}
          </div>
        </div>
        
        {/* Factory Assembly Line Visualization */}
        <div 
          className={`mt-20 glass-card p-8 rounded-xl border border-gray-800 transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}
        >
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
              <h3 className="text-2xl font-semibold text-white mb-4">
                Sistema de conversão inteligente
              </h3>
              <p className="text-gray-300 mb-6">
                Nossa demonstração interativa mostra como a plataforma funciona na prática, capturando, qualificando e agendando reuniões automaticamente, como uma linha de produção inteligente que opera 24/7.
              </p>
              <Button 
                className="bg-gradient-blue hover:opacity-90 text-white font-medium py-3 px-6 rounded-md inline-flex items-center transition-all"
                onClick={() => {
                  console.log('Demo button clicked in HowItWorksSection');
                  loadVoiceflowWidget();
                }}
              >
                Solicitar demonstração
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            <div className="md:w-1/2">
              <div className="relative">
                <div className="factory-visualization w-full h-64 bg-saac-grafite/50 rounded-lg p-4 border border-gray-700 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    {/* Factory assembly line animation based on current step */}
                    <div className="w-full h-12 bg-gray-800/80 relative">
                      {/* Assembly line track */}
                      <div className="absolute top-1/2 left-0 right-0 h-2 bg-gray-700 transform -translate-y-1/2">
                        <div className="absolute top-0 left-0 h-full bg-saac-blue" style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}></div>
                      </div>
                      
                      {/* Assembly stations */}
                      {steps.map((_, i) => (
                        <div 
                          key={i} 
                          className={`absolute top-0 h-full flex items-center justify-center ${
                            i <= activeStep ? 'opacity-100' : 'opacity-40'
                          }`} 
                          style={{ left: `${(i / (steps.length - 1)) * 100}%`, transform: 'translateX(-50%)' }}
                        >
                          <div className={`w-4 h-4 rounded-full ${i <= activeStep ? 'bg-saac-blue animate-pulse' : 'bg-gray-600'}`}></div>
                        </div>
                      ))}
                      
                      {/* Lead representation */}
                      <div 
                        className="absolute top-1/2 h-8 w-8 bg-saac-neon rounded-md transform -translate-y-1/2 transition-all duration-500 flex items-center justify-center"
                        style={{ left: `${(activeStep / (steps.length - 1)) * 100}%` }}
                      >
                        <div className="text-xs font-bold">LEAD</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Step visualization */}
                  <div className="absolute top-0 left-0 w-full h-full flex items-end justify-center pb-4">
                    <div className="text-center">
                      <p className="text-saac-neon font-semibold">
                        {steps[activeStep].title}
                      </p>
                      <div className="mt-2 bg-black/30 p-2 rounded text-xs text-gray-300">
                        {steps[activeStep].description}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Digital measurements and data visualization */}
                <div className="mt-2 grid grid-cols-4 gap-2">
                  <div className="bg-gray-800/70 p-2 rounded text-center">
                    <div className="text-xs text-gray-400">Eficiência</div>
                    <div className="text-saac-neon text-sm font-mono">100%</div>
                  </div>
                  <div className="bg-gray-800/70 p-2 rounded text-center">
                    <div className="text-xs text-gray-400">Leads/Dia</div>
                    <div className="text-saac-neon text-sm font-mono">40</div>
                  </div>
                  <div className="bg-gray-800/70 p-2 rounded text-center">
                    <div className="text-xs text-gray-400">Conversão</div>
                    <div className="text-saac-neon text-sm font-mono">10.7%</div>
                  </div>
                  <div className="bg-gray-800/70 p-2 rounded text-center">
                    <div className="text-xs text-gray-400">Leads/total</div>
                    <div className="text-saac-neon text-sm font-mono">1000</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
