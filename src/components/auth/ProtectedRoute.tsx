
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isInitialized } = useAuth();
  
  // Mostrar um indicador de carregamento enquanto a autenticação está sendo inicializada
  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-saac-dark flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="h-4 w-4 bg-saac-blue/60 rounded-full animate-pulse"></div>
          <div className="h-4 w-4 bg-saac-blue/60 rounded-full animate-pulse delay-150"></div>
          <div className="h-4 w-4 bg-saac-blue/60 rounded-full animate-pulse delay-300"></div>
        </div>
      </div>
    );
  }
  
  // Redirecionar para a página de login se não estiver autenticado
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }
  
  // Renderizar o conteúdo protegido se estiver autenticado
  return <>{children}</>;
};

export default ProtectedRoute;
