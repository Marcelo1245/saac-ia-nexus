
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Shield, Lock, AlertTriangle, Mail } from 'lucide-react';
import { toast } from 'sonner';
import TokenVerification from './TokenVerification';
import RegistrationForm from './RegistrationForm';
import { Alert, AlertDescription } from '@/components/ui/alert';

const Login: React.FC = () => {
  const { 
    login, 
    loginWithSSO, 
    isLoading, 
    verify2FA, 
    loginAttempts,
    isLockedOut,
    lockoutRemaining
  } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [showCaptcha, setShowCaptcha] = useState(false);

  useEffect(() => {
    // Check if we should show captcha based on login attempts
    if (loginAttempts >= 2) {
      setShowCaptcha(true);
    }
  }, [loginAttempts]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Por favor, preencha todos os campos.');
      return;
    }

    // Check for corporate email
    if (!email.includes('@') || email.endsWith('@gmail.com') || email.endsWith('@hotmail.com') || email.endsWith('@outlook.com')) {
      toast.error('Por favor, utilize um email corporativo.');
      return;
    }
    
    // Check for strong password
    const hasStrongPassword = password.length >= 8 && 
                             /[A-Z]/.test(password) && 
                             /[a-z]/.test(password) && 
                             /[0-9]/.test(password);
    
    if (!hasStrongPassword) {
      toast.error('A senha deve conter pelo menos 8 caracteres, uma letra maiúscula, uma minúscula e um número.');
      return;
    }
    
    try {
      await login(email, password, rememberMe);
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
      setShowTwoFactor(true);
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
      await verify2FA(twoFactorCode);
      setShowRegistration(true);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Falha na verificação.');
      }
    }
  };

  if (showRegistration) {
    return <RegistrationForm />;
  }

  if (showTwoFactor) {
    return <TokenVerification onVerify={handleVerify2FA} token={twoFactorCode} setToken={setTwoFactorCode} />;
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-center mb-6">
        <Shield className="text-saac-blue mr-2" size={24} />
        <h2 className="text-xl font-semibold text-white">Área Segura de Clientes</h2>
      </div>
      
      {isLockedOut && (
        <Alert className="mb-6 bg-red-500/10 border-red-500/20 text-red-400">
          <AlertTriangle className="h-4 w-4 mr-2" />
          <AlertDescription>
            Conta temporariamente bloqueada devido a múltiplas tentativas de login.
            Tente novamente em {lockoutRemaining} minutos.
          </AlertDescription>
        </Alert>
      )}
      
      <form onSubmit={handleLogin}>
        <div className="space-y-4">
          <div>
            <Label htmlFor="email">Email Corporativo</Label>
            <div className="relative">
              <Input
                id="email"
                type="email"
                placeholder="seu@empresa.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-700 pl-10"
                disabled={isLockedOut || isLoading}
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Mail className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-1">
              <Label htmlFor="password">Senha Forte</Label>
              <Link to="/auth/reset-password" className="text-xs text-saac-blue hover:underline">
                Esqueceu a senha?
              </Link>
            </div>
            <div className="relative">
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-700 pl-10"
                disabled={isLockedOut || isLoading}
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Lock className="h-4 w-4 text-gray-400" />
              </div>
            </div>
            <div className="mt-1">
              <p className="text-xs text-gray-400">
                Mínimo 8 caracteres, com letra maiúscula, minúscula e número
              </p>
            </div>
          </div>
          
          {showCaptcha && (
            <div className="p-4 bg-gray-700 rounded-md">
              <div className="flex items-center mb-2">
                <AlertTriangle className="h-4 w-4 text-yellow-400 mr-2" />
                <span className="text-sm text-yellow-400">Verificação adicional necessária</span>
              </div>
              <div className="flex items-center justify-center p-2 bg-gray-800 rounded">
                <span className="text-sm text-gray-400">Captcha seria exibido aqui</span>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Medida de segurança após múltiplas tentativas de login
              </p>
            </div>
          )}
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="rememberMe"
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(checked === true)}
              disabled={isLockedOut || isLoading}
            />
            <Label htmlFor="rememberMe" className="text-sm">Lembrar-me</Label>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-saac-blue hover:bg-blue-700" 
            disabled={isLockedOut || isLoading}
          >
            {isLoading ? 'Entrando...' : 'Acessar Área Segura'}
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
          disabled={isLockedOut || isLoading}
        >
          Google Workspace
        </Button>
        <Button
          type="button"
          variant="outline"
          className="bg-transparent border-gray-600 text-white hover:bg-gray-700"
          onClick={() => handleSSOLogin('linkedin')}
          disabled={isLockedOut || isLoading}
        >
          LinkedIn
        </Button>
      </div>
      
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
