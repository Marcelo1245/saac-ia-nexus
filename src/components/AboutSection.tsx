
import React, { useRef, useEffect, useState } from 'react';
import { Zap, Rocket, Database } from 'lucide-react';

const AboutSection: React.FC = () => {
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

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 md:py-32 relative overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, #121212, #1A1A2E)' }}
    >
      {/* Background effect */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-saac-blue/50 to-transparent"></div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 
            className={`text-3xl md:text-4xl font-bold mb-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <span className="text-white">Sobre a </span>
            <span className="text-gradient-blue">SAAC.IA</span>
          </h2>
          
          <p 
            className={`text-gray-300 text-lg leading-relaxed transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            Somos uma consultoria completa de tecnologia aplicada à performance comercial. Nossa missão é transformar o processo comercial das empresas e empreendedores, eliminando tarefas repetitivas, otimizando custos e potencializando resultados.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div 
            className={`glass-card rounded-xl p-8 transition-all duration-700 delay-300 hover:translate-y-[-5px] hover:shadow-lg hover:shadow-saac-blue/10 group ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}
          >
            <div className="w-14 h-14 rounded-full bg-saac-blue/10 flex items-center justify-center mb-6 group-hover:bg-saac-blue/20 transition-colors">
              <Zap className="w-7 h-7 text-saac-blue" />
            </div>
            
            <h3 className="text-xl font-semibold text-white mb-4">Propósito</h3>
            
            <p className="text-gray-300">
              Automatizar completamente o processo de prospecção e agendamento de reuniões para que equipes de vendas possam focar no que realmente importa: fechar negócios.
            </p>
          </div>
          
          {/* Card 2 */}
          <div 
            className={`glass-card rounded-xl p-8 transition-all duration-700 delay-500 hover:translate-y-[-5px] hover:shadow-lg hover:shadow-saac-blue/10 group ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}
          >
            <div className="w-14 h-14 rounded-full bg-saac-blue/10 flex items-center justify-center mb-6 group-hover:bg-saac-blue/20 transition-colors">
              <Rocket className="w-7 h-7 text-saac-blue" />
            </div>
            
            <h3 className="text-xl font-semibold text-white mb-4">Visão</h3>
            
            <p className="text-gray-300">
              Ser reconhecida como a plataforma definitiva de automação inteligente de vendas, estabelecendo um novo padrão global para a indústria de prospecção comercial.
            </p>
          </div>
          
          {/* Card 3 */}
          <div 
            className={`glass-card rounded-xl p-8 transition-all duration-700 delay-700 hover:translate-y-[-5px] hover:shadow-lg hover:shadow-saac-blue/10 group ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}
          >
            <div className="w-14 h-14 rounded-full bg-saac-blue/10 flex items-center justify-center mb-6 group-hover:bg-saac-blue/20 transition-colors">
              <Database className="w-7 h-7 text-saac-blue" />
            </div>
            
            <h3 className="text-xl font-semibold text-white mb-4">Diferenciais</h3>
            
            <ul className="text-gray-300 space-y-2">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-saac-blue rounded-full mr-3"></span>
                Algoritmos de IA de aprendizado contínuo
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-saac-blue rounded-full mr-3"></span>
                Personalização baseada em dados comportamentais
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-saac-blue rounded-full mr-3"></span>
                Menor taxa de rejeição do mercado
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
