import React, { useState, useEffect } from 'react';
import { Shield, AlertCircle, CheckCircle, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface TokenVerificationProps {
  onVerify: (e: React.FormEvent) => Promise<void>;
  token: string;
  setToken: (token: string) => void;
}

const TokenVerification: React.FC<TokenVerificationProps> = ({ onVerify, token, setToken }) => {
  const [isValidating, setIsValidating] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isTokenValid, setIsTokenValid] = useState<boolean | null>(null);
  const [progress, setProgress] = useState(0);
  
  const validTokens = ["4332", "SAAC-2024"]; // Hardcoded valid tokens
  
  const validateToken = (value: string) => {
    return validTokens.includes(value);
  };

  useEffect(() => {
    if (token.length === 4) {
      setIsValidating(true);
      let progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return prev + 10;
        });
      }, 100);

      const isValid = validateToken(token);
      
      setTimeout(() => {
        setIsValidating(false);
        setIsTokenValid(isValid);
        clearInterval(progressInterval);
        setProgress(100);
        
        if (!isValid) {
          setAttempts(prev => prev + 1);
          toast.error("Token inválido. Por favor, tente novamente.");
        }
      }, 1500);

      return () => clearInterval(progressInterval);
    } else {
      setIsTokenValid(null);
      setProgress(0);
    }
  }, [token]);

  const handleManualVerify = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (attempts >= 3) {
      toast.error("Número máximo de tentativas excedido. Entre em contato com o suporte.");
      return;
    }
    
    if (isTokenValid) {
      onVerify(e);
    } else {
      toast.error("Por favor, insira um token válido.");
      setAttempts(prev => prev + 1);
    }
  };

  const handleOTPChange = (value: string) => {
    setToken(value);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-center mb-6">
        <Shield className="text-saac-blue mr-2" size={24} />
        <h2 className="text-xl font-semibold text-white">Verificação de Segurança</h2>
      </div>
      
      <p className="text-gray-300 mb-6 text-center">
        Por favor, insira o código de acesso de 4 dígitos fornecido pela SAAC.
      </p>
      
      <form onSubmit={handleManualVerify}>
        <div className="space-y-6">
          <div className="flex justify-center mb-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <InputOTP
                      maxLength={4}
                      value={token}
                      onChange={handleOTPChange}
                      render={({ slots }) => (
                        <InputOTPGroup>
                          {slots.map((slot, index) => (
                            <InputOTPSlot key={index} index={index} className="bg-gray-700 text-white border-gray-600 focus:border-saac-blue" />
                          ))}
                        </InputOTPGroup>
                      )}
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Insira o código de 4 dígitos enviado ao seu e-mail ou fornecido pela equipe SAAC</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          {isValidating && (
            <div className="space-y-2">
              <div className="flex items-center">
                <Loader className="animate-spin text-saac-blue mr-2" size={16} />
                <span className="text-sm text-gray-300">Verificando token...</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}
          
          {isTokenValid === true && (
            <div className="flex items-center text-green-400 justify-center p-2 bg-green-400/10 rounded-md">
              <CheckCircle size={16} className="mr-2" />
              <span>Token válido! Clique em Continuar</span>
            </div>
          )}
          
          {isTokenValid === false && (
            <div className="flex items-center text-red-400 justify-center p-2 bg-red-400/10 rounded-md">
              <AlertCircle size={16} className="mr-2" />
              <span>Token inválido. Tentativas restantes: {3 - attempts}</span>
            </div>
          )}
          
          <div className="mt-4">
            <Button 
              type="submit" 
              className="w-full bg-saac-blue hover:bg-blue-700" 
              disabled={isValidating || !isTokenValid || attempts >= 3}
            >
              Continuar
            </Button>
          </div>
          
          <div className="text-center text-xs text-gray-400">
            <p>Para fins de demonstração, use o token: <span className="font-mono bg-gray-700 px-1 py-0.5 rounded">4332</span></p>
          </div>
        </div>
      </form>

      <div className="mt-6 pt-4 border-t border-gray-700">
        <div className="flex items-center justify-center text-xs text-gray-400">
          <Shield className="h-3 w-3 mr-1 text-green-400" />
          <span>Área segura com criptografia SSL/TLS</span>
        </div>
      </div>
    </div>
  );
};

export default TokenVerification;
