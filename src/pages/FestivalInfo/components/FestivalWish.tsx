import Heart from '@/components/icon/HeartIcon';
import { postWish } from '@/apis/wish/postWish';
import { deleteWish } from '@/apis/wish/deleteWish';
import { useMutation } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

const FestivalWish = () => {
  // Todo:
  // 축제 찜 여부 조회 api 연결
  // 축제 찜 여부 조회 api 연결 후 wishId 받아오기
  const wishId = 1;
  const [isWish, setIsWish] = useState(false);
  const { festivalId } = useParams();
  const { mutate: postWishMutation } = useMutation({
    mutationFn: () => postWish({ festivalId: festivalId || '' }),
    onSuccess: () => {
      setIsWish(true);
    },
    onError: () => {
      setIsWish(false);
    },
  });
  const { mutate: deleteWishMutation } = useMutation({
    // Todo:
    // wishId 타입 수정
    mutationFn: () => deleteWish({ wishId: wishId.toString() }),
    onSuccess: () => {
      setIsWish(false);
    },
    onError: () => {
      setIsWish(true);
    },
  });

  return (
    <div
      onClick={() => (isWish ? deleteWishMutation() : postWishMutation())}
      className="cursor-pointer"
    >
      <Heart fill={isWish} />
    </div>
  );
};

export default FestivalWish;
