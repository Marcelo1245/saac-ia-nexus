
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
  return (
    <div className="p-3 rounded-md border border-gray-700 hover:bg-gray-700 transition-colors">
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-medium text-white">{name}</h4>
        <span className="text-xs font-medium text-saac-blue">{progress}%</span>
      </div>
      <Progress value={progress} className="h-1.5 mb-2" />
      <div className="flex justify-between text-xs text-gray-400">
        <span>Leads: {leads}</span>
        <span>Meta: {target}</span>
      </div>
    </div>
  );
};
