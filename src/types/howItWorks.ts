
export interface Step {
  title: string;
  description: string;
  caseStudy: string;
  technicalDetails: string;
}

export interface TimelineControlsProps {
  activeStep: number;
  totalSteps: number;
  isPaused: boolean;
  onPrevStep: () => void;
  onNextStep: () => void;
  onTogglePause: () => void;
  isVisible: boolean;
}

export interface StepTimelineProps {
  steps: Step[];
  activeStep: number;
  isVisible: boolean;
  expandedStep: number | null;
  hoveredStep: number | null;
  onToggleExpandStep: (index: number) => void;
  onSetHoveredStep: (index: number | null) => void;
}

export interface FactoryVisualizationProps {
  steps: Step[];
  activeStep: number;
  isVisible: boolean;
  onLoadVoiceflowWidget: () => void;
}
