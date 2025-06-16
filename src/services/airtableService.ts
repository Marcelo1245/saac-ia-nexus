
interface AirtableRecord {
  fields: {
    Nome: string;
    Email: string;
    Telefone?: string;
    Empresa?: string;
    Mensagem?: string;
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
    try {
      const record: AirtableRecord = {
        fields: {
          Nome: data.name,
          Email: data.email,
          Telefone: data.phone || '',
          Empresa: data.company || '',
          Mensagem: data.message || '',
          'Data de Contato': new Date().toISOString(),
        },
      };

      const response = await fetch(`${this.baseUrl}/${this.baseId}/${this.tableId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(record),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Airtable API Error:', errorData);
        throw new Error(`Airtable API Error: ${response.status}`);
      }

      const result = await response.json();
      console.log('Registro criado no Airtable:', result);
      return true;
    } catch (error) {
      console.error('Erro ao criar registro no Airtable:', error);
      throw error;
    }
  }

  async testConnection(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/${this.baseId}/${this.tableId}?maxRecords=1`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
      });

      return response.ok;
    } catch (error) {
      console.error('Erro ao testar conexão com Airtable:', error);
      return false;
    }
  }
}

export default AirtableService;
