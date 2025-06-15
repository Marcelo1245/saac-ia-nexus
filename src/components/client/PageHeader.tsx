
import React from 'react';
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

interface PageHeaderProps {
  title: string;
  onReturnHome: () => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, onReturnHome }) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold premium-title">{title}</h1>
      <Button 
        variant="outline" 
        onClick={onReturnHome} 
        className="flex items-center gap-2 px-4 py-2 border-2 border-slate-300 premium-text hover:bg-slate-50 hover:border-slate-400 transition-all duration-200 rounded-lg shadow-sm font-medium"
      >
        <Home size={16} />
        Voltar à Página Inicial
      </Button>
    </div>
  );
};

export default PageHeader;
