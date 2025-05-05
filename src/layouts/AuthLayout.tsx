
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const AuthLayout: React.FC = () => {
  const { isAuthenticated, isInitialized } = useAuth();

  // Show a loading state if auth is not initialized yet
  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-saac-dark flex items-center justify-center p-4">
        <div className="text-gray-400">Carregando...</div>
      </div>
    );
  }

  // Redirect to dashboard if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-saac-dark flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">SAAC</h1>
          <p className="text-gray-400">Sistema de Automação para Aquisição de Clientes</p>
        </div>
        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
