interface LoadingSkeletonProps {
  className?: string;
  variant: 'rectangular' | 'circular' | 'text';
  width?: string;
  height?: string;
  animate?: boolean;
}

const LoadingSkeleton = ({
  className,
  variant,
  width,
  height,
  animate = true,
}: LoadingSkeletonProps) => {
  const baseClasses = `bg-gray-200 ${animate ? 'animate-pulse' : ''}`;

  const variantClasses = {
    rectangular: 'rounded',
    circular: 'rounded-full',
    text: 'rounded h-4',
  };

  const style = {
    width: width || undefined,
    height: height || undefined,
  };

  return <div className={`${baseClasses} ${variantClasses[variant]} ${className}`} style={style} />;
};

export default LoadingSkeleton;
