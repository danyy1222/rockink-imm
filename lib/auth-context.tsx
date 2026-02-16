'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  isMounted: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const defaultValue: AuthContextType = {
  isLoggedIn: false,
  login: () => false,
  logout: () => {},
  isMounted: false,
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Credenciales fijas para demo
  const ADMIN_USERNAME = 'admin';
  const ADMIN_PASSWORD = 'admin';

  useEffect(() => {
    // Hidratar desde sessionStorage
    const saved = sessionStorage.getItem('adminLoggedIn');
    if (saved === 'true') {
      setIsLoggedIn(true);
    }
    setIsMounted(true);
  }, []);

  const login = (username: string, password: string): boolean => {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      sessionStorage.setItem('adminLoggedIn', 'true');
      return true;
    }
    return false;
  };

  const logout = (): void => {
    setIsLoggedIn(false);
    sessionStorage.removeItem('adminLoggedIn');
  };

  const value: AuthContextType = {
    isLoggedIn,
    login,
    logout,
    isMounted,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
