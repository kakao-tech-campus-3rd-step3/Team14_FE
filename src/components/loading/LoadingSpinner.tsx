interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  message?: string;
}
/**
 * 로딩 스피너 컴포넌트
 * @param size - 스피너 크기
 * @param className - 스피너 클래스
 * @param message - 스피너 메시지
 * @returns 로딩 스피너 컴포넌트
 */
const LoadingSpinner = ({ size = 'md', className = '', message }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div
        className={`animate-spin rounded-full border-b-2 border-primary-300 ${sizeClasses[size]}`}
      />
      {message && <p className="mt-4 text-lg text-gray-600">{message}</p>}
    </div>
  );
};

export default LoadingSpinner;
