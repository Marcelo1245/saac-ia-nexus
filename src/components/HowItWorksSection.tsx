
import React, { useRef, useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';

const HowItWorksSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  
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
    if (!isVisible) return;
    
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isVisible]);
  
  const steps = [
    {
      title: "Integração e Configuração",
      description: "Conectamos o SAAC.IA com suas fontes de dados e personalizamos os critérios de prospecção de acordo com seu público-alvo ideal."
    },
    {
      title: "Captura Automática de Leads",
      description: "O sistema busca e identifica continuamente potenciais clientes que se encaixam em seus critérios, em múltiplas fontes simultaneamente."
    },
    {
      title: "Análise e Qualificação",
      description: "Cada lead é analisado individualmente quanto ao potencial de compra e adequação ao seu produto ou serviço."
    },
    {
      title: "Personalização da Abordagem",
      description: "O sistema gera mensagens personalizadas para cada lead, considerando suas características específicas, desafios e interesses."
    },
    {
      title: "Primeiro Contato Automatizado",
      description: "A IA inicia conversas personalizadas com os leads qualificados através de múltiplos canais."
    },
    {
      title: "Engajamento e Nutrição",
      description: "O sistema mantém contato contínuo, respondendo a perguntas e objeções de forma contextualizada."
    },
    {
      title: "Agendamento de Reunião",
      description: "Quando o lead demonstra interesse, o sistema automaticamente agenda uma reunião com sua equipe de vendas."
    }
  ];

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
        
        {/* Timeline */}
        <div 
          className={`relative transition-all duration-1000 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Timeline line */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-700 transform -translate-y-1/2"></div>
          
          {/* Animated progress bar */}
          <div 
            className="hidden md:block absolute top-1/2 left-0 h-0.5 bg-saac-blue transform -translate-y-1/2 transition-all duration-500"
            style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
          ></div>
          
          {/* Mobile timeline line */}
          <div className="md:hidden absolute top-0 bottom-0 left-4 w-0.5 bg-gray-700"></div>
          
          {/* Mobile animated progress bar */}
          <div 
            className="md:hidden absolute top-0 left-4 w-0.5 bg-saac-blue transition-all duration-500"
            style={{ height: `${((activeStep + 1) / steps.length) * 100}%` }}
          ></div>
          
          <div className="flex flex-col md:flex-row">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className={`flex-1 transition-all duration-500 ${
                  index === activeStep ? 'scale-105' : 'scale-95 opacity-50'
                }`}
              >
                <div className="flex md:flex-col items-start md:items-center md:justify-start text-left md:text-center py-6 md:px-4">
                  {/* Step number */}
                  <div 
                    className={`relative z-10 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-4 md:mr-0 md:mb-4 transition-colors duration-300 ${
                      index <= activeStep ? 'bg-saac-blue' : 'bg-gray-700'
                    }`}
                  >
                    <span className="text-xs text-white font-bold">{index + 1}</span>
                  </div>
                  
                  <div>
                    <h4 className="text-white text-lg font-semibold mb-2">{step.title}</h4>
                    <p className="text-gray-400 text-sm">{step.description}</p>
                  </div>
                </div>
                
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                    <ArrowRight className="text-gray-600" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Interactive Demo Placeholder */}
        <div 
          className={`mt-20 glass-card p-8 rounded-xl border border-gray-800 transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}
        >
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
              <h3 className="text-2xl font-semibold text-white mb-4">
                Veja a SAAC.IA em ação
              </h3>
              <p className="text-gray-300 mb-6">
                Nossa demonstração interativa mostra como a plataforma funciona na prática, capturando, qualificando e agendando reuniões automaticamente.
              </p>
              <button className="bg-gradient-blue hover:opacity-90 text-white font-medium py-3 px-6 rounded-md inline-flex items-center transition-all">
                Solicitar demonstração
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
            
            <div className="md:w-1/2 bg-saac-grafite/50 rounded-lg p-4 border border-gray-700">
              <div className="aspect-w-16 aspect-h-9 relative rounded overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-saac-blue/20 flex items-center justify-center animate-pulse">
                    <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-saac-dark via-transparent pointer-events-none"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
