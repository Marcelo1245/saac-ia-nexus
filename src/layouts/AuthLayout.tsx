
import React from 'react';
import { Outlet, Navigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Shield, ArrowLeft } from 'lucide-react';

const AuthLayout: React.FC = () => {
  const { isAuthenticated, isInitialized } = useAuth();

  // Show a loading state if auth is not initialized yet
  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-saac-dark flex items-center justify-center p-4">
        <div className="flex items-center space-x-2">
          <div className="h-5 w-5 bg-saac-blue/60 rounded-full animate-pulse"></div>
          <div className="h-5 w-5 bg-saac-blue/60 rounded-full animate-pulse delay-150"></div>
          <div className="h-5 w-5 bg-saac-blue/60 rounded-full animate-pulse delay-300"></div>
        </div>
      </div>
    );
  }

  // Redirect to client area if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/client-area" replace />;
  }

  return (
    <div className="min-h-screen bg-saac-dark flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Shield className="h-12 w-12 text-saac-blue" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">SAAC.IA</h1>
          <p className="text-gray-400">Sistema de Automação para Aquisição de Clientes</p>
        </div>
        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700 transition-all hover:border-saac-blue/50 hover:shadow-saac-blue/10">
          <Outlet />
        </div>
        <div className="mt-6 flex items-center justify-between">
          <Link to="/" className="flex items-center text-saac-blue hover:text-saac-blue/80 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-1" />
            <span className="text-sm">Voltar para a página inicial</span>
          </Link>
          <div className="flex items-center text-xs text-gray-500">
            <Shield className="h-3 w-3 mr-1 text-green-400" />
            <span>Protocolo de segurança SSL/TLS ativado</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
