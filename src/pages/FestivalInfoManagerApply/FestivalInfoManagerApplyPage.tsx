import Container from '@/components/common/Container';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import FestivalManagerApplyForm from './components/FestivalManagerApplyForm';

const FestivalManagerApplyPage = () => {
  return (
    <Container>
      <Header variant="page" title="축제 관리 신청" />
      <FestivalManagerApplyForm />
      <Footer initialSelected="my" />
    </Container>
  );
};

export default FestivalManagerApplyPage;
