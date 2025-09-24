import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { setAuthCallbacks } from '@/apis/apiInstance';
import jwtExchange from '@/apis/auth/jwtExchange';

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

  // 새로고침 시 자동 토큰 복구
  useEffect(() => {
    const initAuth = async () => {
      const hasRefreshToken = document.cookie.includes('refreshToken=');
      
      if (!hasRefreshToken) {
        return;
      }
      
      try {
        const response = await jwtExchange();
        const authHeader = response.headers?.authorization || response.headers?.Authorization;

        if (authHeader && authHeader.startsWith('Bearer ')) {
          const token = authHeader.substring(7);
          setAccessToken(token);
        }
      } catch (error) {
        console.error('토큰 교환 실패:', error);
      }
    };

    initAuth();
  }, []);

  // apiInstance와 연결
  useEffect(() => {
    setAuthCallbacks(getAccessToken, setAccessToken);
  }, []);

  const isLoggedIn = !!accessToken;

  const value: AuthContextType = {
    accessToken,
    setAccessToken,
    isLoggedIn,
    clearAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};