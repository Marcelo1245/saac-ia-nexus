
import React, { useRef, useEffect, useState } from 'react';
import TimelineControls from './how-it-works/TimelineControls';
import StepTimeline from './how-it-works/StepTimeline';
import FactoryVisualization from './how-it-works/FactoryVisualization';
import { steps } from '../data/howItWorksSteps';
import { loadVoiceflowWidget } from '../utils/voiceflowUtils';

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
        
        <TimelineControls
          activeStep={activeStep}
          totalSteps={steps.length}
          isPaused={isPaused}
          onPrevStep={handlePrevStep}
          onNextStep={handleNextStep}
          onTogglePause={togglePause}
          isVisible={isVisible}
        />
        
        <StepTimeline
          steps={steps}
          activeStep={activeStep}
          isVisible={isVisible}
          expandedStep={expandedStep}
          hoveredStep={hoveredStep}
          onToggleExpandStep={toggleExpandStep}
          onSetHoveredStep={setHoveredStep}
        />
        
        <FactoryVisualization
          steps={steps}
          activeStep={activeStep}
          isVisible={isVisible}
          onLoadVoiceflowWidget={loadVoiceflowWidget}
        />
      </div>
    </section>
  );
};

export default HowItWorksSection;
