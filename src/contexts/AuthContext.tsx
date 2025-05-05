
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type User = {
  id: string;
  name: string;
  email: string;
  company: string;
  role: string;
  avatar?: string;
  isVerified?: boolean;
  verificationStatus?: 'pending' | 'approved' | 'rejected';
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  isLoading: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  loginWithSSO: (provider: 'google' | 'linkedin') => Promise<void>;
  register: (name: string, email: string, password: string, company: string) => Promise<void>;
  logout: () => void;
  verify2FA: (code: string) => Promise<void>;
  completeRegistration: (userData: Partial<User>) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem('user');
      }
    }
    setIsInitialized(true);
  }, []);

  // Simulate auth methods
  const login = async (email: string, password: string, rememberMe = false) => {
    setIsLoading(true);
    try {
      // This is a mock - would be replaced with a real API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data
      const userData: User = {
        id: '1',
        name: 'Usuário de Teste',
        email,
        company: 'SAAC',
        role: 'Admin',
        isVerified: false,
        verificationStatus: 'pending'
      };
      
      setUser(userData);
      if (rememberMe) {
        localStorage.setItem('user', JSON.stringify(userData));
      }
      
      // Note: Not navigating yet - will be handled after 2FA
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('Credenciais inválidas. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithSSO = async (provider: 'google' | 'linkedin') => {
    setIsLoading(true);
    try {
      // This is a mock - would be replaced with a real SSO flow
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data after SSO login
      const userData: User = {
        id: '2',
        name: 'Usuário SSO',
        email: `user@${provider}.com`,
        company: 'SAAC',
        role: 'User',
        avatar: '/placeholder.svg',
        isVerified: false,
        verificationStatus: 'pending'
      };
      
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      
      // Note: Not navigating yet - will be handled after 2FA
    } catch (error) {
      console.error(`SSO login with ${provider} failed:`, error);
      throw new Error(`Falha no login com ${provider}. Por favor, tente novamente.`);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, company: string) => {
    setIsLoading(true);
    try {
      // This is a mock - would be replaced with a real API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock registered user
      const userData: User = {
        id: '3',
        name,
        email,
        company,
        role: 'User',
        isVerified: false,
        verificationStatus: 'pending'
      };
      
      // After registration, usually we'd redirect to login,
      // but we'll auto-login for demo purposes
      setUser(userData);
      
      // Note: Not navigating yet - will wait for verification
    } catch (error) {
      console.error('Registration failed:', error);
      throw new Error('Falha no cadastro. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const verify2FA = async (code: string) => {
    setIsLoading(true);
    try {
      // This is a mock - would be replaced with a real 2FA verification
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const validTokens = ['123456', '4332', 'SAAC-2024'];
      
      if (!validTokens.includes(code)) {
        throw new Error('Código inválido');
      }
      
      // Update user with verified status
      if (user) {
        const updatedUser = {
          ...user,
          isVerified: true
        };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
      
      // Note: Not navigating yet - will wait for registration completion
    } catch (error) {
      console.error('2FA verification failed:', error);
      throw new Error('Código de verificação inválido. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const completeRegistration = async (userData: Partial<User>) => {
    setIsLoading(true);
    try {
      // This is a mock - would be replaced with a real API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (user) {
        const updatedUser = {
          ...user,
          ...userData,
          verificationStatus: 'pending' as const
        };
        
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
      
      navigate('/client-area');
    } catch (error) {
      console.error('Registration completion failed:', error);
      throw new Error('Falha ao completar o cadastro. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/auth/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isInitialized,
        isLoading,
        login,
        loginWithSSO,
        register,
        logout,
        verify2FA,
        completeRegistration
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
