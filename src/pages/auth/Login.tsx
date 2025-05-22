
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield, Lock, Mail, Key } from 'lucide-react';
import { toast } from 'sonner';
import { Alert, AlertDescription } from '@/components/ui/alert';

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const validateToken = (inputToken: string): boolean => {
    return inputToken === '5689';
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validações básicas
    if (!email || !password || !token) {
      setError('Por favor, preencha todos os campos.');
      return;
    }
    
    // Validação do token
    if (!validateToken(token)) {
      setError('Token inválido. Solicite o token correto com sua equipe de suporte.');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulação de login bem-sucedido
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Em um sistema real, você chamaria a API de login aqui
      await login(email, password);
      
      toast.success('Login realizado com sucesso!');
      
      // Redirecionamento explícito para a área do cliente após login bem-sucedido
      navigate('/client-area');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Falha no login. Verifique suas credenciais.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-center mb-6">
        <Shield className="text-saac-blue mr-2" size={24} />
        <h2 className="text-xl font-semibold text-white">Área Segura de Clientes</h2>
      </div>
      
      {error && (
        <Alert className="mb-6 bg-red-500/10 border-red-500/20 text-red-400">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <form onSubmit={handleLogin}>
        <div className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Input
                id="email"
                type="email"
                placeholder="seu@empresa.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-700 pl-10"
                disabled={isLoading}
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Mail className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
          
          <div>
            <Label htmlFor="password">Senha</Label>
            <div className="relative">
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-700 pl-10"
                disabled={isLoading}
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Lock className="h-4 w-4 text-gray-400" />
              </div>
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
              O token é necessário para acessar a área do cliente. 
              Solicite o seu com a equipe de suporte.
            </p>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-saac-blue hover:bg-blue-700 transition-all transform hover:scale-[1.02] active:scale-[0.98]" 
            disabled={isLoading}
          >
            {isLoading ? 'Autenticando...' : 'Entrar na área do cliente'}
          </Button>
        </div>
      </form>
      
      <p className="mt-6 text-center text-sm text-gray-400">
        Não tem uma conta?{' '}
        <Link to="/auth/register" className="text-saac-blue hover:underline">
          Solicite acesso
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

export default Login;
