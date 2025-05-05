
import React, { useRef, useEffect, useState } from 'react';
import { Search, CheckCircle, MessageSquare, Calendar } from 'lucide-react';

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

  const solutions = [
    {
      icon: Search,
      title: "Captura",
      description: "Nosso sistema identifica e coleta leads em massa de fontes relevantes para o seu negócio, enriquecendo-os com dados complementares.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: CheckCircle,
      title: "Qualificação",
      description: "Análise automatizada baseada em critérios personalizados, identificando os leads com maior potencial de conversão.",
      color: "from-blue-400 to-purple-500"
    },
    {
      icon: MessageSquare,
      title: "Personalização",
      description: "Criação de abordagens individualizadas para cada lead, com base em seu perfil, comportamento e necessidades específicas.",
      color: "from-purple-500 to-indigo-600"
    },
    {
      icon: Calendar,
      title: "Agendamento",
      description: "Automação completa do processo de marcação de reuniões, integrada diretamente com o calendário da sua equipe de vendas.",
      color: "from-indigo-600 to-saac-blue"
    }
  ];

  return (
    <section
      id="solution"
      ref={sectionRef}
      className="py-20 md:py-32 relative overflow-hidden bg-saac-dark"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 
            className={`text-3xl md:text-4xl font-bold mb-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <span className="text-white">Nossa </span>
            <span className="text-gradient-blue">Solução</span>
          </h2>
          
          <p 
            className={`text-gray-300 text-lg leading-relaxed transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            Um sistema completo e integrado que automatiza todo o processo de prospecção, do início ao fim, permitindo que sua empresa escale vendas sem aumentar proporcionalmente sua equipe.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {solutions.map((solution, index) => (
            <div 
              key={index}
              className={`glass-card rounded-xl overflow-hidden transition-all duration-700 hover:transform hover:scale-105 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}
              style={{ transitionDelay: `${300 + index * 200}ms` }}
            >
              <div className={`bg-gradient-to-r ${solution.color} p-1`}>
                <div className="bg-saac-dark p-6 h-full">
                  <div className="w-14 h-14 rounded-full bg-saac-blue/10 flex items-center justify-center mb-6">
                    <solution.icon className="w-7 h-7 text-saac-blue" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-white mb-3">{solution.title}</h3>
                  
                  <p className="text-gray-300">
                    {solution.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Key metrics */}
        <div className={`mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-700 delay-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-saac-blue mb-2">24/7</div>
            <p className="text-gray-400">Operação contínua, sem interrupções</p>
          </div>
          
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-saac-blue mb-2">100%</div>
            <p className="text-gray-400">Automatizado, sem necessidade de trabalho manual</p>
          </div>
          
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-saac-blue mb-2">0%</div>
            <p className="text-gray-400">Bounce rate, e reembolsamos lead's não qualificadas</p>
          </div>
          
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-saac-blue mb-2">4-15%</div>
            <p className="text-gray-400">Taxa de conversão, com nossa ia integrada, garantimos resultados exponenciais</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
