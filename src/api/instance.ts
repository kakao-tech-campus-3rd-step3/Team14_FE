import type { AxiosInstance, CreateAxiosDefaults } from 'axios';
import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const initInstance = (config: CreateAxiosDefaults): AxiosInstance => {
  const instance = axios.create({
    timeout: 5000, // 5 seconds
    headers: {
      'Content-Type': 'application/json',
      ...config.headers,
    },
    ...config,
  });

  // Request 인터셉터
  instance.interceptors.request.use(
    (config) => {
      // 요청 전 설정
      return config;
    },
    (error) => {
      // 에러 처리
      console.error(error);
      return Promise.reject(error);
    },
  );

  // Response 인터셉터
  instance.interceptors.response.use(
    (response) => {
      // 응답 데이터 가공
      return response;
    },
    (error) => {
      // 에러 처리
      return Promise.reject(error);
    },
  );

  return instance;
};

export const apiInstance = initInstance({
  baseURL: apiBaseUrl,
});
