import Container from '@/components/common/Container';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import SettingsMyReviewsContent from '@/pages/SettingsMyReview/components/SettingsMyReviewsContent';

const SettingsMyReviewsPage = () => {
  return (
    <Container>
      <Header variant="page" title="내가 작성한 리뷰" />
      <SettingsMyReviewsContent />
      <Footer initialSelected="my" />
    </Container>
  );
};

export default SettingsMyReviewsPage;
