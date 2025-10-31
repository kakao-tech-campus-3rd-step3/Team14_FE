
import Container from '@/components/common/Container';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import FestivalInfoEditContent from '@/pages/FestivalInfoEdit/components/FestivalInfoEditContent';

const FestivalInfoEditPage = () => {

  return (
    <Container>
      <Header variant="page" title="축제 정보 수정" />
      <FestivalInfoEditContent />
      <Footer />
    </Container>
  );
};

export default FestivalInfoEditPage;