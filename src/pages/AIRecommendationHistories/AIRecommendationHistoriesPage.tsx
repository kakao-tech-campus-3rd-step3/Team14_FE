
import Container from '@/components/common/Container';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import AIRecommendationHistoriesContent from '@/pages/AIRecommendationHistories/components/AIRecommendationHistoriesContent';

const AIRecommendationHistoriesPage = () => {
  return (
    <Container>
      <Header variant="page" title="AI 추천 내역" />
      <AIRecommendationHistoriesContent />
      <Footer initialSelected="pick" />
    </Container>
  );
};

export default AIRecommendationHistoriesPage;