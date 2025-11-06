import Container from '@/components/common/Container';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import HomeContent from '@/pages/Home/components/HomeContent';

const HomePage = () => {
  return (
    <Container>
      <Header variant="logo" title="Home" />
      <HomeContent />
      <Footer initialSelected="home" />
    </Container>
  );
};

export default HomePage;
