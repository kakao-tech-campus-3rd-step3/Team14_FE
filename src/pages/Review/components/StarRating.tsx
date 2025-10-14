import { useState } from 'react';
import StarIcon from '@/components/icon/StarIcon';

interface ScoreStarRatingProps {
  rating: number;
  onChange: (v: number) => void;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
}
/**
 * ScoreStarRating 컴포넌트
 * 리뷰 작성 시 별점을 매길 수 있는 컴포넌트 입니다.
 * 기존의 이미지 방식의 경우, 각 디바이스별로 렌더링되는 모양이 
 * @param rating - 별점
 * @param onChange - 별점 변경 함수
 * @param maxRating - 최대 별점(기본값: 5)
 * @param size - 별점 크기(기본값: 'xxl')
 * @returns 리뷰 작성 시 별점 추가 컴포넌트
 */
const ScoreStarRating = ({ 
  rating, 
  onChange, 
  maxRating = 5, 
  size = 'xxl' 
}: ScoreStarRatingProps) => {

  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
    xl: 'w-6 h-6',
    xxl: 'w-7 h-7',
  };

  const [hover, setHover] = useState<number | null>(null);
  const [localRating, setLocalRating] = useState(rating);
  
  const handleRating = (star: number) => {
    setLocalRating(star);
    onChange(star);
  };

  return (
    <div className="flex gap-2 justify-center">
      {Array.from({ length: maxRating }, (_, i) => i + 1).map((star) => {
        const filled = (hover ?? localRating) >= star;
        return (
          <button
            key={star}
            type="button"
            onClick={() => handleRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(null)}
            className="focus:outline-none"
            aria-label={`${star}점`}
          >
            <StarIcon
              className={`${sizeClasses[size]} ${filled ? 'text-yellow-400' : 'text-gray-300'}`}
              filled={filled}
            />
          </button>
        );
      })}
    </div>
  );
};

export default ScoreStarRating;