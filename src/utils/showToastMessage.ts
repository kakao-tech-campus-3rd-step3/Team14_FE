import { toast, Bounce } from 'react-toastify';
import { parseError } from './errorHandler';

const TOAST_OPTIONS = {
  position: 'top-center',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true,
  progress: undefined,
  theme: 'light',
  transition: Bounce,
} as const;
/**
 * 에러 메시지를 토스트로 표시하는 함수
 * @param message - 표시할 메시지
 */
export const showToastErrorMessage = (message: string): void => {
  toast.error(message, TOAST_OPTIONS);
};

/**
 * 성공 메시지를 토스트로 표시하는 함수
 * @param message - 표시할 메시지
 */
export const showToastSuccessMessage = (message: string): void => {
  toast.success(message, TOAST_OPTIONS);
};

/**
 * API 에러 응답을 토스트로 표시하는 함수
 * @param error - axios API 에러 응답 객체
 */
export const showToastAxiosError = (error: unknown): void => {
  const errorInfo = parseError(error);
  toast.error(errorInfo.message, TOAST_OPTIONS);
};
