import Button from '@/components/common/Button';
import { ROUTE_PATH } from '@/constants/routes';
import useNav from '@/hooks/useNav';
import { parseError } from '@/utils/errorHandler';

export interface ErrorInfo {
  title: string;
  message: string;
  showBackButton: boolean;
  showRetry: boolean;
  statusCode?: number;
}

interface ErrorFallbackProps {
  error?: unknown;
  title?: string;
  message?: string;
  showBackButton?: boolean;
  showRetry?: boolean;
  onRetry?: () => void;
}

/**
 * 에러 폴백 컴포넌트
 * @param error - 에러 객체 (Axios 에러 등)
 * @param title - 커스텀 에러 제목
 * @param message - 커스텀 에러 메시지
 * @param showBackButton - 뒤로가기 버튼 표시 여부
 * @param showRetry - 재시도 버튼 표시 여부
 * @param onRetry - 재시도 콜백 함수
 */
const ErrorFallback = ({
  error,
  title,
  message,
  showBackButton,
  showRetry,
  onRetry,
}: ErrorFallbackProps) => {
  const { goTo } = useNav();

  // 에러 객체가 있으면 파싱하고, 없으면 props 사용
  const errorInfo: ErrorInfo = error
    ? parseError(error)
    : {
        title: title || '오류가 발생했습니다',
        message: message || '예상치 못한 오류가 발생했습니다.',
        showBackButton: showBackButton ?? true,
        showRetry: showRetry ?? false,
      };

  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      // 기본 재시도 동작: 페이지 새로고침
      window.location.reload();
    }
  };

  const isShowBackButton = showBackButton ?? errorInfo.showBackButton ?? true;
  const isShowRetry = showRetry ?? errorInfo.showRetry ?? false;

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100dvh-110px)]">
      <div className="text-center px-6 max-w-md">
        {/* 에러 아이콘 */}
        <div className="mb-6">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        {/* 에러 메시지 */}
        <h2 className="text-xl font-semibold mb-3 text-gray-900">{errorInfo.title}</h2>
        <p className="text-gray-600 mb-6 leading-relaxed">{errorInfo.message}</p>

        {/* 버튼 그룹 */}
        <div className="flex w-full gap-3 justify-center items-center">
          {isShowRetry && (
            <Button variant="primary" onClick={handleRetry} fullWidth>
              다시 시도
            </Button>
          )}
          {isShowBackButton && (
            <Button
              variant={isShowRetry ? 'secondary' : 'primary'}
              onClick={() => goTo(ROUTE_PATH.HOME)}
              fullWidth
            >
              홈으로 돌아가기
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorFallback;
