import Container from '@/components/common/Container';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import MyReviewsContent from './components/MyReviewsContent';

const MyReviewsPage = () => {
  return (
    <Container>
      <Header variant="page" title="내가 작성한 리뷰" />
        <MyReviewsContent />
      <Footer initialSelected="my" />
    </Container>
  );
};

export default MyReviewsPage;