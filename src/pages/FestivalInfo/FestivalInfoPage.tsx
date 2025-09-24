import Header from '@/components/common/Header';
import Container from '@/components/common/Container';
import Footer from '@/components/common/Footer';
import { useParams } from 'react-router-dom';
import getFestivalInfo from '@/apis/festivals/getFestivalInfo';
import { useSuspenseQuery } from '@tanstack/react-query';

const FestivalInfoPage = () => {
  const { festivalId } = useParams();
  const { data } = useSuspenseQuery({
    queryKey: ['festival', festivalId],
    queryFn: () => getFestivalInfo({ festivalId: festivalId || '' }),
  });
  return (
    <Container>
      <Header variant="all" />
      <div className="flex flex-col items-center px-8 py-4 gap-12">{data.data.content.title}</div>
      <Footer initialSelected="none" />
    </Container>
  );
};

export default FestivalInfoPage;
