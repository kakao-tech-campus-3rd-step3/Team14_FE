import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { setAuthCallbacks } from '@/apis/apiInstance';

interface AuthContextType {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  isLoggedIn: boolean;
  clearAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth는 반드시 AuthProvider 내에서 사용되어야 함');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [accessToken, setAccessTokenState] = useState<string | null>(null);
  const tokenRef = useRef<string | null>(null);

  const setAccessToken = (token: string | null) => {
    tokenRef.current = token;
    setAccessTokenState(token);
  };

  const getAccessToken = () => {
    return tokenRef.current;
  };

  const clearAuth = () => {
    setAccessToken(null);
  };

  const isLoggedIn = !!accessToken;

  // apiInstance와 연결
  useEffect(() => {
    setAuthCallbacks(getAccessToken, setAccessToken);
  }, []);

  const value: AuthContextType = {
    accessToken,
    setAccessToken,
    isLoggedIn,
    clearAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
