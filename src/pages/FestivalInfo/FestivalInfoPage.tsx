import Header from '@/components/common/Header';
import Container from '@/components/common/Container';
import FestivalInfoFooter from '@/pages/FestivalInfo/components/FestivalInfoFooter';
import { useParams } from 'react-router-dom';
import getFestivalInfo from '@/apis/festivals/getFestivalInfo';
import { useQuery } from '@tanstack/react-query';
import FestivalPoster from '@/pages/FestivalInfo/components/FestivalPoster';
import FestivalBannerSection from '@/pages/FestivalInfo/components/FestivalBannerSection';
import Divider from '@/components/common/Divider';
import FestivalContentInfoSection from '@/pages/FestivalInfo/components/FestivalContentInfoSection';
import FestivalContentOverviewSection from '@/pages/FestivalInfo/components/FestivalContentOverviewSection';
import FestivalContentReviewSection from '@/pages/FestivalInfo/components/FestivalContentReviewSection';
import getReview from '@/apis/review/getReview';
import FestivalContentManagerSection from '@/pages/FestivalInfo/components/FestivalContentManagerSection';
import FestivalContentNoticeSection from '@/pages/FestivalInfo/components/FestivalContentNoticeSection';
import LoadingPage from '@/components/loading/LoadingPage';
import ErrorPage from '@/components/error/ErrorPage';
import { useAuth } from '@/context/AuthContext';

const FestivalInfoPage = () => {
  const { festivalId } = useParams();
  const { isInitialized } = useAuth();
  const {
    data: festivalData,
    isPending: isFestivalPending,
    isError: isFestivalError,
  } = useQuery({
    queryKey: ['festival', festivalId],
    queryFn: () => getFestivalInfo({ festivalId: festivalId || '' }),
    select: (data) => data.data,
    enabled: !!festivalId && isInitialized,
    staleTime: 0, 
    refetchOnMount: 'always', 
  });

  const {
    data: reviewsData,
    isPending: isReviewsPending,
    isError: isReviewsError,
  } = useQuery({
    queryKey: ['reviews', festivalId],
    queryFn: () => getReview({ festivalId: festivalId || '' }),
    select: (data) => data.data,
  });
  const { userInfo } = useAuth();

  const isManager = userInfo?.userId === festivalData?.content.managerId;

  if (isFestivalPending || isReviewsPending) {
    return <LoadingPage title="축제 정보" message="축제 정보를 불러오는 중" variant="page" />;
  }

  if (isFestivalError || isReviewsError || !festivalId) {
    return (
      <ErrorPage
        title="축제 정보"
        message="축제 정보를 불러오는 중 오류가 발생했습니다."
        variant="page"
      />
    );
  }

  return (
    <Container>
      <Header variant="all" />
      <div className="flex flex-col items-center w-full h-full">
        <FestivalPoster
          posterUrl={festivalData.content.posterInfo}
          imageUrls={festivalData.content.imageInfos}
          title={festivalData.content.title}
        />
        <div className="w-full h-full p-4 gap-4 flex flex-col">
          <FestivalBannerSection
            url={festivalData.content.homePage}
            isMyWish={festivalData.content.isMyWish}
            wishCount={festivalData.content.wishCount}
          />
          <Divider height="1px" />
          <FestivalContentInfoSection
            content={festivalData.content}
            averageScore={festivalData.content.averageScore ?? 0}
            reviewCount={reviewsData.totalElements}
          />
          <Divider height="1px" />
          <FestivalContentOverviewSection
            festivalId={festivalId}
            overview={festivalData.content.overView}
            isManager={isManager}
          />
          <Divider height="1px" />
          <FestivalContentNoticeSection festivalId={festivalId} isManager={isManager} />
          <Divider height="1px" />
          <FestivalContentManagerSection festivalId={festivalId} isManager={isManager} />
          <Divider height="1px" />
          <FestivalContentReviewSection
            reviewsData={reviewsData.content}
            festivalTitle={festivalData.content.title}
          />
        </div>
      </div>
      <FestivalInfoFooter />
    </Container>
  );
};

export default FestivalInfoPage;
