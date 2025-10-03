import { useState } from 'react';

const StarRating = ({ value, onChange }: { value: number; onChange: (v: number) => void }) => {
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
            {filled ? '⭐' : '☆'}
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;