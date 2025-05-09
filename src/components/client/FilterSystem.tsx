
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  MapPin, 
  Building, 
  Users, 
  Activity, 
  Search, 
  Filter,
  Download,
  HelpCircle 
} from 'lucide-react';
import { ProspectingFilters as ProspectingFiltersType } from '@/types/prospecting';

export interface FilterSystemProps {
  onFiltersChange: (filters: Partial<ProspectingFiltersType>) => void;
  onCampaignNameChange: (name: string) => void;
  initialFilters?: Partial<ProspectingFiltersType>;
  initialCampaignName?: string;
  onSaveFilters?: () => void;
  onExportFilters?: () => void;
  onPreviewClick?: () => void;
  estimatedLeads?: number;
  isMobile?: boolean;
}

const FilterSystem: React.FC<FilterSystemProps> = ({
  onFiltersChange,
  onCampaignNameChange,
  initialFilters = {},
  initialCampaignName = '',
  onSaveFilters,
  onExportFilters,
  onPreviewClick,
  estimatedLeads = 0,
  isMobile = false
}) => {
  const [activeTab, setActiveTab] = useState("location");
  const [filters, setFilters] = useState<Partial<ProspectingFiltersType>>(initialFilters);
  const [campaignName, setCampaignName] = useState<string>(initialCampaignName);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFiltersCount, setSelectedFiltersCount] = useState<Record<string, number>>({
    location: 0,
    company: 0,
    people: 0,
    engagement: 0,
    custom: 0
  });

  // Update parent component when filters change
  useEffect(() => {
    onFiltersChange(filters);
    
    // Count filters per category
    const locationCount = (filters.countries?.length || 0) + 
                          (filters.states?.length || 0) + 
                          (filters.zipCodes?.length || 0) + 
                          (filters.radius ? 1 : 0);
    
    const companyCount = (filters.industries?.length || 0) + 
                         (filters.companySizes?.length || 0) + 
                         (filters.revenue?.length || 0) + 
                         (filters.techStacks?.length || 0);
    
    const peopleCount = (filters.hierarchyLevels?.length || 0) + 
                        (filters.functionalRoles?.length || 0) + 
                        (filters.departments?.length || 0);
    
    const engagementCount = (filters.interactions?.length || 0) + 
                            (filters.recentActivities?.length || 0);
    
    const customCount = (filters.customTags?.length || 0);
    
    setSelectedFiltersCount({
      location: locationCount,
      company: companyCount,
      people: peopleCount,
      engagement: engagementCount,
      custom: customCount
    });
  }, [filters, onFiltersChange]);

  // Handle campaign name change
  useEffect(() => {
    onCampaignNameChange(campaignName);
  }, [campaignName, onCampaignNameChange]);

  // Update filter function
  const updateFilter = (category: keyof ProspectingFiltersType, value: any) => {
    setFilters(prev => ({
      ...prev,
      [category]: value
    }));
  };

  // Toggle filter value in array
  const toggleFilterValue = (category: keyof ProspectingFiltersType, value: string) => {
    setFilters(prev => {
      const currentValues = prev[category] as string[] || [];
      const valueExists = currentValues.includes(value);
      
      const newValues = valueExists
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      
      return {
        ...prev,
        [category]: newValues
      };
    });
  };

  // Check if value is selected in filter
  const isValueSelected = (category: keyof ProspectingFiltersType, value: string): boolean => {
    return (filters[category] as string[] || []).includes(value);
  };

  // Component for each filter group
  const FilterGroup = ({ 
    title, 
    description, 
    children,
    helpText
  }: {
    title: string, 
    description?: string, 
    children: React.ReactNode,
    helpText?: string
  }) => (
    <div className="space-y-2 mb-6">
      <div className="flex items-center">
        <h3 className="text-sm font-medium text-gray-800">{title}</h3>
        {helpText && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6 ml-1">
                  <HelpCircle className="h-4 w-4 text-gray-400" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs text-xs">{helpText}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      {description && <p className="text-xs text-gray-500">{description}</p>}
      <div className="mt-1">{children}</div>
    </div>
  );

  // Render filter chips for selected options
  const FilterChips = ({ category }: { category: keyof ProspectingFiltersType }) => {
    const values = filters[category] as string[] || [];
    
    if (values.length === 0) return null;
    
    return (
      <div className="flex flex-wrap gap-1 mt-2">
        {values.map(value => (
          <Badge 
            key={value} 
            variant="outline"
            className="bg-white text-xs px-2 py-0.5 flex items-center gap-1"
          >
            {value}
            <Button
              variant="ghost"
              size="icon"
              className="h-3 w-3 ml-1 p-0"
              onClick={() => toggleFilterValue(category, value)}
            >
              <span className="sr-only">Remove</span>
              <svg width="5" height="5" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.5 1.5L4.5 4.5M1.5 4.5L4.5 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </Button>
          </Badge>
        ))}
      </div>
    );
  };

  // Mobile view: accordion style
  if (isMobile) {
    return (
      <div className="space-y-4">
        <div className="mb-4">
          <Label htmlFor="campaignName">Nome da Campanha</Label>
          <Input
            id="campaignName"
            value={campaignName}
            onChange={(e) => setCampaignName(e.target.value)}
            placeholder="Ex: Prospecção Q2 2024"
            className="mt-1"
          />
        </div>
        
        <div className="relative mb-4">
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar filtros..."
            className="pl-10"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
        </div>
        
        <Accordion type="single" collapsible>
          <AccordionItem value="location">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-gray-500" />
                <span>Localização</span>
                {selectedFiltersCount.location > 0 && (
                  <Badge variant="secondary" className="ml-2 bg-[#2563EB]/10 text-[#2563EB]">
                    {selectedFiltersCount.location}
                  </Badge>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              {/* Location filters */}
              <div className="space-y-4 p-1">
                {/* Insert location filter components here */}
              </div>
            </AccordionContent>
          </AccordionItem>
          
          {/* Similar accordion items for other filter categories */}
        </Accordion>
        
        <div className="mt-6 flex justify-between">
          <Button variant="outline" className="gap-2" onClick={onExportFilters}>
            <Download size={16} />
            Exportar Filtros
          </Button>
          
          <Button className="gap-2 bg-[#2563EB]" onClick={onPreviewClick}>
            Pré-visualizar ({estimatedLeads})
          </Button>
        </div>
      </div>
    );
  }

  // Desktop view: tabs style
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
        <div className="w-full sm:w-2/3">
          <Label htmlFor="campaignName">Nome da Campanha</Label>
          <Input
            id="campaignName"
            value={campaignName}
            onChange={(e) => setCampaignName(e.target.value)}
            placeholder="Ex: Prospecção Q2 2024"
            className="mt-1"
          />
        </div>
        
        <div className="w-full sm:w-1/3 relative">
          <Label htmlFor="searchFilters">Buscar filtros</Label>
          <div className="relative mt-1">
            <Input
              id="searchFilters"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar..."
              className="pl-10"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="location" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5 mb-4">
          <TabsTrigger value="location" className="flex items-center gap-1">
            <MapPin size={16} />
            <span className="hidden sm:inline">Localização</span>
            {selectedFiltersCount.location > 0 && (
              <Badge variant="secondary" className="ml-1 bg-[#2563EB]/10 text-[#2563EB]">
                {selectedFiltersCount.location}
              </Badge>
            )}
          </TabsTrigger>
          
          <TabsTrigger value="company" className="flex items-center gap-1">
            <Building size={16} />
            <span className="hidden sm:inline">Empresa</span>
            {selectedFiltersCount.company > 0 && (
              <Badge variant="secondary" className="ml-1 bg-[#2563EB]/10 text-[#2563EB]">
                {selectedFiltersCount.company}
              </Badge>
            )}
          </TabsTrigger>
          
          <TabsTrigger value="people" className="flex items-center gap-1">
            <Users size={16} />
            <span className="hidden sm:inline">Pessoas</span>
            {selectedFiltersCount.people > 0 && (
              <Badge variant="secondary" className="ml-1 bg-[#2563EB]/10 text-[#2563EB]">
                {selectedFiltersCount.people}
              </Badge>
            )}
          </TabsTrigger>
          
          <TabsTrigger value="engagement" className="flex items-center gap-1">
            <Activity size={16} />
            <span className="hidden sm:inline">Engajamento</span>
            {selectedFiltersCount.engagement > 0 && (
              <Badge variant="secondary" className="ml-1 bg-[#2563EB]/10 text-[#2563EB]">
                {selectedFiltersCount.engagement}
              </Badge>
            )}
          </TabsTrigger>
          
          <TabsTrigger value="custom" className="flex items-center gap-1">
            <Filter size={16} />
            <span className="hidden sm:inline">Personalizado</span>
            {selectedFiltersCount.custom > 0 && (
              <Badge variant="secondary" className="ml-1 bg-[#2563EB]/10 text-[#2563EB]">
                {selectedFiltersCount.custom}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="location" className="space-y-4 p-1">
          <FilterGroup 
            title="País" 
            helpText="Selecione os países onde deseja encontrar leads."
          >
            <div className="grid grid-cols-2 gap-2">
              {["Brasil", "Estados Unidos", "Portugal", "Argentina", "Chile", "Colômbia"].map(country => (
                <div key={country} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`country-${country}`} 
                    checked={isValueSelected('countries', country)}
                    onCheckedChange={() => toggleFilterValue('countries', country)}
                  />
                  <Label htmlFor={`country-${country}`} className="text-sm">{country}</Label>
                </div>
              ))}
            </div>
            <FilterChips category="countries" />
          </FilterGroup>
          
          <FilterGroup 
            title="Estado" 
            helpText="Filtre leads por estados específicos."
          >
            <div className="grid grid-cols-3 gap-2">
              {["São Paulo", "Rio de Janeiro", "Minas Gerais", "Paraná", "Santa Catarina", "Rio Grande do Sul"].map(state => (
                <div key={state} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`state-${state}`} 
                    checked={isValueSelected('states', state)}
                    onCheckedChange={() => toggleFilterValue('states', state)}
                  />
                  <Label htmlFor={`state-${state}`} className="text-sm">{state}</Label>
                </div>
              ))}
            </div>
            <FilterChips category="states" />
          </FilterGroup>
          
          <FilterGroup 
            title="Raio de Distância" 
            description="Defina um raio de distância em torno de um CEP específico"
            helpText="Isso permite encontrar leads geograficamente próximos a um ponto central."
          >
            <div className="space-y-4">
              <div>
                <Label htmlFor="zipCode" className="text-sm">CEP Central</Label>
                <Input 
                  id="zipCode" 
                  placeholder="Ex: 01310-100" 
                  className="mt-1"
                />
              </div>
              
              <div>
                <div className="flex justify-between">
                  <Label className="text-sm">Raio (Km): {filters.radius || 0}</Label>
                </div>
                <Slider
                  defaultValue={[filters.radius as number || 0]}
                  max={100}
                  step={5}
                  className="mt-1"
                  onValueChange={(value) => updateFilter('radius', value[0])}
                />
              </div>
            </div>
          </FilterGroup>
        </TabsContent>
        
        <TabsContent value="company" className="space-y-4 p-1">
          <FilterGroup 
            title="Indústria" 
            helpText="Selecione os segmentos de mercado das empresas que deseja alcançar."
          >
            <div className="grid grid-cols-2 gap-2">
              {["SaaS", "Finanças", "Varejo", "Saúde", "Educação", "Tecnologia", "Manufatura", "Serviços"].map(industry => (
                <div key={industry} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`industry-${industry}`} 
                    checked={isValueSelected('industries', industry)}
                    onCheckedChange={() => toggleFilterValue('industries', industry)}
                  />
                  <Label htmlFor={`industry-${industry}`} className="text-sm">{industry}</Label>
                </div>
              ))}
            </div>
            <FilterChips category="industries" />
          </FilterGroup>
          
          <FilterGroup 
            title="Tamanho da Empresa" 
            helpText="Filtre empresas pelo número de funcionários."
          >
            <div className="grid grid-cols-3 gap-2">
              {["1-10", "11-50", "51-200", "201-500", "501-1000", "1000+"].map(size => (
                <div key={size} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`size-${size}`} 
                    checked={isValueSelected('companySizes', size)}
                    onCheckedChange={() => toggleFilterValue('companySizes', size)}
                  />
                  <Label htmlFor={`size-${size}`} className="text-sm">{size} func.</Label>
                </div>
              ))}
            </div>
            <FilterChips category="companySizes" />
          </FilterGroup>
          
          <FilterGroup 
            title="Tecnologias Utilizadas" 
            helpText="Encontre empresas que utilizam tecnologias específicas."
          >
            <div className="grid grid-cols-2 gap-2">
              {["CRM", "ERP", "Marketing Automation", "Cloud Services", "WordPress", "E-commerce", "Data Analytics"].map(tech => (
                <div key={tech} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`tech-${tech}`} 
                    checked={isValueSelected('techStacks', tech)}
                    onCheckedChange={() => toggleFilterValue('techStacks', tech)}
                  />
                  <Label htmlFor={`tech-${tech}`} className="text-sm">{tech}</Label>
                </div>
              ))}
            </div>
            <FilterChips category="techStacks" />
          </FilterGroup>
        </TabsContent>
        
        <TabsContent value="people" className="space-y-4 p-1">
          <FilterGroup 
            title="Nível Hierárquico" 
            helpText="Filtre por cargos de diferentes níveis hierárquicos."
          >
            <div className="grid grid-cols-3 gap-2">
              {["C-Level", "VP/Diretor", "Gerente", "Coordenador", "Especialista", "Analista"].map(level => (
                <div key={level} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`level-${level}`} 
                    checked={isValueSelected('hierarchyLevels', level)}
                    onCheckedChange={() => toggleFilterValue('hierarchyLevels', level)}
                  />
                  <Label htmlFor={`level-${level}`} className="text-sm">{level}</Label>
                </div>
              ))}
            </div>
            <FilterChips category="hierarchyLevels" />
          </FilterGroup>
          
          <FilterGroup 
            title="Departamento" 
            helpText="Selecione os departamentos que deseja alcançar."
          >
            <div className="grid grid-cols-3 gap-2">
              {["Vendas", "Marketing", "TI", "RH", "Financeiro", "Operações", "Produto", "Executivo"].map(dept => (
                <div key={dept} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`dept-${dept}`} 
                    checked={isValueSelected('departments', dept)}
                    onCheckedChange={() => toggleFilterValue('departments', dept)}
                  />
                  <Label htmlFor={`dept-${dept}`} className="text-sm">{dept}</Label>
                </div>
              ))}
            </div>
            <FilterChips category="departments" />
          </FilterGroup>
          
          <FilterGroup 
            title="Função Profissional" 
            helpText="Filtre por função específica dentro dos departamentos."
          >
            <div className="grid grid-cols-2 gap-2">
              {["CMO", "CFO", "CTO", "CEO", "Diretor de Marketing", "Diretor de Vendas", "Head de Growth", "VP de Produto"].map(role => (
                <div key={role} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`role-${role}`} 
                    checked={isValueSelected('functionalRoles', role)}
                    onCheckedChange={() => toggleFilterValue('functionalRoles', role)}
                  />
                  <Label htmlFor={`role-${role}`} className="text-sm">{role}</Label>
                </div>
              ))}
            </div>
            <FilterChips category="functionalRoles" />
          </FilterGroup>
        </TabsContent>
        
        <TabsContent value="engagement" className="space-y-4 p-1">
          <FilterGroup 
            title="Interações Recentes" 
            helpText="Filtre por contatos que tiveram interações específicas com sua marca."
          >
            <div className="grid grid-cols-2 gap-2">
              {[
                "Visitou o site", 
                "Baixou conteúdo", 
                "Participou de webinar", 
                "Solicitou demonstração", 
                "Abriu email", 
                "Clicou em anúncio"
              ].map(interaction => (
                <div key={interaction} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`interaction-${interaction}`} 
                    checked={isValueSelected('interactions', interaction)}
                    onCheckedChange={() => toggleFilterValue('interactions', interaction)}
                  />
                  <Label htmlFor={`interaction-${interaction}`} className="text-sm">{interaction}</Label>
                </div>
              ))}
            </div>
            <FilterChips category="interactions" />
          </FilterGroup>
          
          <FilterGroup 
            title="Eventos Recentes" 
            helpText="Encontre pessoas com mudanças recentes que indicam oportunidades de venda."
          >
            <div className="grid grid-cols-2 gap-2">
              {[
                "Mudança de cargo", 
                "Nova contratação", 
                "Levantou investimento", 
                "Expansão", 
                "Fusão/Aquisição", 
                "Lançamento de produto"
              ].map(event => (
                <div key={event} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`event-${event}`} 
                    checked={isValueSelected('recentActivities', event)}
                    onCheckedChange={() => toggleFilterValue('recentActivities', event)}
                  />
                  <Label htmlFor={`event-${event}`} className="text-sm">{event}</Label>
                </div>
              ))}
            </div>
            <FilterChips category="recentActivities" />
          </FilterGroup>
        </TabsContent>
        
        <TabsContent value="custom" className="space-y-4 p-1">
          <FilterGroup 
            title="Tags exclusivas SAAC" 
            helpText="Filtros personalizados baseados em nossa IA proprietária."
          >
            <div className="grid grid-cols-2 gap-2">
              {[
                "Alta propensão de compra", 
                "Fit ideal", 
                "Expansão recente", 
                "Tech-savvy", 
                "Early adopter", 
                "Interesse em IA", 
                "Alto budget", 
                "Decision maker"
              ].map(tag => (
                <div key={tag} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`tag-${tag}`} 
                    checked={isValueSelected('customTags', tag)}
                    onCheckedChange={() => toggleFilterValue('customTags', tag)}
                  />
                  <Label htmlFor={`tag-${tag}`} className="text-sm">{tag}</Label>
                </div>
              ))}
            </div>
            <FilterChips category="customTags" />
          </FilterGroup>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-between">
        {onSaveFilters && (
          <Button variant="outline" className="gap-2" onClick={onSaveFilters}>
            Salvar Configuração
          </Button>
        )}
        
        {onExportFilters && (
          <Button variant="outline" className="gap-2" onClick={onExportFilters}>
            <Download size={16} />
            Exportar Filtros
          </Button>
        )}
        
        {onPreviewClick && (
          <Button className="gap-2 bg-[#2563EB]" onClick={onPreviewClick}>
            Pré-visualizar ({estimatedLeads})
          </Button>
        )}
      </div>
    </div>
  );
};

export default FilterSystem;
