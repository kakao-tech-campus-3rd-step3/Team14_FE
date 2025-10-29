import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import ReviewForm from '../Review/components/ReviewForm';
import Container from '@/components/common/Container';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getSingleReview } from '@/apis/review/getSingleReview';
import { putReview } from '@/apis/review/putReview';
import { showToastSuccessMessage, showToastAxiosError } from '@/utils/showToastMessage';
import type { ReviewUpdateRequest } from '@/apis/review/putReview';
import LoadingPage from '@/components/loading/LoadingPage';
import ErrorPage from '@/components/error/ErrorPage';
import useNav from '@/hooks/useNav';
import type { UserInfoResponse } from '@/types/UserType';

/**
 * 리뷰 수정 페이지
 * 기존 리뷰 데이터를 가져와서 수정할 수 있도록 구현하였습니다.
 * 리뷰 작성 시 리뷰폼 컴포넌트를 리팩토링하여 재사용하였습니다.
 * @returns 리뷰 수정 페이지
 */
const ReviewEditPage = () => {
  const { reviewId } = useParams<{ reviewId: string }>();
  const { goBack } = useNav();
  const queryClient = useQueryClient();
  const [currentScore, setCurrentScore] = useState(0);

  const { data: reviewData, isLoading } = useQuery({
    queryKey: ['review', reviewId],
    queryFn: () => getSingleReview(Number(reviewId)),
    enabled: !!reviewId,
  });

  useEffect(() => {
    if (reviewData?.data.content) {
      setCurrentScore(reviewData.data.content.score);
    }
  }, [reviewData]);

  const { mutate: updateReview } = useMutation({
    mutationFn: (body: ReviewUpdateRequest) => putReview(Number(reviewId), body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      showToastSuccessMessage('리뷰가 수정되었습니다.');
      goBack();
    },
    onError: (error) => {
      showToastAxiosError(error);
    },
  });

  if (isLoading)
    return <LoadingPage title="리뷰 수정" message="리뷰를 불러오는 중..." variant="page" />;

  if (!reviewData?.data.content)
    return (
      <ErrorPage title="리뷰 수정" message="요청하신 리뷰를 찾을 수 없습니다." variant="page" />
    );

  return (
    <Container>
      <Header variant="page" title="리뷰 수정" />
      <div className="p-4 space-y-4">
        <ReviewForm
          festivalId={reviewData.data.content.festivalTitle}
          userInfo={{ userId: reviewData.data.content.userId } as UserInfoResponse['content']}
          score={currentScore}
          reviewId={Number(reviewId)}
          initialData={reviewData.data.content}
          onSubmit={updateReview}
          isEditing={true}
          onScoreChange={setCurrentScore}
        />
      </div>
      <Footer />
    </Container>
  );
};

export default ReviewEditPage;
