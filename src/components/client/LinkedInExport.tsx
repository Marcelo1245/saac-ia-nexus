
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy, Download, ExternalLink } from 'lucide-react';
import { ProspectingFilters } from '@/types/prospecting';
import { toast } from 'sonner';

interface LinkedInExportProps {
  filters: Partial<ProspectingFilters>;
  campaignName: string;
}

const LinkedInExport: React.FC<LinkedInExportProps> = ({ filters, campaignName }) => {
  
  const formatFiltersForLinkedIn = () => {
    const linkedinFilters: any = {};
    
    // Localização
    if (filters.countries?.length) {
      linkedinFilters.geoUrn = filters.countries;
    }
    if (filters.states?.length) {
      linkedinFilters.regionUrn = filters.states;
    }
    if (filters.cities?.length) {
      linkedinFilters.cityUrn = filters.cities;
    }
    
    // Empresa
    if (filters.industries?.length) {
      linkedinFilters.industry = filters.industries;
    }
    if (filters.companySizes?.length) {
      linkedinFilters.companySize = filters.companySizes;
    }
    
    // Pessoas
    if (filters.hierarchyLevels?.length) {
      linkedinFilters.seniorityLevel = filters.hierarchyLevels;
    }
    if (filters.functionalRoles?.length) {
      linkedinFilters.function = filters.functionalRoles;
    }
    if (filters.departments?.length) {
      linkedinFilters.title = filters.departments;
    }
    
    // Cargos e empresas específicas
    const companies = (filters.customTags || [])
      .filter(tag => tag.startsWith('company:'))
      .map(tag => tag.replace('company:', ''));
    
    const titles = (filters.customTags || [])
      .filter(tag => tag.startsWith('title:'))
      .map(tag => tag.replace('title:', ''));
    
    if (companies.length) {
      linkedinFilters.currentCompany = companies;
    }
    if (titles.length) {
      linkedinFilters.currentTitle = titles;
    }
    
    return linkedinFilters;
  };

  const generateLinkedInURL = () => {
    const baseURL = "https://www.linkedin.com/sales/search/people";
    const formattedFilters = formatFiltersForLinkedIn();
    
    // Converter filtros para parâmetros de URL do Sales Navigator
    const params = new URLSearchParams();
    
    Object.entries(formattedFilters).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item, index) => {
          params.append(`${key}[${index}]`, item);
        });
      } else {
        params.append(key, value as string);
      }
    });
    
    return `${baseURL}?${params.toString()}`;
  };

  const copyToClipboard = () => {
    const formattedFilters = formatFiltersForLinkedIn();
    const filterText = JSON.stringify(formattedFilters, null, 2);
    
    navigator.clipboard.writeText(filterText).then(() => {
      toast.success('Filtros copiados para a área de transferência!');
    }).catch(() => {
      toast.error('Erro ao copiar filtros');
    });
  };

  const openInLinkedIn = () => {
    const linkedinURL = generateLinkedInURL();
    window.open(linkedinURL, '_blank');
    toast.success('Abrindo LinkedIn Sales Navigator...');
  };

  const downloadFilters = () => {
    const formattedFilters = formatFiltersForLinkedIn();
    const dataStr = JSON.stringify({
      campaignName,
      filters: formattedFilters,
      createdAt: new Date().toISOString()
    }, null, 2);
    
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${campaignName || 'linkedin-filters'}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast.success('Arquivo de filtros baixado!');
  };

  const getTotalFiltersCount = () => {
    let count = 0;
    count += filters.countries?.length || 0;
    count += filters.states?.length || 0;
    count += filters.cities?.length || 0;
    count += filters.industries?.length || 0;
    count += filters.companySizes?.length || 0;
    count += filters.hierarchyLevels?.length || 0;
    count += filters.functionalRoles?.length || 0;
    count += filters.departments?.length || 0;
    count += (filters.customTags || []).length;
    return count;
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ExternalLink className="h-5 w-5 text-blue-600" />
          Exportar para LinkedIn Sales Navigator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Total de filtros aplicados:</p>
            <Badge variant="secondary" className="mt-1">
              {getTotalFiltersCount()} filtros ativos
            </Badge>
          </div>
          
          <div className="text-right">
            <p className="text-sm text-gray-600">Campanha:</p>
            <p className="font-medium">{campaignName || 'Sem nome'}</p>
          </div>
        </div>
        
        <div className="border rounded-lg p-4 bg-gray-50">
          <h4 className="font-medium mb-2">Resumo dos Filtros:</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {filters.countries?.length && (
              <div>
                <span className="font-medium">Países:</span> {filters.countries.length}
              </div>
            )}
            {filters.industries?.length && (
              <div>
                <span className="font-medium">Setores:</span> {filters.industries.length}
              </div>
            )}
            {filters.companySizes?.length && (
              <div>
                <span className="font-medium">Tamanhos:</span> {filters.companySizes.length}
              </div>
            )}
            {filters.hierarchyLevels?.length && (
              <div>
                <span className="font-medium">Senioridade:</span> {filters.hierarchyLevels.length}
              </div>
            )}
          </div>
        </div>
        
        <div className="flex gap-2 flex-wrap">
          <Button 
            onClick={openInLinkedIn}
            className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
          >
            <ExternalLink size={16} />
            Abrir no LinkedIn
          </Button>
          
          <Button 
            variant="outline" 
            onClick={copyToClipboard}
            className="flex items-center gap-2"
          >
            <Copy size={16} />
            Copiar Filtros
          </Button>
          
          <Button 
            variant="outline" 
            onClick={downloadFilters}
            className="flex items-center gap-2"
          >
            <Download size={16} />
            Baixar JSON
          </Button>
        </div>
        
        <div className="text-xs text-gray-500 border-t pt-3">
          <p>
            💡 <strong>Como usar:</strong> Clique em "Abrir no LinkedIn" para aplicar estes filtros 
            diretamente no Sales Navigator, ou copie os filtros para usar manualmente.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default LinkedInExport;
