
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const Register: React.FC = () => {
  const { register: registerUser, isLoading } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [company, setCompany] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password || !confirmPassword || !company) {
      toast.error('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error('As senhas não coincidem.');
      return;
    }
    
    try {
      await registerUser(name, email, password, company);
      toast.success('Registro concluído com sucesso!');
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Ocorreu um erro durante o registro.');
      }
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-white mb-6">Criar Conta</h2>
      
      <form onSubmit={handleRegister}>
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Nome Completo</Label>
            <Input
              id="name"
              placeholder="Seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-gray-700"
            />
          </div>
          
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
            <Label htmlFor="company">Empresa</Label>
            <Input
              id="company"
              placeholder="Nome da sua empresa"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="bg-gray-700"
            />
          </div>
          
          <div>
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-700"
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
            />
          </div>
          
          <Button type="submit" className="w-full bg-saac-blue hover:bg-blue-700" disabled={isLoading}>
            {isLoading ? 'Registrando...' : 'Registrar'}
          </Button>
        </div>
      </form>
      
      <p className="mt-6 text-center text-sm text-gray-400">
        Já tem uma conta?{' '}
        <Link to="/auth/login" className="text-saac-blue hover:underline">
          Faça login
        </Link>
      </p>
    </div>
  );
};

export default Register;
