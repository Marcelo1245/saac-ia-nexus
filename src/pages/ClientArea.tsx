
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"
import { ProspectingFilters } from '@/types/prospecting';
import FilterSystem from '@/components/client/FilterSystem';
import PageHeader from '@/components/client/PageHeader';

const ClientArea = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [campaignName, setCampaignName] = useState('');
  const [filters, setFilters] = useState<Partial<ProspectingFilters>>({});
  const [estimatedLeads, setEstimatedLeads] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleFiltersChange = (newFilters: Partial<ProspectingFilters>) => {
    setFilters(newFilters);
    console.log('New Filters:', newFilters);
  };

  const handleCampaignNameChange = (newName: string) => {
    setCampaignName(newName);
    console.log('New Campaign Name:', newName);
  };

  const handleSaveFilters = () => {
    toast.success('Filters saved successfully!');
  };

  const handleExportFilters = () => {
    toast.message('Filters exported!');
  };

  const handlePreviewClick = () => {
    setEstimatedLeads(Math.floor(Math.random() * 1000));
    toast('Simulating lead estimation...');
  };

  const handleReturnHome = () => {
    navigate('/');
  };

  return (
    <div className="container mx-auto p-4">
      <PageHeader 
        title="Client Area"
        onReturnHome={handleReturnHome}
      />
      <Card>
        <CardHeader>
          <CardTitle>Segmentation Filters</CardTitle>
          <CardDescription>Customize your lead prospecting filters.</CardDescription>
        </CardHeader>
        <CardContent>
          <FilterSystem
            isMobile={isMobile}
            onFiltersChange={handleFiltersChange}
            onCampaignNameChange={handleCampaignNameChange}
            onSaveFilters={handleSaveFilters}
            onExportFilters={handleExportFilters}
            onPreviewClick={handlePreviewClick}
            estimatedLeads={estimatedLeads}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientArea;
