
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import SegmentationFilters from '@/components/client/SegmentationFilters';

const ClientArea: React.FC = () => {
  return (
    <div className="min-h-screen bg-saac-dark pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Segmentação de Leads</h1>
          <p className="text-gray-400">Configure os filtros para encontrar os leads ideais para sua campanha</p>
        </div>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Filtros de Segmentação</CardTitle>
            <CardDescription>Defina os critérios para sua campanha com precisão</CardDescription>
          </CardHeader>
          <CardContent>
            <SegmentationFilters />
          </CardContent>
        </Card>

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
