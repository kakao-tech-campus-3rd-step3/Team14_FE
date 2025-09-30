import type { AxiosInstance, CreateAxiosDefaults } from 'axios';
import axios from 'axios';
import API_ENDPOINTS from '@/constants/apiEndpoints';
import type { AuthToken } from '@/types/Auth/AuthToken';
import type { TokenGetter } from '@/types/Auth/TokenGetter';
import type { TokenSetter } from '@/types/Auth/TokenSetter';

export interface ApiErrorResponse {
  status: number;
  message: string;
}

export const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost';

// 토큰 관리
let currentAccessToken: AuthToken = null;
let getTokenCallback: TokenGetter | null = null;
let setTokenCallback: TokenSetter | null = null;

export const setAuthCallbacks = (getToken: TokenGetter, setToken: TokenSetter) => {
  getTokenCallback = getToken;
  setTokenCallback = setToken;
  currentAccessToken = getToken(); // 초기값 설정
};

export const updateAccessToken = (token: AuthToken) => {
  currentAccessToken = token;
  if (setTokenCallback) {
    setTokenCallback(token);
  }
};

export const getCurrentToken = (): AuthToken => {
  if (getTokenCallback) {
    currentAccessToken = getTokenCallback();
  }
  return currentAccessToken;
};

// JWT 교환 함수 (인터셉터에서 사용)
const exchangeTokens = async (): Promise<AuthToken> => {
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
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      // 비로그인 상태에서 토큰 교환 실패는 예상된 동작임.
      // 콘솔에 에러를 출력하지 않고 분기 처리로 넘어감.
    } else {
      // 401이 아닌 다른 에러(네트워크 문제, 서버 500 에러 등)는
      // 여전히 개발자가 인지해야 하므로 콘솔에 출력함.
      console.error('Token exchange failed:', error);
    }
    return null;
  }
};

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: AuthToken) => void;
  reject: (error: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: AuthToken = null) => {
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
