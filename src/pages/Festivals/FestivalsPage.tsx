import Container from '@/components/common/Container';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import FestivalsSection from '@/pages/Festivals/components/FestivalsSection';
import { festivalsMockData } from '@/mocks/festivals.mock';

const FestivalsPage = () => {
  return (
    <Container>
      <Header variant="logo" title="Festivals" />
      <div className="flex flex-col items-center px-12 py-4 gap-12">
        <FestivalsSection title="AI pick" data={festivalsMockData} />
        <FestivalsSection title="Festivals" data={festivalsMockData} />
      </div>
      <Footer initialSelected="none" />
    </Container>
  );
};

export default FestivalsPage;
