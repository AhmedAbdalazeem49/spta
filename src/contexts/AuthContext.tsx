import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '@/services/api';

interface User {
  id: number;
  name: string;
  name_ar?: string;
  email: string;
  phone?: string;
  national_id?: string;
  specialization?: string;
  sub_specialization?: string;
  employer?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (data: ResetPasswordData) => Promise<void>;
}

interface RegisterData {
  name: string;
  name_ar: string;
  email: string;
  phone: string;
  national_id: string;
  specialization: string;
  sub_specialization: string;
  employer?: string;
  password: string;
  password_confirmation: string;
}

interface ResetPasswordData {
  token: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(true);

  const clearAuth = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }, []);

  const fetchUser = useCallback(async () => {
    try {
      const res = await api.get('/me');
      const userData = res.data?.data || res.data?.user || res.data;
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch {
      clearAuth();
    }
  }, [clearAuth]);

  useEffect(() => {
    if (token) {
      fetchUser().finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const res = await api.post('/login', { email, password });
    const data = res.data?.data || res.data;
    const newToken = data.token;
    localStorage.setItem('token', newToken);
    setToken(newToken);
    const userData = data.user;
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const register = async (data: RegisterData) => {
    const res = await api.post('/register', data);
    const resData = res.data?.data || res.data;
    const newToken = resData.token;
    localStorage.setItem('token', newToken);
    setToken(newToken);
    const userData = resData.user;
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = async () => {
    try {
      await api.post('/logout');
    } catch {
      // ignore
    }
    clearAuth();
  };

  const forgotPassword = async (email: string) => {
    await api.post('/password/email', { email });
  };

  const resetPassword = async (data: ResetPasswordData) => {
    await api.post('/password/reset', data);
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      isLoading,
      isAuthenticated: !!user && !!token,
      login,
      register,
      logout,
      forgotPassword,
      resetPassword,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
