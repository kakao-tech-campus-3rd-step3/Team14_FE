import Button from '@/components/common/Button';

interface ErrorComponentProps {
  title?: string;
  message?: string;
  showBackButton?: boolean;
  onRetry?: () => void;
  isGlobal?: boolean;
  className?: string;
}

/**
 * 에러 표시 컴포넌트
 * 페이지 에러와 전역 에러를 모두 처리할 수 있는 통합 컴포넌트
 * @param title - 에러 제목 (기본값: "오류가 발생했습니다")
 * @param message - 에러 메시지 (기본값: 상황에 맞는 메시지)
 * @param showBackButton - 뒤로가기 버튼 표시 여부
 * @param queryKey - 재시도 시 무효화할 React Query 키
 * @param isGlobal - 전역 에러 여부 (true: 전체 화면, false: 페이지 내)
 * @returns 에러 표시 컴포넌트
 */
const ErrorComponent = ({
  title,
  message,
  showBackButton = true,
  onRetry,
  isGlobal = false,
  className,
}: ErrorComponentProps) => {
  // 기본값 설정
  const displayTitle = title || (isGlobal ? '문제가 발생했습니다' : '오류가 발생했습니다');
  const displayMessage =
    message ||
    (isGlobal
      ? '예상치 못한 오류가 발생했습니다.\n잠시 후 다시 시도해주세요.'
      : '데이터를 불러오는 중 문제가 발생했습니다.');

  // 전역 에러는 전체 화면, 페이지 에러는 컨테이너 내부
  const containerClass = isGlobal
    ? 'flex flex-col items-center justify-center min-h-screen px-4'
    : 'flex flex-col items-center justify-center h-[calc(100vh-110px)]';

  return (
    <div className={`${containerClass} ${className}`}>
      <div className="text-center flex flex-col gap-10">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-semibold mb-2">{displayTitle}</h2>
          <p className="mb-4">{displayMessage}</p>
        </div>
        <div className="flex flex-col gap-2">
          {onRetry && (
            <Button variant="primary" onClick={onRetry} fullWidth>
              다시 시도
            </Button>
          )}
          {isGlobal ? (
            <Button
              variant={onRetry ? 'secondary' : 'primary'}
              onClick={() => {
                window.location.href = '/';
              }}
              fullWidth
            >
              홈으로 이동
            </Button>
          ) : (
            showBackButton && (
              <Button
                variant={onRetry ? 'secondary' : 'primary'}
                // 에러 컴포넌트가 라우터에서 벗어나면 이전 페이지로 돌아가는 것이 불가능해지므로 이 방법을 사용했습니다.
                onClick={() => window.history.back()}
                fullWidth
              >
                이전 페이지로 돌아가기
              </Button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorComponent;
