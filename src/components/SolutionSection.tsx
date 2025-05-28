
import React, { useRef, useEffect, useState } from 'react';
import { ArrowRight, Target, Users, TrendingUp, CheckCircle, MessageSquare, Calendar, Zap } from 'lucide-react';
import { Button } from "@/components/ui/button";

const SolutionSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
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

  return (
    <section
      id="solution"
      ref={sectionRef}
      className="py-20 md:py-32 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-5">
        <div className="absolute top-10 left-10 w-20 h-20 bg-saac-blue rounded-full blur-xl"></div>
        <div className="absolute top-1/2 right-20 w-32 h-32 bg-saac-blue rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-saac-blue rounded-full blur-xl"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 
            className={`text-3xl md:text-4xl font-bold mb-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <span className="text-white">Sistema de conversão </span>
            <span className="text-gradient-blue">inteligente</span>
          </h2>
          
          <p 
            className={`text-gray-300 text-lg leading-relaxed mb-8 transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            Nossa demonstração interativa mostra como a plataforma funciona na prática, capturando, qualificando e agendando reuniões automaticamente, como uma linha de produção inteligente que opera 24/7.
          </p>

          <div 
            className={`transition-all duration-700 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <Button className="bg-gradient-blue text-white px-8 py-3 rounded-full shadow-lg hover:shadow-saac-blue/30 transition-all duration-300 font-medium">
              Solicitar demonstração
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Interactive Demo */}
        <div 
          className={`glass-card rounded-2xl p-8 md:p-12 mb-16 transition-all duration-700 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* Lead Input */}
            <div className="text-center">
              <div className="w-16 h-16 bg-saac-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-saac-blue" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">LEAD</h3>
              <div className="glass-card p-4 rounded-lg">
                <div className="text-sm text-gray-400 mb-2">Engajamento e Nutrição</div>
                <p className="text-xs text-gray-500">O sistema mantém contato contínuo, respondendo a perguntas e objeções de forma contextualizada.</p>
              </div>
            </div>

            {/* Process Arrow */}
            <div className="flex justify-center">
              <ArrowRight className="w-8 h-8 text-saac-blue" />
            </div>

            {/* Results */}
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 glass-card rounded-lg">
                <span className="text-white font-medium">Eficiência</span>
                <span className="text-saac-blue font-bold">100%</span>
              </div>
              <div className="flex justify-between items-center p-3 glass-card rounded-lg">
                <span className="text-white font-medium">Leads/Dia</span>
                <span className="text-saac-blue font-bold">40</span>
              </div>
              <div className="flex justify-between items-center p-3 glass-card rounded-lg">
                <span className="text-white font-medium">Conversão</span>
                <span className="text-saac-blue font-bold">7.7%</span>
              </div>
              <div className="flex justify-between items-center p-3 glass-card rounded-lg">
                <span className="text-white font-medium">Leads/total</span>
                <span className="text-saac-blue font-bold">1000</span>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: Target,
              title: "Segmentação Precisa",
              description: "IA identifica e qualifica leads com base no perfil ideal do cliente, aumentando as chances de conversão."
            },
            {
              icon: MessageSquare,
              title: "Comunicação Inteligente",
              description: "Mensagens personalizadas e contextualizada que se adaptam ao comportamento e interesse de cada lead."
            },
            {
              icon: Calendar,
              title: "Agendamento Automático",
              description: "Sistema integrado que agenda reuniões automaticamente, sincronizando com a agenda da equipe de vendas."
            },
            {
              icon: Zap,
              title: "Velocidade de Resposta",
              description: "Resposta imediata a leads interessados, aproveitando o momento de maior engajamento."
            },
            {
              icon: TrendingUp,
              title: "Otimização Contínua",
              description: "Algoritmos de machine learning que melhoram constantemente as taxas de conversão."
            },
            {
              icon: CheckCircle,
              title: "Qualificação Automática",
              description: "Filtragem inteligente que identifica leads com maior potencial de fechamento."
            }
          ].map((feature, index) => (
            <div 
              key={index}
              className={`glass-card rounded-xl p-6 hover:border-saac-blue/30 transition-all duration-300 group ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}
              style={{ transitionDelay: `${900 + index * 150}ms` }}
            >
              <div className="w-12 h-12 bg-saac-blue/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-saac-blue/20 transition-colors">
                <feature.icon className="w-6 h-6 text-saac-blue" />
              </div>
              
              <h3 className="text-lg font-semibold text-white mb-3">
                {feature.title}
              </h3>
              
              <p className="text-gray-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
