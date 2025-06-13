
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { StepTimelineProps } from '../../types/howItWorks';

const StepTimeline: React.FC<StepTimelineProps> = ({
  steps,
  activeStep,
  isVisible,
  expandedStep,
  hoveredStep,
  onToggleExpandStep,
  onSetHoveredStep
}) => {
  return (
    <div 
      className={`relative transition-all duration-1000 mb-12 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="flex flex-col md:flex-row">
        {steps.map((step, index) => (
          <div 
            key={index} 
            className={`flex-1 transition-all duration-500 ${
              index === activeStep ? 'scale-105 z-10' : 'scale-95 opacity-50'
            }`}
            onMouseEnter={() => onSetHoveredStep(index)}
            onMouseLeave={() => onSetHoveredStep(null)}
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
                  onOpenChange={() => onToggleExpandStep(index)}
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepTimeline;
