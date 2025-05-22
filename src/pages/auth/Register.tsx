
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield, Key } from 'lucide-react';
import { toast } from 'sonner';
import { Alert, AlertDescription } from '@/components/ui/alert';

const Register: React.FC = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [company, setCompany] = useState('');
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const validateToken = (inputToken: string): boolean => {
    return inputToken === '5689';
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validações básicas
    if (!name || !email || !password || !confirmPassword || !company || !token) {
      setError('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }
    
    // Validação do token
    if (!validateToken(token)) {
      setError('Token inválido. Solicite o token correto com sua equipe de suporte.');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulação de registro bem-sucedido
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Em um sistema real, você chamaria a API de registro aqui
      registerUser(name, email, password, company);
      toast.success('Registro concluído com sucesso!');
      navigate('/client-area');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Ocorreu um erro durante o registro.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-white mb-6 flex items-center justify-center">
        <Shield className="mr-2 text-saac-blue" size={20} />
        Criar Conta de Cliente
      </h2>
      
      {error && (
        <Alert className="mb-6 bg-red-500/10 border-red-500/20 text-red-400">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <form onSubmit={handleRegister}>
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Nome Completo</Label>
            <Input
              id="name"
              placeholder="Seu nome completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-gray-700"
              disabled={isLoading}
            />
          </div>
          
          <div>
            <Label htmlFor="email">Email Corporativo</Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@empresa.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-700"
              disabled={isLoading}
            />
          </div>
          
          <div>
            <Label htmlFor="company">Empresa</Label>
            <Input
              id="company"
              placeholder="Nome da sua empresa"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="bg-gray-700"
              disabled={isLoading}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-700"
                disabled={isLoading}
              />
            </div>
            
            <div>
              <Label htmlFor="confirmPassword">Confirmar Senha</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-gray-700"
                disabled={isLoading}
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="token">Token de Acesso</Label>
            <div className="relative">
              <Input
                id="token"
                type="text"
                placeholder="Digite o token de acesso"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="bg-gray-700 pl-10"
                disabled={isLoading}
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Key className="h-4 w-4 text-gray-400" />
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              O token é necessário para registrar uma nova conta. 
              Solicite o seu com a equipe de suporte.
            </p>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-saac-blue hover:bg-blue-700 transition-all transform hover:scale-[1.02] active:scale-[0.98]" 
            disabled={isLoading}
          >
            {isLoading ? 'Registrando...' : 'Registrar conta'}
          </Button>
        </div>
      </form>
      
      <p className="mt-6 text-center text-sm text-gray-400">
        Já tem uma conta?{' '}
        <Link to="/auth/login" className="text-saac-blue hover:underline">
          Faça login
        </Link>
      </p>
      
      <div className="mt-4 pt-4 border-t border-gray-700">
        <div className="flex items-center justify-center text-xs text-gray-400">
          <Shield className="h-3 w-3 mr-1 text-green-400" />
          <span>Área segura com criptografia SSL/TLS</span>
        </div>
      </div>
    </div>
  );
};

export default Register;
