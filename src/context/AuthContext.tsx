'use client';

import type { User, Product } from '@/lib/types';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { getProductById } from '@/lib/products';

interface AuthContextType {
  user: User | null;
  login: (email: string, pass: string) => boolean;
  logout: () => void;
  register: (name: string, email: string) => boolean; // removed pass here
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mockUser: User = {
  id: '123',
  name: 'Aisha Al-Farsi',
  email: 'aisha@example.com',
  profileDescription: 'A user interested in traditional crafts and cuisine.',
  purchaseHistory: [getProductById('2'), getProductById('4')].filter(p => p) as Product[],
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('buraimi-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email: string, pass: string) => {
    if (email === mockUser.email && pass === 'password123') {
      setUser(mockUser);
      localStorage.setItem('buraimi-user', JSON.stringify(mockUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('buraimi-user');
  };

  // Removed pass param since it’s unused
  const register = (name: string, email: string) => {
    const newUser = { ...mockUser, name, email };
    setUser(newUser);
    localStorage.setItem('buraimi-user', JSON.stringify(newUser));
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};