import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { setAuthCallbacks } from '@/apis/apiInstance';
import jwtExchange from '@/apis/auth/jwtExchange';
import axios from 'axios';
import type { AuthToken } from '@/types/Auth/AuthToken';

interface AuthContextType {
  accessToken: AuthToken;
  setAccessToken: (token: AuthToken) => void;
  isLoggedIn: boolean;
  isInitialized: boolean;
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
  const [accessToken, setAccessTokenState] = useState<AuthToken>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const tokenRef = useRef<AuthToken>(null);

  const setAccessToken = (token: AuthToken) => {
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
      try {
        // 토큰 교환 로직이 제일 처음 서비스 사용자가 홈페이지에 접근했을떄도 실행됨.
        // 따라서 비로그인 상태에서 실패한 결과가 리턴됨
        // 에러 분기 처리를 통해 콘솔에 출력되지 않게 하였으나 크롬 자체 로그에 여전히 제일 처음 한번 출력되고 있음.
        // 해결방법으로 고민해본건 로그인이 성공했을때 로컬스토리지에 일종의 플래그를 둬서 해결하는 방식이었으나 옳은 구현인지 확인이 필요함.
        const response = await jwtExchange();
        const authHeader = response.headers?.authorization || response.headers?.Authorization;

        if (authHeader && authHeader.startsWith('Bearer ')) {
          const token = authHeader.substring(7);
          setAccessToken(token);
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          // 비로그인 상태에서 토큰 교환 실패는 예상된 동작임.
          // 콘솔에 에러를 출력하지 않고 분기 처리로 넘어감.
        } else if (error instanceof Error && error.message === 'Token refresh 실패') {
        } else {
          // 401이 아닌 다른 에러(네트워크 문제, 서버 500 에러 등)는
          // 여전히 개발자가 인지해야 하므로 콘솔에 출력함.
          console.error('Authentication check failed:', error);
        }
      } finally {
        setIsInitialized(true);
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
    isInitialized,
    clearAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
