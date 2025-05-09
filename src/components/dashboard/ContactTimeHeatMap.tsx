
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { ContactTimeHeatmapData } from '@/types/prospecting';

// Dados simulados para o heatmap - Converted hour to string type to match our updated type definition
const mockHeatmapData: ContactTimeHeatmapData[] = [
  // Segunda
  { day: 'segunda', hour: '8', value: 20 },
  { day: 'segunda', hour: '9', value: 40 },
  { day: 'segunda', hour: '10', value: 60 },
  { day: 'segunda', hour: '11', value: 70 },
  { day: 'segunda', hour: '12', value: 30 },
  { day: 'segunda', hour: '13', value: 25 },
  { day: 'segunda', hour: '14', value: 55 },
  { day: 'segunda', hour: '15', value: 75 },
  { day: 'segunda', hour: '16', value: 85 },
  { day: 'segunda', hour: '17', value: 65 },
  { day: 'segunda', hour: '18', value: 40 },
  
  // Terça
  { day: 'terça', hour: '8', value: 25 },
  { day: 'terça', hour: '9', value: 45 },
  { day: 'terça', hour: '10', value: 65 },
  { day: 'terça', hour: '11', value: 75 },
  { day: 'terça', hour: '12', value: 35 },
  { day: 'terça', hour: '13', value: 30 },
  { day: 'terça', hour: '14', value: 60 },
  { day: 'terça', hour: '15', value: 80 },
  { day: 'terça', hour: '16', value: 90 },
  { day: 'terça', hour: '17', value: 70 },
  { day: 'terça', hour: '18', value: 45 },
  
  // Quarta
  { day: 'quarta', hour: '8', value: 30 },
  { day: 'quarta', hour: '9', value: 50 },
  { day: 'quarta', hour: '10', value: 70 },
  { day: 'quarta', hour: '11', value: 80 },
  { day: 'quarta', hour: '12', value: 40 },
  { day: 'quarta', hour: '13', value: 35 },
  { day: 'quarta', hour: '14', value: 65 },
  { day: 'quarta', hour: '15', value: 85 },
  { day: 'quarta', hour: '16', value: 95 },
  { day: 'quarta', hour: '17', value: 75 },
  { day: 'quarta', hour: '18', value: 50 },
  
  // Quinta
  { day: 'quinta', hour: '8', value: 35 },
  { day: 'quinta', hour: '9', value: 55 },
  { day: 'quinta', hour: '10', value: 75 },
  { day: 'quinta', hour: '11', value: 85 },
  { day: 'quinta', hour: '12', value: 45 },
  { day: 'quinta', hour: '13', value: 40 },
  { day: 'quinta', hour: '14', value: 70 },
  { day: 'quinta', hour: '15', value: 90 },
  { day: 'quinta', hour: '16', value: 98 },
  { day: 'quinta', hour: '17', value: 80 },
  { day: 'quinta', hour: '18', value: 55 },
  
  // Sexta
  { day: 'sexta', hour: '8', value: 30 },
  { day: 'sexta', hour: '9', value: 50 },
  { day: 'sexta', hour: '10', value: 70 },
  { day: 'sexta', hour: '11', value: 80 },
  { day: 'sexta', hour: '12', value: 40 },
  { day: 'sexta', hour: '13', value: 35 },
  { day: 'sexta', hour: '14', value: 65 },
  { day: 'sexta', hour: '15', value: 85 },
  { day: 'sexta', hour: '16', value: 90 },
  { day: 'sexta', hour: '17', value: 65 },
  { day: 'sexta', hour: '18', value: 40 },
];

// Esta é uma versão simplificada do heatmap para este exemplo
// Um heatmap mais robusto exigiria uma biblioteca especializada como heatmap.js ou d3.js
export const ContactTimeHeatMap: React.FC = () => {
  const { data: heatmapData, isLoading } = useQuery({
    queryKey: ['contactTimeHeatmap'],
    queryFn: () => {
      // Simula uma chamada de API
      return new Promise<ContactTimeHeatmapData[]>((resolve) => {
        setTimeout(() => resolve(mockHeatmapData), 800);
      });
    }
  });

  if (isLoading) {
    return <div className="flex justify-center py-4">Carregando dados...</div>;
  }

  const days = ['segunda', 'terça', 'quarta', 'quinta', 'sexta'];
  const hours = ['9', '10', '11', '12', '13', '14', '15', '16', '17', '18'];

  const getValueForTimeSlot = (day: string, hour: string) => {
    const slot = heatmapData?.find(data => data.day === day && data.hour === hour);
    return slot?.value || 0;
  };

  // Função para determinar a cor de fundo com base no valor
  const getBackgroundColor = (value: number) => {
    // Escala de cores: azul escuro para azul claro
    if (value >= 90) return 'bg-saac-blue';
    if (value >= 70) return 'bg-blue-500';
    if (value >= 50) return 'bg-blue-400';
    if (value >= 30) return 'bg-blue-300';
    return 'bg-blue-200';
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr>
            <th className="p-1 text-xs text-gray-400"></th>
            {hours.map(hour => (
              <th key={hour} className="p-1 text-xs text-gray-400 text-center">
                {hour}h
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {days.map(day => (
            <tr key={day}>
              <td className="p-1 text-xs text-gray-400 capitalize">{day}</td>
              {hours.map(hour => {
                const value = getValueForTimeSlot(day, hour);
                return (
                  <td 
                    key={`${day}-${hour}`} 
                    className={`p-1 text-center text-xs`}
                  >
                    <div 
                      className={`w-full h-6 rounded ${getBackgroundColor(value)} flex items-center justify-center text-white`}
                      title={`${day} ${hour}h: ${value}% taxa de resposta`}
                    >
                      {value}%
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
