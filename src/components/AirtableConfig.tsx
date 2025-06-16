
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import AirtableService from '@/services/airtableService';

interface AirtableConfigProps {
  onConfigSaved: (config: AirtableConfig) => void;
}

interface AirtableConfig {
  apiKey: string;
  baseId: string;
  tableId: string;
}

const AirtableConfig: React.FC<AirtableConfigProps> = ({ onConfigSaved }) => {
  const [config, setConfig] = useState<AirtableConfig>({
    apiKey: '',
    baseId: '',
    tableId: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Carregar configuração salva do localStorage
    const savedConfig = localStorage.getItem('airtableConfig');
    if (savedConfig) {
      const parsedConfig = JSON.parse(savedConfig);
      setConfig(parsedConfig);
      onConfigSaved(parsedConfig);
    }
  }, [onConfigSaved]);

  const handleSave = async () => {
    if (!config.apiKey || !config.baseId || !config.tableId) {
      toast.error('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    setIsLoading(true);
    
    try {
      const airtableService = new AirtableService(config.apiKey, config.baseId, config.tableId);
      const connectionTest = await airtableService.testConnection();
      
      if (connectionTest) {
        localStorage.setItem('airtableConfig', JSON.stringify(config));
        onConfigSaved(config);
        toast.success('Configuração do Airtable salva com sucesso!');
      } else {
        toast.error('Erro ao conectar com o Airtable. Verifique suas credenciais.');
      }
    } catch (error) {
      toast.error('Erro ao testar conexão com o Airtable');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto mb-6">
      <CardHeader>
        <CardTitle>Configuração do Airtable</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="apiKey">API Key do Airtable</Label>
          <Input
            id="apiKey"
            type="password"
            placeholder="patXXXXXXXXXXXXXXXX"
            value={config.apiKey}
            onChange={(e) => setConfig(prev => ({ ...prev, apiKey: e.target.value }))}
          />
          <p className="text-sm text-gray-500">
            Sua API key pessoal do Airtable (encontrada em Account → API)
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="baseId">Base ID</Label>
          <Input
            id="baseId"
            placeholder="appXXXXXXXXXXXXXX"
            value={config.baseId}
            onChange={(e) => setConfig(prev => ({ ...prev, baseId: e.target.value }))}
          />
          <p className="text-sm text-gray-500">
            ID da base do Airtable (encontrado na URL da base)
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="tableId">Table ID</Label>
          <Input
            id="tableId"
            placeholder="tblXXXXXXXXXXXXXX"
            value={config.tableId}
            onChange={(e) => setConfig(prev => ({ ...prev, tableId: e.target.value }))}
          />
          <p className="text-sm text-gray-500">
            ID da tabela (encontrado na documentação da API da base)
          </p>
        </div>

        <Button 
          onClick={handleSave}
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? 'Testando conexão...' : 'Salvar e Testar Conexão'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default AirtableConfig;
