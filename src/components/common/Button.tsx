import { type ComponentPropsWithoutRef } from 'react';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'icon' | 'link';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
  className?: string;
}

/**
 * Button 컴포넌트
 * @param children - 버튼 내부에 표시될 콘텐츠
 * @param variant - 버튼 스타일 변형 (기본값: 'primary')
 * @param size - 버튼 크기 (기본값: 'md')
 * @param fullWidth - 전체 너비 사용 여부 (기본값: false)
 * @param className - 추가 CSS 클래스명
 * @param props - 기타 HTML button 속성들
 */
const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
  ...props
}: ButtonProps) => {
  const baseClasses = `cursor-pointer flex items-center justify-center ${fullWidth ? 'w-full' : 'w-fit'}`;

  const variantClasses = {
    primary: 'bg-primary-300 text-gray-50',
    secondary: 'bg-primary-50 text-primary-300',
    tertiary: 'bg-gray-100 text-gray-600',
    icon: 'bg-transparent text-gray-900',
    link: 'bg-transparent text-gray-400 text-sm !p-0 !rounded-none',
  };

  const sizeClasses = {
    sm: 'text-sm rounded-lg px-4 py-2',
    md: 'text-md rounded-xl px-5 py-3',
    lg: 'text-lg rounded-2xl px-6 py-4',
  };

  return (
    <button
      type="button"
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
