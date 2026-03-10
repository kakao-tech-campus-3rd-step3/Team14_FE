import Container from '@/components/common/Container';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import SEOHead from '@/components/common/SEOHead';
import HomeContent from '@/pages/Home/components/HomeContent';

const HomePage = () => {
  return (
    <Container>
      <SEOHead
        title="FestaPick - 축제를 골라봐"
        description="축제의 모든 것, 다 FestaPick에서! 다양한 축제 정보와 취향 맞춤 추천을 확인해보세요."
        url="/"
      />
      <Header variant="logo" title="Home" />
      <HomeContent />
      <Footer initialSelected="home" />
    </Container>
  );
};

export default HomePage;
