import { type ComponentPropsWithoutRef } from 'react';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
  className?: string;
}

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
