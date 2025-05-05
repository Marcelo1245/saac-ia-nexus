
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  BarChart,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Bar,
  Line
} from 'recharts';
import { useQuery } from '@tanstack/react-query';
import { ContactTimeHeatMap } from '@/components/dashboard/ContactTimeHeatMap';
import { HotLeadsList } from '@/components/dashboard/HotLeadsList';
import { CampaignProgressCard } from '@/components/dashboard/CampaignProgressCard';
import { KpiCard } from '@/components/dashboard/KpiCard';

// Dados simulados para demonstração
const mockData = {
  campaignPerformance: [
    { month: 'Jan', leads: 120, meetings: 24 },
    { month: 'Fev', leads: 180, meetings: 32 },
    { month: 'Mar', leads: 220, meetings: 45 },
    { month: 'Abr', leads: 250, meetings: 52 },
    { month: 'Mai', leads: 300, meetings: 65 },
    { month: 'Jun', leads: 350, meetings: 72 },
  ],
  conversionRates: [
    { week: 'Semana 1', rate: 3.2 },
    { week: 'Semana 2', rate: 3.8 },
    { week: 'Semana 3', rate: 4.5 },
    { week: 'Semana 4', rate: 5.2 },
    { week: 'Semana 5', rate: 6.0 },
    { week: 'Semana 6', rate: 8.5 },
    { week: 'Semana 7', rate: 10.2 },
    { week: 'Semana 8', rate: 12.5 },
  ],
  kpis: {
    totalLeads: 1420,
    activeLeads: 380,
    meetingsBooked: 290,
    conversionRate: 8.7
  }
};

const Dashboard: React.FC = () => {
  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ['dashboardData'],
    queryFn: () => {
      // Simula uma chamada de API
      return new Promise((resolve) => {
        setTimeout(() => resolve(mockData), 800);
      });
    }
  });

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-gray-400">Carregando dados do dashboard...</p>
      </div>
    );
  }

  const data = dashboardData as typeof mockData;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">
          Visão geral do desempenho das suas campanhas de prospecção.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <KpiCard 
          title="Total de Leads" 
          value={data.kpis.totalLeads.toLocaleString()} 
          trend={+12.5} 
          description="Desde o último mês"
          icon="users"
        />
        <KpiCard 
          title="Leads Ativos" 
          value={data.kpis.activeLeads.toLocaleString()} 
          trend={+8.2} 
          description="Em processo de qualificação"
          icon="user"
        />
        <KpiCard 
          title="Reuniões Agendadas" 
          value={data.kpis.meetingsBooked.toLocaleString()} 
          trend={+15.3} 
          description="Desde o último mês"
          icon="calendar"
        />
        <KpiCard 
          title="Taxa de Conversão" 
          value={`${data.kpis.conversionRate}%`} 
          trend={+3.4} 
          description="Em relação à média anterior"
          icon="bar-chart"
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Desempenho da Campanha</CardTitle>
            <CardDescription className="text-gray-400">
              Total de leads gerados e reuniões agendadas por mês
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.campaignPerformance}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey="month" 
                    stroke="#9CA3AF"
                    tick={{ fill: '#9CA3AF' }}
                  />
                  <YAxis 
                    stroke="#9CA3AF"
                    tick={{ fill: '#9CA3AF' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      borderColor: '#374151',
                      color: 'white' 
                    }}
                  />
                  <Bar dataKey="leads" name="Leads" fill="#9b87f5" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="meetings" name="Reuniões" fill="#33C3F0" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Leads Quentes</CardTitle>
            <CardDescription className="text-gray-400">
              Leads com maior probabilidade de conversão
            </CardDescription>
          </CardHeader>
          <CardContent>
            <HotLeadsList />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Taxa de Conversão</CardTitle>
            <CardDescription className="text-gray-400">
              Percentual de leads que se convertem em reuniões
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.conversionRates}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey="week" 
                    stroke="#9CA3AF"
                    tick={{ fill: '#9CA3AF' }}
                  />
                  <YAxis 
                    stroke="#9CA3AF"
                    tick={{ fill: '#9CA3AF' }}
                    domain={[0, 'dataMax + 2']}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Taxa de Conversão']}
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      borderColor: '#374151',
                      color: 'white' 
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="rate" 
                    name="Taxa" 
                    stroke="#9b87f5" 
                    strokeWidth={2} 
                    dot={{ fill: '#9b87f5', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, fill: '#33C3F0' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Melhores Horários de Contato</CardTitle>
            <CardDescription className="text-gray-400">
              Probabilidade de resposta por dia e hora
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ContactTimeHeatMap />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Progresso da Campanha</CardTitle>
            <CardDescription className="text-gray-400">
              Status atual das campanhas ativas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <CampaignProgressCard 
                name="Growth Hack B2B" 
                progress={68} 
                leads={250} 
                target={370}
              />
              <CampaignProgressCard 
                name="Expansão Varejo" 
                progress={32} 
                leads={80} 
                target={250}
              />
              <CampaignProgressCard 
                name="E-commerce Automation" 
                progress={15} 
                leads={30} 
                target={200}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
