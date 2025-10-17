import { useState } from 'react';
import StarIcon from '@/components/icon/StarIcon';

const ScoreStarRating = ({ value, onChange }: { value: number; onChange: (v: number) => void }) => {
  const [hover, setHover] = useState<number | null>(null);

  return (
    <div className="flex gap-2 justify-center">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = (hover ?? value) >= star;
        return (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(null)}
            className="text-2xl"
            aria-label={`${star}점`}
          >
            <StarIcon
              className={`x-8 h-8 ${filled ? 'text-yellow-400' : 'text-gray-300'}`}
              filled={filled}
            />
          </button>
        );
      })}
    </div>
  );
};

export default ScoreStarRating;
