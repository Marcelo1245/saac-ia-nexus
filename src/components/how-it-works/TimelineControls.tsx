
import React from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { TimelineControlsProps } from '../../types/howItWorks';

const TimelineControls: React.FC<TimelineControlsProps> = ({
  activeStep,
  totalSteps,
  isPaused,
  onPrevStep,
  onNextStep,
  onTogglePause,
  isVisible
}) => {
  return (
    <div className={`flex justify-center mb-8 transition-all duration-700 ${
      isVisible ? 'opacity-100' : 'opacity-0'
    }`}>
      <div className="flex items-center space-x-4 glass-card px-6 py-3 rounded-full">
        <Button
          variant="ghost" 
          size="icon"
          onClick={onPrevStep}
          className="text-gray-400 hover:text-white hover:bg-saac-blue/20"
        >
          <ChevronLeft size={20} />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={onTogglePause}
          className="text-gray-400 hover:text-white hover:bg-saac-blue/20"
        >
          {isPaused ? <Play size={20} /> : <Pause size={20} />}
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={onNextStep}
          className="text-gray-400 hover:text-white hover:bg-saac-blue/20"
        >
          <ChevronRight size={20} />
        </Button>
        
        <div className="text-sm text-gray-400">
          Passo {activeStep + 1} de {totalSteps}
        </div>
      </div>
    </div>
  );
};

export default TimelineControls;
