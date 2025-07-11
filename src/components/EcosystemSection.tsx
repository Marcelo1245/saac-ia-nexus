
import React, { useRef, useEffect, useState } from 'react';
import { 
  MessageCircle, 
  Instagram, 
  Phone, 
  Brain, 
  Calendar,
  Users,
  Target,
  TrendingUp,
  Settings,
  Zap,
  ArrowRight,
  CheckCircle,
  BarChart3,
  UserCheck
} from 'lucide-react';

const EcosystemSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeProduct, setActiveProduct] = useState<number | null>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
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

  const sdrFeatures = [
    {
      icon: MessageCircle,
      title: "Atendimento Multicanal",
      description: "WhatsApp e Instagram com respostas instantâneas"
    },
    {
      icon: Brain,
      title: "IA Conversacional",
      description: "Conversa humanizada e fluida com seus leads"
    },
    {
      icon: Phone,
      title: "Áudios Realistas",
      description: "Envia áudios personalizados que simulam um humano real"
    },
    {
      icon: UserCheck,
      title: "Qualificação BANT/SPIN",
      description: "Qualifica leads com critérios comerciais avançados"
    },
    {
      icon: Calendar,
      title: "Agendamento Automático",
      description: "Agenda reuniões diretamente com seus vendedores"
    },
    {
      icon: Zap,
      title: "Follow-ups Inteligentes",
      description: "Linguagem adaptada ao perfil de cada lead"
    }
  ];

  const consultingFeatures = [
    {
      icon: BarChart3,
      title: "Análise Completa",
      description: "Diagnóstico profundo do seu processo de vendas atual"
    },
    {
      icon: Settings,
      title: "Implementação Estrutural",
      description: "Funil, CRM, scripts e cadências personalizadas"
    },
    {
      icon: Users,
      title: "Capacitação de Equipe",
      description: "Treinamento especializado para sua equipe comercial"
    },
    {
      icon: Target,
      title: "Integração Estratégica",
      description: "Conexão perfeita do Agente SDR com seu funil"
    },
    {
      icon: TrendingUp,
      title: "Planejamento Escalável",
      description: "Estratégia focada em conversão, autoridade e crescimento"
    }
  ];

  const ecosystemFlow = [
    { step: "Captação", icon: Target, color: "bg-purple-500/20 text-purple-400" },
    { step: "SDR", icon: Brain, color: "bg-saac-blue/20 text-saac-blue" },
    { step: "Engajamento", icon: MessageCircle, color: "bg-green-500/20 text-green-400" },
    { step: "Reunião", icon: Calendar, color: "bg-orange-500/20 text-orange-400" },
    { step: "Venda", icon: CheckCircle, color: "bg-emerald-500/20 text-emerald-400" }
  ];

  return (
    <section
      id="ecosystem"
      ref={sectionRef}
      className="py-20 md:py-32 relative overflow-hidden bg-gradient-to-b from-saac-dark to-saac-grafite/20"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-saac-blue/20 to-transparent"></div>
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-saac-neon/20 to-transparent"></div>
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-saac-blue/20 to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-20">
          <h2 
            className={`text-3xl md:text-5xl font-bold mb-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <span className="text-white">Ecossistema </span>
            <span className="text-gradient-blue">SAAC</span>
          </h2>
          
          <p 
            className={`text-gray-300 text-xl leading-relaxed transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            Uma consultoria completa de tecnologia aplicada à performance comercial. 
            Soluções que transformam seu processo de vendas em uma máquina de resultados.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* SDR Agent Product */}
          <div 
            className={`glass-card rounded-2xl p-8 transition-all duration-700 hover:border-saac-blue/50 group ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}
            style={{ transitionDelay: '400ms' }}
            onMouseEnter={() => setActiveProduct(1)}
            onMouseLeave={() => setActiveProduct(null)}
          >
            <div className="flex items-center mb-8">
              <div className="w-16 h-16 rounded-full bg-gradient-blue flex items-center justify-center mr-6">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Agente SDR Inteligente</h3>
                <p className="text-saac-blue font-medium">Automatização Conversacional Avançada</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {sdrFeatures.map((feature, index) => (
                <div 
                  key={index}
                  className={`p-4 rounded-xl bg-saac-dark/50 border border-gray-700/50 transition-all duration-300 hover:border-saac-blue/30 hover:bg-saac-blue/5 ${
                    activeProduct === 1 ? 'animate-pulse-blue' : ''
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start">
                    <feature.icon className="w-5 h-5 text-saac-blue mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-white font-medium text-sm mb-1">{feature.title}</h4>
                      <p className="text-gray-400 text-xs leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-blue/10 rounded-xl p-6 border border-saac-blue/20">
              <p className="text-saac-blue font-medium text-center">
                "Uma experiência que simula um humano real, com personalização total para cada lead"
              </p>
            </div>
          </div>

          {/* Consulting Product */}
          <div 
            className={`glass-card rounded-2xl p-8 transition-all duration-700 hover:border-saac-neon/50 group ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}
            style={{ transitionDelay: '600ms' }}
            onMouseEnter={() => setActiveProduct(2)}
            onMouseLeave={() => setActiveProduct(null)}
          >
            <div className="flex items-center mb-8">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-saac-blue to-saac-neon flex items-center justify-center mr-6">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Consultoria Comercial Estratégica</h3>
                <p className="text-saac-neon font-medium">Inteligência Humana Aplicada</p>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              {consultingFeatures.map((feature, index) => (
                <div 
                  key={index}
                  className={`p-4 rounded-xl bg-saac-dark/50 border border-gray-700/50 transition-all duration-300 hover:border-saac-neon/30 hover:bg-saac-neon/5 ${
                    activeProduct === 2 ? 'animate-pulse-blue' : ''
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start">
                    <feature.icon className="w-5 h-5 text-saac-neon mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-white font-medium mb-1">{feature.title}</h4>
                      <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-saac-blue/10 to-saac-neon/10 rounded-xl p-6 border border-saac-neon/20">
              <p className="text-saac-neon font-medium text-center">
                "Não oferecemos apenas tecnologia, mas estratégia e inteligência aplicada ao seu negócio"
              </p>
            </div>
          </div>
        </div>

        {/* Ecosystem Flow */}
        <div 
          className={`transition-all duration-700 delay-800 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Fluxo do <span className="text-gradient-blue">Ecossistema</span>
            </h3>
            <p className="text-gray-300 text-lg">
              Veja como tudo se conecta para maximizar seus resultados
            </p>
          </div>

          <div className="glass-card rounded-2xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-4">
              {ecosystemFlow.map((item, index) => (
                <React.Fragment key={index}>
                  <div className="flex flex-col items-center group">
                    <div className={`w-16 h-16 rounded-full ${item.color} flex items-center justify-center mb-3 transition-all duration-300 group-hover:scale-110 animate-float`}
                         style={{ animationDelay: `${index * 200}ms` }}>
                      <item.icon className="w-8 h-8" />
                    </div>
                    <span className="text-white font-medium text-center">{item.step}</span>
                  </div>
                  
                  {index < ecosystemFlow.length - 1 && (
                    <ArrowRight className="w-6 h-6 text-saac-blue hidden md:block animate-pulse" />
                  )}
                  {index < ecosystemFlow.length - 1 && (
                    <div className="w-px h-8 bg-saac-blue md:hidden animate-pulse"></div>
                  )}
                </React.Fragment>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-gray-300 text-lg mb-6">
                Um ecossistema integrado que transforma leads em vendas de forma automatizada e inteligente
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div className="glass-card rounded-lg p-4 flex-1 max-w-xs">
                  <div className="text-saac-blue font-bold text-2xl">95%</div>
                  <div className="text-gray-300 text-sm">Automação do processo</div>
                </div>
                <div className="glass-card rounded-lg p-4 flex-1 max-w-xs">
                  <div className="text-saac-neon font-bold text-2xl">24/7</div>
                  <div className="text-gray-300 text-sm">Atendimento ativo</div>
                </div>
                <div className="glass-card rounded-lg p-4 flex-1 max-w-xs">
                  <div className="text-saac-blue font-bold text-2xl">3x</div>
                  <div className="text-gray-300 text-sm">Mais conversões</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EcosystemSection;
