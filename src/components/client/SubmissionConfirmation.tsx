import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { DownloadIcon, CheckCircle, Clock, Terminal, Rocket } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SubmissionConfirmationProps {
  onNewCampaign: () => void;
  onScheduleCall: () => void;
  campaignFilters: any;
  campaignName: string;
}

const SubmissionConfirmation: React.FC<SubmissionConfirmationProps> = ({
  onNewCampaign,
  onScheduleCall,
  campaignFilters,
  campaignName
}) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [currentLogIndex, setCurrentLogIndex] = useState(0);
  const [showAllLogs, setShowAllLogs] = useState(false);
  const [downloadTriggered, setDownloadTriggered] = useState(false);
  
  // Generate a random campaign ticket number
  const campaignId = `SAAC-${Math.floor(100 + Math.random() * 900)}`;
  
  // Terminal logs to display
  const terminalLogs = [
    `[SAAC] Solicitação recebida às ${new Date().toLocaleTimeString()}`,
    `[SAAC] Verificando integridade dos dados...`,
    `[SAAC] Configuração validada com sucesso!`,
    `[SAAC] Equipe acionada (Ticket #${campaignId}) ✅`,
    `[SAAC] Tempo estimado de processamento: 2h úteis`,
    `[SAAC] Exportando configurações de campanha...`,
    `[SAAC] Download automático iniciado`,
    `[SAAC] Configuração "${campaignName || 'Nova Campanha'}" registrada`
  ];

  // Run confetti explosion
  useEffect(() => {
    const runConfetti = () => {
      const count = 200;
      const defaults = {
        origin: { y: 0.7 }
      };

      const fire = (particleRatio: number, opts: confetti.Options) => {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio)
        });
      };

      fire(0.25, {
        spread: 26,
        startVelocity: 55,
        origin: { y: 0.7 }
      });

      fire(0.2, {
        spread: 60,
        origin: { y: 0.7 }
      });

      fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8,
        origin: { y: 0.7 }
      });

      fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2,
        origin: { y: 0.7 }
      });

      fire(0.1, {
        spread: 120,
        startVelocity: 45,
        origin: { y: 0.7 }
      });
    };

    runConfetti();
  }, []);

  // Simulate terminal logs appearing one by one
  useEffect(() => {
    if (currentLogIndex < terminalLogs.length) {
      const timer = setTimeout(() => {
        setLogs(prev => [...prev, terminalLogs[currentLogIndex]]);
        setCurrentLogIndex(currentLogIndex + 1);
      }, 800);
      
      return () => clearTimeout(timer);
    } else if (!downloadTriggered) {
      // Auto-download the JSON file after all logs are displayed
      const timer = setTimeout(() => {
        handleDownload();
        setDownloadTriggered(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [currentLogIndex, downloadTriggered, terminalLogs]);

  // Download campaign configuration as JSON
  const handleDownload = () => {
    const campaignData = {
      name: campaignName || 'Nova Campanha',
      id: campaignId,
      created_at: new Date().toISOString(),
      filters: campaignFilters,
      status: 'pending'
    };

    const dataStr = JSON.stringify(campaignData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = `${campaignName || 'saac-campaign'}-filtros.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex justify-center">
        <div className="w-20 h-20 bg-[#00C4A3]/20 rounded-full flex items-center justify-center">
          <div className="w-16 h-16 bg-[#00C4A3]/40 rounded-full flex items-center justify-center">
            <div className="w-12 h-12 bg-[#00C4A3] rounded-full flex items-center justify-center text-white">
              <CheckCircle size={24} />
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Solicitação enviada com sucesso!</h2>
        <p className="text-gray-600">
          Nossa equipe analisará seus filtros e entrará em contato em breve com os resultados.
        </p>
      </div>
      
      <div className="bg-gray-900 rounded-md p-4 font-mono text-sm text-green-400 overflow-hidden">
        <div className="flex items-center mb-2">
          <Terminal size={16} className="mr-2" />
          <span className="text-xs text-gray-400">SAAC Terminal</span>
        </div>
        
        <div className="space-y-2">
          {logs.map((log, index) => (
            <div key={index} className="animate-fade-in">
              {log}
            </div>
          ))}
          
          {!showAllLogs && logs.length === terminalLogs.length && (
            <div className="animate-pulse">[SAAC] Aguardando próximas instruções...</div>
          )}
        </div>
      </div>
      
      <Alert className="bg-[#2563EB]/10 border-[#2563EB]/20">
        <div className="flex items-start">
          <Clock className="h-4 w-4 text-[#2563EB] mt-0.5 mr-2" />
          <AlertDescription>
            <p className="text-[#2563EB] font-medium mb-1">Próximos passos</p>
            <p className="mb-4 text-gray-600">
              Nossa equipe analisará sua solicitação e entrará em contato em até 24 horas com os primeiros resultados. Você receberá atualizações por email.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                variant="outline" 
                className="text-[#2563EB] border-[#2563EB] hover:bg-[#2563EB]/10"
                onClick={onScheduleCall}
              >
                Agendar call de alinhamento
              </Button>
              
              <Button 
                variant="outline"
                className="gap-2"
                onClick={handleDownload}
              >
                <DownloadIcon size={16} />
                Baixar configuração
              </Button>
            </div>
          </AlertDescription>
        </div>
      </Alert>
      
      <div className="flex justify-center mt-8">
        <Button 
          variant="outline" 
          className="gap-2"
          onClick={onNewCampaign}
        >
          <Rocket size={16} />
          Iniciar nova campanha
        </Button>
      </div>
    </div>
  );
};

export default SubmissionConfirmation;
