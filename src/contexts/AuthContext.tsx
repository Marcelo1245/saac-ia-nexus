import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

type User = {
  id: string;
  name: string;
  email: string;
  company: string;
  role: string;
  avatar?: string;
  isVerified?: boolean;
  verificationStatus?: 'pending' | 'approved' | 'rejected';
  lastLogin?: Date;
};

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  isLoading: boolean;
  loginAttempts: number;
  lockoutUntil: Date | null;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  isLoading: boolean;
  loginAttempts: number;
  isLockedOut: boolean;
  lockoutRemaining: number;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  loginWithSSO: (provider: 'google' | 'linkedin') => Promise<void>;
  register: (name: string, email: string, password: string, company: string) => Promise<void>;
  logout: () => void;
  verify2FA: (code: string) => Promise<void>;
  completeRegistration: (userData: Partial<User>) => Promise<void>;
  resetLoginAttempts: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

// Security configuration
const AUTH_CONFIG = {
  cookie_secure: true,
  http_only: true,
  same_site: "Strict",
  max_attempts: 3,
  lockout_time: 30 // in minutes
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isInitialized: false,
    isLoading: false,
    loginAttempts: 0,
    lockoutUntil: null
  });

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const storedUser = localStorage.getItem('user');
    const lockoutUntil = localStorage.getItem('lockoutUntil');
    const loginAttempts = localStorage.getItem('loginAttempts');
    
    setState(prev => ({
      ...prev,
      user: storedUser ? JSON.parse(storedUser) : null,
      isAuthenticated: !!storedUser,
      loginAttempts: loginAttempts ? parseInt(loginAttempts) : 0,
      lockoutUntil: lockoutUntil ? new Date(lockoutUntil) : null,
      isInitialized: true
    }));
  }, []);

  // Check if user is locked out
  const isLockedOut = state.lockoutUntil && new Date() < state.lockoutUntil;
  
  // Calculate remaining lockout time in minutes
  const lockoutRemaining = state.lockoutUntil 
    ? Math.ceil((state.lockoutUntil.getTime() - new Date().getTime()) / (1000 * 60)) 
    : 0;

  // Reset login attempts
  const resetLoginAttempts = () => {
    setState(prev => ({ ...prev, loginAttempts: 0 }));
    localStorage.removeItem('loginAttempts');
    localStorage.removeItem('lockoutUntil');
  };

  // Set security cookie (this would be done server-side in a real implementation)
  const setSecurityCookie = () => {
    // In a real app, this would be handled server-side
    console.log("Setting secure cookie with:", {
      secure: AUTH_CONFIG.cookie_secure,
      httpOnly: AUTH_CONFIG.http_only,
      sameSite: AUTH_CONFIG.same_site
    });
  };

  // Simulate auth methods
  const login = async (email: string, password: string, rememberMe = false) => {
    // Check if user is locked out
    if (isLockedOut) {
      throw new Error(`Conta bloqueada. Tente novamente em ${lockoutRemaining} minutos.`);
    }

    setState(prev => ({ ...prev, isLoading: true }));
    
    try {
      // This is a mock - would be replaced with a real API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Email validation check (basic example)
      if (!email.includes('@') || !email.includes('.')) {
        throw new Error('E-mail inválido');
      }

      // Password strength check (basic example)
      if (password.length < 8) {
        throw new Error('Senha muito fraca');
      }
      
      // Mock login validation
      const isValidCredentials = email.includes('@') && password.length >= 8;
      
      if (!isValidCredentials) {
        // Increment login attempts on failure
        const newAttempts = state.loginAttempts + 1;
        
        // Check if should lock out
        if (newAttempts >= AUTH_CONFIG.max_attempts) {
          const lockoutUntil = new Date();
          lockoutUntil.setMinutes(lockoutUntil.getMinutes() + AUTH_CONFIG.lockout_time);
          
          setState(prev => ({ 
            ...prev, 
            loginAttempts: newAttempts,
            lockoutUntil
          }));
          
          localStorage.setItem('lockoutUntil', lockoutUntil.toISOString());
          localStorage.setItem('loginAttempts', newAttempts.toString());
          
          throw new Error(`Conta bloqueada por ${AUTH_CONFIG.lockout_time} minutos devido a múltiplas tentativas.`);
        }
        
        setState(prev => ({ ...prev, loginAttempts: newAttempts }));
        localStorage.setItem('loginAttempts', newAttempts.toString());
        
        throw new Error(`Credenciais inválidas. Tentativas restantes: ${AUTH_CONFIG.max_attempts - newAttempts}.`);
      }
      
      // Mock user data
      const userData: User = {
        id: '1',
        name: 'Usuário de Teste',
        email,
        company: 'SAAC',
        role: 'Admin',
        isVerified: true, // Set as already verified
        verificationStatus: 'approved',
        lastLogin: new Date()
      };
      
      setSecurityCookie();
      setState(prev => ({ 
        ...prev, 
        user: userData,
        isAuthenticated: true, // Explicitly set authentication state to true
        loginAttempts: 0 
      }));
      
      if (rememberMe) {
        localStorage.setItem('user', JSON.stringify(userData));
      }
      
      resetLoginAttempts();
      
      // No navigation here - this will be handled by the Login component
    } catch (error) {
      console.error('Login failed:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Falha no login. Tente novamente.');
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const loginWithSSO = async (provider: 'google' | 'linkedin') => {
    setState(prev => ({ ...prev, isLoading: true }));
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
        verificationStatus: 'pending',
        lastLogin: new Date()
      };
      
      setSecurityCookie();
      setState(prev => ({ 
        ...prev, 
        user: userData, 
        loginAttempts: 0 
      }));
      
      localStorage.setItem('user', JSON.stringify(userData));
      resetLoginAttempts();
      
      // Note: Not navigating yet - will be handled after 2FA
    } catch (error) {
      console.error(`SSO login with ${provider} failed:`, error);
      throw new Error(`Falha no login com ${provider}. Por favor, tente novamente.`);
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const register = async (name: string, email: string, password: string, company: string) => {
    setState(prev => ({ ...prev, isLoading: true }));
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
        verificationStatus: 'pending',
        lastLogin: new Date()
      };
      
      setSecurityCookie();
      setState(prev => ({ 
        ...prev, 
        user: userData, 
        loginAttempts: 0 
      }));
      
      localStorage.setItem('user', JSON.stringify(userData));
      resetLoginAttempts();
      
      // Note: Not navigating yet - will be handled after 2FA
    } catch (error) {
      console.error('Registration failed:', error);
      throw new Error('Falha no cadastro. Por favor, tente novamente.');
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const verify2FA = async (code: string) => {
    setState(prev => ({ ...prev, isLoading: true }));
    try {
      // This is a mock - would be replaced with a real 2FA verification
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const validTokens = ['123456', '4332', 'SAAC-2024'];
      
      if (!validTokens.includes(code)) {
        throw new Error('Código inválido');
      }
      
      // Update user with verified status
      if (state.user) {
        const updatedUser = {
          ...state.user,
          isVerified: true
        };
        
        setState(prev => ({ 
          ...prev, 
          user: updatedUser,
          isAuthenticated: true
        }));
        
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
      
      // Note: Not navigating yet - will wait for registration completion
    } catch (error) {
      console.error('2FA verification failed:', error);
      throw new Error('Código de verificação inválido. Por favor, tente novamente.');
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const completeRegistration = async (userData: Partial<User>) => {
    setState(prev => ({ ...prev, isLoading: true }));
    try {
      // This is a mock - would be replaced with a real API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (state.user) {
        const updatedUser = {
          ...state.user,
          ...userData,
          verificationStatus: 'pending' as const
        };
        
        setState(prev => ({ 
          ...prev, 
          user: updatedUser
        }));
        
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
      
      navigate('/client-area');
    } catch (error) {
      console.error('Registration completion failed:', error);
      throw new Error('Falha ao completar o cadastro. Por favor, tente novamente.');
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const logout = () => {
    setState(prev => ({ 
      ...prev,
      user: null,
      isAuthenticated: false
    }));
    localStorage.removeItem('user');
    navigate('/auth/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        isInitialized: state.isInitialized,
        isLoading: state.isLoading,
        loginAttempts: state.loginAttempts,
        isLockedOut,
        lockoutRemaining,
        login,
        loginWithSSO,
        register,
        logout,
        verify2FA,
        completeRegistration,
        resetLoginAttempts
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
