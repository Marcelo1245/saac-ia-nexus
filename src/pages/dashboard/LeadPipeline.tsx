
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Lead } from '@/types/prospecting';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  MessageSquare, 
  Phone, 
  Mail, 
  Calendar, 
  ArrowUpDown,
  ChevronDown,
  Star
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow 
} from '@/components/ui/table';
import { KanbanBoard } from '@/components/leads/KanbanBoard';

// Dados simulados
const mockLeads: Lead[] = [
  {
    id: '1',
    firstName: 'Carlos',
    lastName: 'Silva',
    email: 'carlos.silva@techsoft.com',
    company: 'TechSoft',
    position: 'Diretor de TI',
    linkedInUrl: 'https://linkedin.com/in/carlossilva',
    industry: 'SaaS',
    companySize: '51-200',
    status: 'new',
    score: 92,
    lastActivity: new Date(2023, 4, 15),
    notes: 'Demonstrou interesse em automação de vendas',
    campaignId: 'camp1'
  },
  {
    id: '2',
    firstName: 'Mariana',
    lastName: 'Costa',
    email: 'mariana.costa@ecommercego.com',
    company: 'EcommerceGo',
    position: 'VP de Marketing',
    linkedInUrl: 'https://linkedin.com/in/marianacosta',
    industry: 'E-commerce',
    companySize: '11-50',
    status: 'contacted',
    score: 88,
    lastActivity: new Date(2023, 4, 18),
    campaignId: 'camp1'
  },
  {
    id: '3',
    firstName: 'André',
    lastName: 'Mendes',
    email: 'andre.mendes@saassolutions.com',
    company: 'SaaS Solutions',
    position: 'CEO',
    linkedInUrl: 'https://linkedin.com/in/andremendes',
    industry: 'SaaS',
    companySize: '11-50',
    status: 'engaged',
    score: 85,
    lastActivity: new Date(2023, 4, 20),
    notes: 'Solicitou uma demonstração',
    campaignId: 'camp1'
  },
  {
    id: '4',
    firstName: 'Luiza',
    lastName: 'Santos',
    email: 'luiza.santos@fintechcapital.com',
    company: 'FinTech Capital',
    position: 'Diretora de Inovação',
    linkedInUrl: 'https://linkedin.com/in/luizasantos',
    industry: 'Fintech',
    companySize: '201-500',
    status: 'qualified',
    score: 79,
    lastActivity: new Date(2023, 4, 22),
    campaignId: 'camp1'
  },
  {
    id: '5',
    firstName: 'Ricardo',
    lastName: 'Oliveira',
    email: 'ricardo.oliveira@datainsights.com',
    company: 'Data Insights',
    position: 'CTO',
    linkedInUrl: 'https://linkedin.com/in/ricardooliveira',
    industry: 'SaaS',
    companySize: '51-200',
    status: 'converted',
    score: 95,
    lastActivity: new Date(2023, 4, 25),
    notes: 'Reunião marcada para 30/05',
    campaignId: 'camp1'
  },
  {
    id: '6',
    firstName: 'Juliana',
    lastName: 'Pereira',
    email: 'juliana.pereira@retailtech.com',
    company: 'RetailTech',
    position: 'Head de Operações',
    linkedInUrl: 'https://linkedin.com/in/julianapereira',
    industry: 'Retail',
    companySize: '201-500',
    status: 'engaged',
    score: 82,
    lastActivity: new Date(2023, 4, 28),
    campaignId: 'camp2'
  },
  {
    id: '7',
    firstName: 'Marcos',
    lastName: 'Almeida',
    email: 'marcos.almeida@cloudservices.com',
    company: 'Cloud Services',
    position: 'VP de Vendas',
    linkedInUrl: 'https://linkedin.com/in/marcosalmeida',
    industry: 'SaaS',
    companySize: '51-200',
    status: 'contacted',
    score: 76,
    lastActivity: new Date(2023, 4, 30),
    campaignId: 'camp2'
  },
  {
    id: '8',
    firstName: 'Fernanda',
    lastName: 'Lima',
    email: 'fernanda.lima@edutech.com',
    company: 'EduTech',
    position: 'Diretora de Marketing',
    linkedInUrl: 'https://linkedin.com/in/fernandalima',
    industry: 'Education',
    companySize: '11-50',
    status: 'new',
    score: 68,
    lastActivity: new Date(2023, 5, 2),
    campaignId: 'camp2'
  }
];

type ViewMode = 'table' | 'kanban';
type SortField = 'name' | 'company' | 'score' | 'lastActivity';
type SortOrder = 'asc' | 'desc';

const LeadPipeline: React.FC = () => {
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('table');
  const [sortField, setSortField] = useState<SortField>('score');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  
  const { data: leads, isLoading } = useQuery({
    queryKey: ['leads'],
    queryFn: () => {
      // Simula uma chamada de API
      return new Promise<Lead[]>((resolve) => {
        setTimeout(() => resolve(mockLeads), 800);
      });
    }
  });
  
  // Função para filtrar leads com base na busca
  const filteredLeads = leads?.filter(lead => {
    if (!search) return true;
    
    const searchLower = search.toLowerCase();
    return (
      `${lead.firstName} ${lead.lastName}`.toLowerCase().includes(searchLower) ||
      lead.company.toLowerCase().includes(searchLower) ||
      lead.position.toLowerCase().includes(searchLower) ||
      lead.email.toLowerCase().includes(searchLower)
    );
  });
  
  // Função para ordenar leads
  const sortedLeads = filteredLeads?.sort((a, b) => {
    if (sortField === 'name') {
      const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
      const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();
      return sortOrder === 'asc' 
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    }
    
    if (sortField === 'company') {
      return sortOrder === 'asc'
        ? a.company.localeCompare(b.company)
        : b.company.localeCompare(a.company);
    }
    
    if (sortField === 'score') {
      return sortOrder === 'asc'
        ? a.score - b.score
        : b.score - a.score;
    }
    
    if (sortField === 'lastActivity') {
      const dateA = a.lastActivity ? a.lastActivity.getTime() : 0;
      const dateB = b.lastActivity ? b.lastActivity.getTime() : 0;
      return sortOrder === 'asc'
        ? dateA - dateB
        : dateB - dateA;
    }
    
    return 0;
  });
  
  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };
  
  // Status badge
  const StatusBadge: React.FC<{ status: Lead['status'] }> = ({ status }) => {
    const statusConfig = {
      new: { label: 'Novo', color: 'bg-blue-500' },
      contacted: { label: 'Contatado', color: 'bg-yellow-500' },
      engaged: { label: 'Engajado', color: 'bg-purple-500' },
      qualified: { label: 'Qualificado', color: 'bg-green-500' },
      converted: { label: 'Convertido', color: 'bg-saac-blue' },
      lost: { label: 'Perdido', color: 'bg-gray-500' }
    };
    
    const config = statusConfig[status];
    
    return (
      <Badge className={`${config.color} hover:${config.color}`}>
        {config.label}
      </Badge>
    );
  };
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Pipeline de Leads</h1>
        <p className="text-gray-400">
          Gerencie e qualifique seus leads em um único lugar.
        </p>
      </div>
      
      <Card className="bg-gray-800 border-gray-700 mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-auto flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar leads..."
                className="pl-10 bg-gray-700 border-gray-600 w-full"
              />
            </div>
            
            <div className="flex items-center space-x-2 w-full md:w-auto">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="border-gray-600 text-white">
                    <Filter className="h-4 w-4 mr-2" />
                    Filtrar
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuGroup>
                    <DropdownMenuItem>Todos os leads</DropdownMenuItem>
                    <DropdownMenuItem>Alta prioridade</DropdownMenuItem>
                    <DropdownMenuItem>Leads novos</DropdownMenuItem>
                    <DropdownMenuItem>Leads qualificados</DropdownMenuItem>
                    <DropdownMenuItem>Leads convertidos</DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <div className="flex bg-gray-700 rounded-md p-1">
                <Button
                  variant={viewMode === 'table' ? 'default' : 'ghost'}
                  size="sm"
                  className={viewMode === 'table' ? 'bg-saac-blue' : 'text-gray-400 hover:text-white'}
                  onClick={() => setViewMode('table')}
                >
                  <ArrowUpDown className="h-4 w-4 mr-1" />
                  Tabela
                </Button>
                <Button
                  variant={viewMode === 'kanban' ? 'default' : 'ghost'}
                  size="sm"
                  className={viewMode === 'kanban' ? 'bg-saac-blue' : 'text-gray-400 hover:text-white'}
                  onClick={() => setViewMode('kanban')}
                >
                  <ArrowUpDown className="h-4 w-4 mr-1 rotate-90" />
                  Kanban
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {isLoading ? (
        <div className="h-64 flex items-center justify-center">
          <p className="text-gray-400">Carregando leads...</p>
        </div>
      ) : (
        viewMode === 'table' ? (
          <Card className="bg-gray-800 border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-gray-700 border-gray-700">
                    <TableHead className="text-gray-400 w-[50px]"></TableHead>
                    <TableHead 
                      className="text-gray-400 cursor-pointer"
                      onClick={() => handleSort('name')}
                    >
                      <div className="flex items-center">
                        Nome
                        {sortField === 'name' && (
                          <ArrowUpDown className={`ml-1 h-4 w-4 ${sortOrder === 'desc' ? 'rotate-180' : ''}`} />
                        )}
                      </div>
                    </TableHead>
                    <TableHead 
                      className="text-gray-400 cursor-pointer"
                      onClick={() => handleSort('company')}
                    >
                      <div className="flex items-center">
                        Empresa
                        {sortField === 'company' && (
                          <ArrowUpDown className={`ml-1 h-4 w-4 ${sortOrder === 'desc' ? 'rotate-180' : ''}`} />
                        )}
                      </div>
                    </TableHead>
                    <TableHead className="text-gray-400">Cargo</TableHead>
                    <TableHead className="text-gray-400">Status</TableHead>
                    <TableHead 
                      className="text-gray-400 cursor-pointer"
                      onClick={() => handleSort('score')}
                    >
                      <div className="flex items-center">
                        Score
                        {sortField === 'score' && (
                          <ArrowUpDown className={`ml-1 h-4 w-4 ${sortOrder === 'desc' ? 'rotate-180' : ''}`} />
                        )}
                      </div>
                    </TableHead>
                    <TableHead 
                      className="text-gray-400 cursor-pointer"
                      onClick={() => handleSort('lastActivity')}
                    >
                      <div className="flex items-center">
                        Última Atividade
                        {sortField === 'lastActivity' && (
                          <ArrowUpDown className={`ml-1 h-4 w-4 ${sortOrder === 'desc' ? 'rotate-180' : ''}`} />
                        )}
                      </div>
                    </TableHead>
                    <TableHead className="text-gray-400">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedLeads?.map((lead) => (
                    <TableRow key={lead.id} className="hover:bg-gray-700 border-gray-700">
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-saac-blue text-white text-xs">
                              {lead.firstName.charAt(0)}{lead.lastName.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium text-white">
                        {lead.firstName} {lead.lastName}
                      </TableCell>
                      <TableCell className="text-gray-300">{lead.company}</TableCell>
                      <TableCell className="text-gray-300">{lead.position}</TableCell>
                      <TableCell>
                        <StatusBadge status={lead.status} />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <div 
                            className={`h-6 w-6 rounded-full flex items-center justify-center ${
                              lead.score >= 80 ? 'bg-green-500/20 text-green-500' :
                              lead.score >= 60 ? 'bg-yellow-500/20 text-yellow-500' :
                              'bg-gray-500/20 text-gray-400'
                            }`}
                          >
                            <Star className="h-3 w-3" />
                          </div>
                          <span className="text-white">{lead.score}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {lead.lastActivity ? lead.lastActivity.toLocaleDateString('pt-BR') : '—'}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button size="icon" variant="ghost" className="h-8 w-8">
                            <Mail className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-8 w-8">
                            <Phone className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-8 w-8">
                            <Calendar className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-8 w-8">
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        ) : (
          <KanbanBoard leads={sortedLeads || []} />
        )
      )}
    </div>
  );
};

export default LeadPipeline;
