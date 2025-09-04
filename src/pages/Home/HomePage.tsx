import Container from '@/components/common/Container';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';

const HomePage = () => {
  return (
    <Container>
      <Header variant="logo" title="Home" />
      <div className="w-full h-full mt-12">HomePage</div>
      <Footer />
    </Container>
  );
};

export default HomePage;
