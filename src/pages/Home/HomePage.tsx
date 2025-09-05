import Container from '@/components/common/Container';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import HomeContent from './components/HomeContent';

const HomePage = () => {
  return (
    <Container>
      <Header variant="logo" title="Home" />
      <div className="w-full h-full mt-12">HomePage</div>
      <HomeContent />
      <Footer />
    </Container>
  );
};

export default HomePage;
