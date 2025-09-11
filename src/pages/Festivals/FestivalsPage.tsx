import Container from '@/components/common/Container';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import FestivalsAISection from '@/pages/Festivals/components/FestivalsAISection';
import FestivalsAreaSection from '@/pages/Festivals/components/FestivalsAreaSection';

const FestivalsPage = () => {
  return (
    <Container>
      <Header variant="page" />
      <div className="flex flex-col items-center px-8 py-4 gap-12">
        <FestivalsAISection />
        <FestivalsAreaSection />
      </div>
      <Footer initialSelected="none" />
    </Container>
  );
};

export default FestivalsPage;
