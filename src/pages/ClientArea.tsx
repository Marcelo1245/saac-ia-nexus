
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import PageHeader from '@/components/client/PageHeader';
import ICPDefinition from '@/components/client/ICPDefinition';

const ClientArea = () => {
  const navigate = useNavigate();
  const [estimatedLeads, setEstimatedLeads] = useState(0);

  const handleSaveConfiguration = () => {
    toast.success('Configuração do ICP salva com sucesso!');
  };

  const handlePreviewClick = () => {
    setEstimatedLeads(Math.floor(Math.random() * 1000) + 500);
    toast.success('Pré-visualização gerada! Leads estimados atualizados.');
  };

  const handleReturnHome = () => {
    navigate('/');
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <PageHeader 
        title="Área do Cliente"
        onReturnHome={handleReturnHome}
      />
      
      <Card className="border-0 shadow-none">
        <CardContent className="p-0">
          <ICPDefinition
            onSaveConfiguration={handleSaveConfiguration}
            onPreview={handlePreviewClick}
            estimatedLeads={estimatedLeads}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientArea;
