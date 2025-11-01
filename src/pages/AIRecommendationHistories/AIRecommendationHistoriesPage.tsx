import Container from '@/components/common/Container';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import AiRecommendationHistoriesContent from '@/pages/AiRecommendationHistories/components/AiRecommendationHistoriesContent';
/**
 * AI 추천 내역 페이지
 * 사용자가 받았던 최신 AI 추천 내역을 확인할 수 있습니다.
 * @returns AI 추천 내역 페이지
 */
const AiRecommendationHistoriesPage = () => {
  return (
    <Container>
      <Header variant="page" title="AI 추천 내역" />
      <AiRecommendationHistoriesContent />
      <Footer initialSelected="pick" />
    </Container>
  );
};

export default AiRecommendationHistoriesPage;
