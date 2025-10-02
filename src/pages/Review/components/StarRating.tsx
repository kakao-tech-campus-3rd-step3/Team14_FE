import { useState } from 'react';

const StarRating = () => {
  const [rating, setRating] = useState(0);

  return (
    <div className="flex gap-2 justify-center">
      {[1,2,3,4,5].map(star => (
        <button
          key={star}
          onClick={() => setRating(star)}
          className="text-2xl"
        >
          {star <= rating ? '⭐' : '☆'}
        </button>
      ))}
    </div>
  );
};

export default StarRating;