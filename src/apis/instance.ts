import type { AxiosInstance, CreateAxiosDefaults } from 'axios';
import axios from 'axios';

export interface ApiErrorResponse {
  status: number;
  message: string;
}

export const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const initInstance = (config: CreateAxiosDefaults): AxiosInstance => {
  const instance = axios.create({
    timeout: 5000, // 5 seconds
    headers: {
      ...config.headers,
    },
    ...config,
  });

  // Request 인터셉터
  instance.interceptors.request.use((config) => {
    // 요청 전 설정
    return config;
  });

  // Response 인터셉터
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.error(error);
      return Promise.reject(error);
    },
  );

  return instance;
};

export const apiInstance = initInstance({
  baseURL: apiBaseUrl,
});
