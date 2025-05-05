
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import SegmentationFilters from '@/components/client/SegmentationFilters';

const ClientArea: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <div className="min-h-screen bg-saac-dark pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Área do Cliente</h1>
          <p className="text-gray-400">Gerencie suas campanhas e segmentações</p>
        </div>

        <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-gray-800 p-1">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-saac-blue">Dashboard</TabsTrigger>
            <TabsTrigger value="segmentation" className="data-[state=active]:bg-saac-blue">Segmentação</TabsTrigger>
            <TabsTrigger value="campaigns" className="data-[state=active]:bg-saac-blue">Campanhas</TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-saac-blue">Configurações</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Bem-vindo(a), {user?.name || 'Cliente'}</CardTitle>
                  <CardDescription>Resumo das suas atividades</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Campanhas ativas:</span>
                    <span className="text-white font-medium">0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Leads gerados:</span>
                    <span className="text-white font-medium">0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Conversões:</span>
                    <span className="text-white font-medium">0</span>
                  </div>
                  <Button 
                    onClick={() => setActiveTab("segmentation")} 
                    className="w-full bg-saac-blue hover:bg-blue-700 mt-4"
                  >
                    Iniciar Nova Campanha
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Status da Conta</CardTitle>
                  <CardDescription>Detalhes do seu plano</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Plano Atual:</span>
                    <span className="text-white font-medium">Gratuito</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Leads Disponíveis:</span>
                    <span className="text-white font-medium">50/mês</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Utilização:</span>
                    <span className="text-white font-medium">0%</span>
                  </div>
                  <Button className="w-full bg-gradient-blue hover:opacity-90 mt-4">
                    Upgrade de Plano
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="segmentation" className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Configuração de Segmentação</CardTitle>
                <CardDescription>Defina os filtros para seu público-alvo</CardDescription>
              </CardHeader>
              <CardContent>
                <SegmentationFilters />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="campaigns" className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Suas Campanhas</CardTitle>
                <CardDescription>Gerenciamento de campanhas ativas</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <p className="text-gray-400 mb-4">Você ainda não possui campanhas ativas.</p>
                <Button 
                  onClick={() => setActiveTab("segmentation")} 
                  className="bg-saac-blue hover:bg-blue-700"
                >
                  Criar Nova Campanha
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Configurações da Conta</CardTitle>
                <CardDescription>Gerencie as configurações da sua conta</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-white font-medium">Informações Pessoais</h3>
                  <p className="text-gray-400">Atualize suas informações de perfil e preferências</p>
                </div>
                <div className="space-y-1">
                  <h3 className="text-white font-medium">Segurança</h3>
                  <p className="text-gray-400">Altere sua senha e configurações de segurança</p>
                </div>
                <div className="space-y-1">
                  <h3 className="text-white font-medium">Notificações</h3>
                  <p className="text-gray-400">Gerencie suas preferências de notificação</p>
                </div>
                <div className="space-y-1">
                  <h3 className="text-white font-medium">Faturamento</h3>
                  <p className="text-gray-400">Visualize faturas e atualize métodos de pagamento</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8 text-center">
          <Link to="/" className="text-gray-400 hover:text-saac-blue transition-colors">
            Voltar para página inicial
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ClientArea;
