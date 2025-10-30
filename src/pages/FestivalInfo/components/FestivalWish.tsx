import Heart from '@/components/icon/HeartIcon';
import { postWish } from '@/apis/wish/postWish';
import { deleteWish } from '@/apis/wish/deleteWish';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

const FestivalWish = ({ isMyWish, wishCount }: { isMyWish: boolean; wishCount: number }) => {
  const [isWish, setIsWish] = useState(isMyWish);
  const { festivalId } = useParams();
  const queryClient = useQueryClient();
  const { mutate: postWishMutation } = useMutation({
    mutationFn: () => postWish({ festivalId: festivalId || '' }),
    onSuccess: () => {
      setIsWish(true);
      queryClient.invalidateQueries({ queryKey: ['festival', festivalId] });
    },
    onError: () => {
      setIsWish(false);
    },
  });
  const { mutate: deleteWishMutation } = useMutation({
    mutationFn: () => deleteWish({ festivalId: festivalId || '' }),
    onSuccess: () => {
      setIsWish(false);
      queryClient.invalidateQueries({ queryKey: ['festival', festivalId] });
    },
    onError: () => {
      setIsWish(true);
    },
  });

  return (
    <div className="flex items-center gap-2">
      <div className="text-sm text-gray-900">{wishCount}</div>
      <div
        onClick={() => (isWish ? deleteWishMutation() : postWishMutation())}
        className="cursor-pointer"
      >
        <Heart fill={isWish} />
      </div>
    </div>
  );
};

export default FestivalWish;
