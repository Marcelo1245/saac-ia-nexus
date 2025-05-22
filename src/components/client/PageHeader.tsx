
import React from 'react';
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

interface PageHeaderProps {
  title: string;
  onReturnHome: () => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, onReturnHome }) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-2xl font-bold">{title}</h1>
      <Button 
        variant="outline" 
        onClick={onReturnHome} 
        className="flex items-center gap-2"
      >
        <Home size={16} />
        Voltar à Página Inicial
      </Button>
    </div>
  );
};

export default PageHeader;
