import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { FactoryVisualizationProps } from '../../types/howItWorks';

const FactoryVisualization: React.FC<FactoryVisualizationProps> = ({
  steps,
  activeStep,
  isVisible,
  onLoadVoiceflowWidget
}) => {
  const handleDemoClick = () => {
    console.log('Demo button clicked in FactoryVisualization - loading hero-style agent');
    
    // Use the same logic as HeroSection for consistency
    if (!document.getElementById('voiceflow-script-hero')) {
      const script = document.createElement('script');
      script.id = 'voiceflow-script-hero';
      script.type = 'text/javascript';
      script.onload = () => {
        // @ts-ignore
        window.voiceflow?.chat.load({
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
      };
      script.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs";
      document.head.appendChild(script);
    } else {
      // If script already loaded, just initialize the widget
      // @ts-ignore
      window.voiceflow?.chat.load({
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

  return (
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
            onClick={handleDemoClick}
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
  );
};

export default FactoryVisualization;
