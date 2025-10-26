import { AxiosError, isAxiosError } from 'axios';
import { SYSTEM_MESSAGES } from '@/constants/systemMessages';
import type { ApiErrorResponse } from '@/apis/apiResponse';

export interface ErrorInfo {
  message: string;
  statusCode?: number;
}

/**
 * 에러를 ErrorInfo 형태로 파싱하는 함수
 * @param error - 파싱할 에러 객체
 * @returns ErrorInfo 객체 (메시지와 상태 코드)
 */
export const parseError = (error: unknown): ErrorInfo => {
  // Axios 에러인 경우
  if (isAxiosError(error)) {
    return parseAxiosError(error);
  }

  // 일반 Error 객체인 경우
  if (error instanceof Error) {
    return {
      message: error.message || SYSTEM_MESSAGES.DEFAULT_ERROR_MESSAGES.UNKNOWN_ERROR,
    };
  }

  // 알 수 없는 에러인 경우
  return {
    message: SYSTEM_MESSAGES.DEFAULT_ERROR_MESSAGES.UNKNOWN_ERROR,
  };
};

/**
 * Axios 에러를 파싱하는 함수
 * @param error - Axios 에러 객체
 * @returns ErrorInfo 객체
 */
const parseAxiosError = (error: AxiosError<ApiErrorResponse>): ErrorInfo => {
  // 네트워크 에러인 경우
  if (error.code === 'ERR_NETWORK') {
    return {
      message: SYSTEM_MESSAGES.DEFAULT_ERROR_MESSAGES.NETWORK_ERROR,
    };
  }

  // 타임아웃 에러인 경우
  if (error.code === 'ECONNABORTED') {
    return {
      message: SYSTEM_MESSAGES.DEFAULT_ERROR_MESSAGES.TIMEOUT_ERROR,
    };
  }

  // 응답이 있는 경우
  if (error.response) {
    const { status, data } = error.response;
    const statusCode = status as keyof typeof SYSTEM_MESSAGES.HTTP_ERROR_MESSAGES;

    // 서버에서 제공한 에러 메시지가 있는 경우
    if (data?.message) {
      return {
        message: data.message,
        statusCode: status,
      };
    }

    // HTTP 상태 코드별 기본 메시지 사용
    if (SYSTEM_MESSAGES.HTTP_ERROR_MESSAGES[statusCode]) {
      return {
        message: SYSTEM_MESSAGES.HTTP_ERROR_MESSAGES[statusCode],
        statusCode: status,
      };
    }
  }

  // 기본 에러 메시지 반환
  return {
    message: error.message || SYSTEM_MESSAGES.DEFAULT_ERROR_MESSAGES.UNKNOWN_ERROR,
  };
};
