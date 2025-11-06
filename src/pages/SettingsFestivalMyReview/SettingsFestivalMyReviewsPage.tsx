import Container from '@/components/common/Container';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import SettingsMyReviewsContent from '@/pages/SettingsFestivalMyReview/components/SettingsFestivalMyReviewsContent';
/**
 * 내가 작성한 리뷰 페이지
 * @returns 내가 작성한 리뷰 페이지 컴포넌트
 * 내가 작성한 리뷰 목록을 표시합니다.
 */
const SettingsFestivalMyReviewsPage = () => {
  return (
    <Container>
      <Header variant="page" title="내가 작성한 리뷰" />
      <SettingsMyReviewsContent />
      <Footer initialSelected="my" />
    </Container>
  );
};

export default SettingsFestivalMyReviewsPage;
