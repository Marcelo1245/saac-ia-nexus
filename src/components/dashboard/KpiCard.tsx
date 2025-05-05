
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowDown, ArrowUp, Users, User, Calendar, BarChart } from 'lucide-react';

type KpiIconType = 'users' | 'user' | 'calendar' | 'bar-chart';

interface KpiCardProps {
  title: string;
  value: string;
  trend: number;
  description: string;
  icon: KpiIconType;
}

const iconMap: Record<KpiIconType, React.ElementType> = {
  'users': Users,
  'user': User,
  'calendar': Calendar,
  'bar-chart': BarChart
};

export const KpiCard: React.FC<KpiCardProps> = ({ 
  title, 
  value, 
  trend, 
  description,
  icon
}) => {
  const IconComponent = iconMap[icon];
  
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-400 text-sm">{title}</span>
          <div className="p-2 rounded-full bg-gray-700 text-saac-blue">
            <IconComponent className="h-5 w-5" />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-2xl font-bold text-white">{value}</div>
          <div className="flex items-center gap-1">
            {trend > 0 ? (
              <div className="flex items-center text-green-500 text-sm">
                <ArrowUp className="h-3 w-3" />
                <span>{Math.abs(trend)}%</span>
              </div>
            ) : (
              <div className="flex items-center text-red-500 text-sm">
                <ArrowDown className="h-3 w-3" />
                <span>{Math.abs(trend)}%</span>
              </div>
            )}
            <span className="text-gray-400 text-sm">{description}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
