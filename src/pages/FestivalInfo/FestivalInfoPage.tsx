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
import Footer from '@/components/common/Footer';

const FestivalInfoPage = () => {
  const { festivalId } = useParams();
  const { data, isPending, isError } = useQuery({
    queryKey: ['festival', festivalId],
    queryFn: () => getFestivalInfo({ festivalId: festivalId || '' }),
    select: (data) => data.data,
    enabled: !!festivalId,
  });
  // Todo:
  // 로딩,에러 페이지 통일하기

  if (isPending) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-300"></div>
        <p className="mt-4 text-lg text-gray-600">축제 정보를 불러오는 중</p>
      </div>
    );
  }

  if (isError) {
    return (
      <Container>
        <Header variant="page" />
        <div className="flex items-center justify-center h-64">
          <div className="text-red-500">축제 정보를 불러오는 중 오류가 발생했습니다.</div>
        </div>
        <Footer initialSelected="my" />
      </Container>
    );
  }

  return (
    <Container>
      <Header variant="all" />
      <div className="flex flex-col items-center w-full h-full">
        <FestivalPoster
          posterUrl={data.content.posterInfo}
          imageUrls={data.content.imageInfos}
          title={data.content.title}
        />
        <div className="w-full h-full p-4 gap-4 flex flex-col">
          <FestivalBannerSection url={data.content.homePage} />
          <Divider height="1px" />
          <FestivalContentInfoSection content={data.content} />
          <Divider height="1px" />
          <FestivalContentOverviewSection overview={data.content.overView} />
        </div>
      </div>
      <FestivalInfoFooter />
    </Container>
  );
};

export default FestivalInfoPage;
