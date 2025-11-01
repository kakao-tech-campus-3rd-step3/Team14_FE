import Container from '@/components/common/Container';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import AIRecommendationHistoriesContent from '@/pages/AIRecommendationHistories/components/AIRecommendationHistoriesContent.tsx';
/**
 * AI 추천 내역 페이지
 * 사용자가 받았던 최신 AI 추천 내역을 확인할 수 있습니다.
 * @returns AI 추천 내역 페이지
 */
const AIRecommendationHistoriesPage = () => {
  return (
    <Container>
      <Header variant="page" title="AI PICK" />
      <AIRecommendationHistoriesContent />
      <Footer initialSelected="pick" />
    </Container>
  );
};

export default AIRecommendationHistoriesPage;
