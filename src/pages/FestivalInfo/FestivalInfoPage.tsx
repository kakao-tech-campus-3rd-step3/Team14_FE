import Header from '@/components/common/Header';
import Container from '@/components/common/Container';
import FestivalInfoFooter from '@/pages/FestivalInfo/components/FestivalInfoFooter';
import { useParams } from 'react-router-dom';
import getFestivalInfo from '@/apis/festivals/getFestivalInfo';
import { useSuspenseQuery } from '@tanstack/react-query';
import FestivalPoster from '@/pages/FestivalInfo/components/FestivalPoster';
import FestivalBannerSection from '@/pages/FestivalInfo/components/FestivalBannerSection';
import Divider from '@/components/common/Divider';
import FestivalContentInfoSection from '@/pages/FestivalInfo/components/FestivalContentInfoSection';
import FestivalContentOverviewSection from '@/pages/FestivalInfo/components/FestivalContentOverviewSection';

const FestivalInfoPage = () => {
  const { festivalId } = useParams();
  const { data } = useSuspenseQuery({
    queryKey: ['festival', festivalId],
    queryFn: () => getFestivalInfo({ festivalId: festivalId || '' }),
    select: (data) => data.data,
  });
  return (
    <Container>
      <Header variant="all" />
      <div className="flex flex-col items-center w-full h-full">
        <FestivalPoster imageUrl={data.content.posterInfo} title={data.content.title} />
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
