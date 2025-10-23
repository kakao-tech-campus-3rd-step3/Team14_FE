import Container from '@/components/common/Container';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import FestivalInfoManagerApplyForm from '@/pages/FestivalInfoManagerApply/components/FestivalInfoManagerApplyForm';

const FestivalInfoManagerApplyPage = () => {
  return (
    <Container>
      <Header variant="page" title="축제 관리 신청" />
      <FestivalInfoManagerApplyForm />
      <Footer initialSelected="my" />
    </Container>
  );
};

export default FestivalInfoManagerApplyPage;
