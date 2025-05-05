
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';

const Login: React.FC = () => {
  const { login, loginWithSSO, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Por favor, preencha todos os campos.');
      return;
    }
    
    try {
      await login(email, password, rememberMe);
      // For demo purposes, we'll show 2FA after successful login
      setShowTwoFactor(true);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Ocorreu um erro durante o login.');
      }
    }
  };

  const handleSSOLogin = async (provider: 'google' | 'linkedin') => {
    try {
      await loginWithSSO(provider);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error(`Falha ao fazer login com ${provider}.`);
      }
    }
  };

  const handleVerify2FA = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!twoFactorCode) {
      toast.error('Por favor, insira o código de verificação.');
      return;
    }
    
    try {
      // In a real app, this would verify the code with the backend
      if (twoFactorCode === '123456') {
        toast.success('Verificação bem-sucedida!');
        // Redirect would happen in the useAuth context
      } else {
        throw new Error('Código inválido.');
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Falha na verificação.');
      }
    }
  };

  if (showTwoFactor) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Verificação em Duas Etapas</h2>
        <p className="text-gray-300 mb-4">
          Por segurança, enviamos um código de 6 dígitos para o seu e-mail.
        </p>
        
        <form onSubmit={handleVerify2FA}>
          <div className="mb-4">
            <Label htmlFor="twoFactorCode">Código de Verificação</Label>
            <Input
              id="twoFactorCode"
              type="text"
              placeholder="Digite o código de 6 dígitos"
              value={twoFactorCode}
              onChange={(e) => setTwoFactorCode(e.target.value)}
              className="bg-gray-700"
            />
            <p className="text-xs text-gray-400 mt-1">
              Para fins de demonstração, use o código: 123456
            </p>
          </div>
          
          <Button type="submit" className="w-full bg-saac-blue hover:bg-blue-700" disabled={isLoading}>
            {isLoading ? 'Verificando...' : 'Verificar'}
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-white mb-6">Login</h2>
      
      <form onSubmit={handleLogin}>
        <div className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-700"
            />
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-1">
              <Label htmlFor="password">Senha</Label>
              <Link to="/auth/reset-password" className="text-xs text-saac-blue hover:underline">
                Esqueceu a senha?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-700"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="rememberMe"
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(checked === true)}
            />
            <Label htmlFor="rememberMe" className="text-sm">Lembrar-me</Label>
          </div>
          
          <Button type="submit" className="w-full bg-saac-blue hover:bg-blue-700" disabled={isLoading}>
            {isLoading ? 'Entrando...' : 'Entrar'}
          </Button>
        </div>
      </form>
      
      <div className="my-6 relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-700" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-gray-800 px-2 text-gray-400">Ou continue com</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <Button
          type="button"
          variant="outline"
          className="bg-transparent border-gray-600 text-white hover:bg-gray-700"
          onClick={() => handleSSOLogin('google')}
          disabled={isLoading}
        >
          Google
        </Button>
        <Button
          type="button"
          variant="outline"
          className="bg-transparent border-gray-600 text-white hover:bg-gray-700"
          onClick={() => handleSSOLogin('linkedin')}
          disabled={isLoading}
        >
          LinkedIn
        </Button>
      </div>
      
      <p className="mt-6 text-center text-sm text-gray-400">
        Não tem uma conta?{' '}
        <Link to="/auth/register" className="text-saac-blue hover:underline">
          Registre-se
        </Link>
      </p>
    </div>
  );
};

export default Login;
