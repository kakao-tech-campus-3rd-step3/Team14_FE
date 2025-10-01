import StarIcon from '@/components/icon/StarIcon';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  showScore?: boolean;
}

/**
 * StarRating 컴포넌트
 * @param rating - 별점
 * @param maxRating - 최대 별점(기본값: 5)
 * @param size - 별점 크기(기본값: 'md')
 * @param showScore - 별점 점수 표시 여부(기본값: false)
 */
const StarRating = ({ rating, maxRating = 5, size = 'md', showScore = false }: StarRatingProps) => {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  const renderStars = () => {
    const stars = [];

    for (let i = 1; i <= maxRating; i++) {
      const isFilled = i <= rating;
      const isHalfFilled = i - 0.5 === rating;

      stars.push(
        <div key={i} className="relative">
          <StarIcon className={`${sizeClasses[size]} text-gray-300`} filled />

          {(isFilled || isHalfFilled) && (
            <StarIcon
              className={`${sizeClasses[size]} text-yellow-400 absolute top-0 left-0 ${
                isHalfFilled ? 'overflow-hidden' : ''
              }`}
              filled
              style={isHalfFilled ? { clipPath: 'inset(0 50% 0 0)' } : {}}
            />
          )}
        </div>,
      );
    }

    return stars;
  };

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">{renderStars()}</div>
      {showScore && (
        <span className={`${textSizeClasses[size]} text-gray-600 ml-1`}>({rating.toFixed(1)})</span>
      )}
    </div>
  );
};

export default StarRating;
