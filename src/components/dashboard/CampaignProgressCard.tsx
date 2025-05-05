
import React from 'react';
import { Progress } from '@/components/ui/progress';

interface CampaignProgressCardProps {
  name: string;
  progress: number;
  leads: number;
  target: number;
}

export const CampaignProgressCard: React.FC<CampaignProgressCardProps> = ({
  name,
  progress,
  leads,
  target
}) => {
  // Ensure progress is a valid number between 0-100
  const safeProgress = isNaN(progress) ? 0 : Math.min(Math.max(progress, 0), 100);
  
  return (
    <div className="p-3 rounded-md border border-gray-700 hover:bg-gray-700 transition-colors">
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-medium text-white">{name || 'Untitled Campaign'}</h4>
        <span className="text-xs font-medium text-saac-blue">{safeProgress}%</span>
      </div>
      <Progress value={safeProgress} className="h-1.5 mb-2" />
      <div className="flex justify-between text-xs text-gray-400">
        <span>Leads: {leads || 0}</span>
        <span>Meta: {target || 0}</span>
      </div>
    </div>
  );
};
