import Header from '@/components/common/Header';
import Container from '@/components/common/Container';
import Footer from '@/components/common/Footer';

const FestivalInfoPage = () => {
  return (
    <Container>
      <Header variant="all" />
      <div className="flex flex-col items-center px-8 py-4 gap-12">
        <h1>FestivalInfoPage</h1>
      </div>
      <Footer initialSelected="none" />
    </Container>
  );
};

export default FestivalInfoPage;
