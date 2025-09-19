import type { AxiosInstance, CreateAxiosDefaults } from 'axios';
import axios from 'axios';
import API_ENDPOINTS from '@/constants/apiEndpoints';

export interface ApiErrorResponse {
  status: number;
  message: string;
}

export const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

// 토큰 관리
let currentAccessToken: string | null = null;
let getTokenCallback: (() => string | null) | null = null;
let setTokenCallback: ((token: string | null) => void) | null = null;

export const setAuthCallbacks = (
  getToken: () => string | null,
  setToken: (token: string | null) => void,
) => {
  getTokenCallback = getToken;
  setTokenCallback = setToken;
  currentAccessToken = getToken(); // 초기값 설정
};

export const updateAccessToken = (token: string | null) => {
  currentAccessToken = token;
  if (setTokenCallback) {
    setTokenCallback(token);
  }
};

export const getCurrentToken = (): string | null => {
  if (getTokenCallback) {
    currentAccessToken = getTokenCallback();
  }
  return currentAccessToken;
};

// JWT 교환 함수 (인터셉터에서 사용)
const exchangeTokens = async (): Promise<string | null> => {
  try {
    const response = await axios.post(
      `${apiBaseUrl}${API_ENDPOINTS.JWT_EXCHANGE}`,
      {},
      {
        withCredentials: true,
        timeout: 5000,
      },
    );

    const authHeader = response.headers?.authorization || response.headers?.Authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const newAccessToken = authHeader.substring(7);
      updateAccessToken(newAccessToken);
      return newAccessToken;
    }
    return null;
  } catch (error) {
    console.error('Token exchange failed:', error);
    return null;
  }
};

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: string | null) => void;
  reject: (error: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });

  failedQueue = [];
};

const initInstance = (config: CreateAxiosDefaults): AxiosInstance => {
  const instance = axios.create({
    timeout: 5000,
    headers: {
      ...config.headers,
    },
    withCredentials: true, // 쿠키 포함하기 위함
    ...config,
  });

  // Request 인터셉터 - 메모리의 액세스 토큰 자동 추가
  instance.interceptors.request.use(
    (config) => {
      const token = getCurrentToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  // Response 인터셉터 - 401 자동 회복
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          // 이미 토큰 갱신 중이면 대기열에 추가
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              return instance(originalRequest);
            })
            .catch((err) => {
              return Promise.reject(err);
            });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const newToken = await exchangeTokens();
          if (newToken) {
            processQueue(null, newToken);
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return instance(originalRequest);
          } else {
            throw new Error('Token refresh 실패');
          }
        } catch (refreshError) {
          processQueue(refreshError, null);
          updateAccessToken(null);

          // 로그인 페이지나 쿠키 페이지가 아닌 경우에만 리다이렉트
          const currentPath = window.location.pathname;
          if (currentPath !== '/login' && currentPath !== '/cookie') {
            window.location.href = '/login';
          }

          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      console.error('API Error:', error);
      return Promise.reject(error);
    },
  );

  return instance;
};

export const apiInstance = initInstance({
  baseURL: apiBaseUrl,
});
