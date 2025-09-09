import Container from '@/components/common/Container';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';

const FestivalsPage = () => {
  return (
    <Container>
      <Header variant="logo" title="Festivals" />
      <div className="w-full h-full mt-12">FestivalsPage</div>
      <Footer initialSelected="none" />
    </Container>
  );
};

export default FestivalsPage;
