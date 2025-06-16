
interface AirtableRecord {
  fields: {
    'Nome completo': string;
    'E-mail corporativo': string;
    'Telefone'?: string;
    'Empresa'?: string;
    'Mensagem'?: string;
    'Data de Contato': string;
  };
}

interface AirtableResponse {
  records: Array<{
    id: string;
    fields: any;
  }>;
}

class AirtableService {
  private baseUrl = 'https://api.airtable.com/v0';
  private baseId: string;
  private tableId: string;
  private apiKey: string;

  constructor(apiKey: string, baseId: string, tableId: string) {
    this.apiKey = apiKey;
    this.baseId = baseId;
    this.tableId = tableId;
  }

  async createRecord(data: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    message?: string;
  }): Promise<boolean> {
    console.log('🚀 Iniciando envio para Airtable...');
    console.log('📝 Dados recebidos:', data);
    console.log('🔑 API Key (primeiros 10 chars):', this.apiKey.substring(0, 10) + '...');
    console.log('📊 Base ID:', this.baseId);
    console.log('📋 Table ID:', this.tableId);

    try {
      const record = {
        fields: {
          'Nome completo': data.name,
          'E-mail corporativo': data.email,
          'Telefone': data.phone || '',
          'Empresa': data.company || '',
          'Mensagem': data.message || '',
          'Data de Contato': new Date().toISOString(),
        },
      };

      console.log('📦 Record que será enviado:', JSON.stringify(record, null, 2));

      const url = `${this.baseUrl}/${this.baseId}/${this.tableId}`;
      console.log('🌐 URL da requisição:', url);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(record),
      });

      console.log('📡 Status da resposta:', response.status);
      console.log('📡 Headers da resposta:', Object.fromEntries(response.headers.entries()));

      const responseText = await response.text();
      console.log('📄 Resposta completa:', responseText);

      if (!response.ok) {
        let errorData;
        try {
          errorData = JSON.parse(responseText);
        } catch (e) {
          errorData = { message: responseText };
        }
        
        console.error('❌ Erro da API Airtable:', errorData);
        console.error('❌ Status:', response.status);
        console.error('❌ Status Text:', response.statusText);
        
        throw new Error(`Airtable API Error: ${response.status} - ${JSON.stringify(errorData)}`);
      }

      const result = JSON.parse(responseText);
      console.log('✅ Registro criado com sucesso:', result);
      return true;
    } catch (error) {
      console.error('💥 Erro completo ao criar registro:', error);
      console.error('💥 Stack trace:', error instanceof Error ? error.stack : 'No stack trace');
      throw error;
    }
  }

  async testConnection(): Promise<boolean> {
    try {
      console.log('🔍 Testando conexão com Airtable...');
      const response = await fetch(`${this.baseUrl}/${this.baseId}/${this.tableId}?maxRecords=1`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('🔍 Status do teste de conexão:', response.status);
      const testResponse = await response.text();
      console.log('🔍 Resposta do teste:', testResponse);

      return response.ok;
    } catch (error) {
      console.error('❌ Erro ao testar conexão:', error);
      return false;
    }
  }
}

export default AirtableService;
