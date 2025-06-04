
import React, { useRef, useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { TrendingUp, Clock, CheckCircle, Search } from 'lucide-react';

const ResultsSection: React.FC = () => {
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
  
  const chartData = [
    { name: 'Mês 1', tradicional: 10, saac: 25 },
    { name: 'Mês 2', tradicional: 15, saac: 40 },
    { name: 'Mês 3', tradicional: 20, saac: 65 },
    { name: 'Mês 4', tradicional: 25, saac: 90 },
    { name: 'Mês 5', tradicional: 30, saac: 120 },
    { name: 'Mês 6', tradicional: 35, saac: 160 },
  ];
  
  const metrics = [
    {
      icon: Search,
      value: '3x',
      label: 'mais leads qualificados',
      description: 'Aumento na quantidade de leads qualificados em comparação com métodos tradicionais.'
    },
    {
      icon: CheckCircle,
      value: '4-15%',
      label: 'taxa de conversão',
      description: 'Taxa média de leads que aceitam agendar uma reunião com sua equipe de vendas.'
    },
    {
      icon: Clock,
      value: '100%',
      label: 'economia de tempo',
      description: 'Redução no tempo que sua equipe gasta em tarefas de prospecção manual.'
    },
    {
      icon: TrendingUp,
      value: '3x',
      label: 'ROI médio',
      description: 'Retorno médio sobre o investimento nos primeiros seis meses de implementação.'
    }
  ];

  return (
    <section
      id="results"
      ref={sectionRef}
      className="py-20 md:py-32 relative overflow-hidden bg-saac-dark"
    >
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none opacity-10">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTAwIDAgTDIwMCAxMDAgTDEwMCAyMDAgTDAgMTAwIFoiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwQThGRiIgc3Ryb2tlLXdpZHRoPSIxIiBvcGFjaXR5PSIwLjEiLz48L3N2Zz4=')]"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 
            className={`text-3xl md:text-4xl font-bold mb-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <span className="text-white">Resultados </span>
            <span className="text-gradient-blue">Comprovados</span>
          </h2>
          
          <p 
            className={`text-gray-300 text-lg leading-relaxed transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            Conheça os resultados que nossos clientes têm alcançado ao implementar a SAAC.IA em seus processos de vendas.
          </p>
        </div>
        
        {/* Chart */}
        <div 
          className={`glass-card rounded-xl p-6 md:p-8 mb-16 transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}
        >
          <h3 className="text-xl font-semibold text-white mb-6">Crescimento de Reuniões Agendadas</h3>
          
          <div className="h-64 md:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis dataKey="name" stroke="#888" />
                <YAxis stroke="#888" />
                <Bar dataKey="tradicional" fill="#555" radius={[4, 4, 0, 0]} name="Prospecção Tradicional" />
                <Bar dataKey="saac" fill="#00A8FF" radius={[4, 4, 0, 0]} name="Com SAAC.IA" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="flex justify-center mt-4 space-x-8">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-[#555] rounded mr-2"></div>
              <span className="text-sm text-gray-300">Prospecção Tradicional</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-saac-blue rounded mr-2"></div>
              <span className="text-sm text-gray-300">Com SAAC.IA</span>
            </div>
          </div>
        </div>
        
        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <div 
              key={index}
              className={`glass-card rounded-xl p-6 transition-all duration-700 hover:border-saac-blue/30 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}
              style={{ transitionDelay: `${500 + index * 150}ms` }}
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-saac-blue/10 flex items-center justify-center mr-4">
                  <metric.icon className="w-5 h-5 text-saac-blue" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{metric.value}</div>
                  <div className="text-saac-blue text-sm">{metric.label}</div>
                </div>
              </div>
              
              <p className="text-gray-400 text-sm">
                {metric.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
