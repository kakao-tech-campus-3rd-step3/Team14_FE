import Container from '@/components/common/Container';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import FestivalsAISection from '@/pages/Festivals/components/FestivalsAISection';
import FestivalsAreaSection from '@/pages/Festivals/components/FestivalsAreaSection';
import { Suspense } from 'react';
import { FestivalsSectionSkeleton } from '@/pages/Festivals/components/FestivalCardSkeleton';
import { ErrorBoundary } from 'react-error-boundary';
import EmptyComponent from '@/components/common/EmptyComponent';

const FestivalsPage = () => {
  return (
    <Container>
      <Header variant="page" />
      <div className="flex flex-col items-center px-8 py-4 gap-12">
        <ErrorBoundary
          FallbackComponent={() => (
            <EmptyComponent
              title="AI 추천 데이터를 불러오는 중 오류가 발생했습니다."
              description="잠시 후 다시 시도해주세요."
            />
          )}
        >
          <Suspense fallback={<FestivalsSectionSkeleton />}>
            <FestivalsAISection />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary
          FallbackComponent={() => (
            <EmptyComponent
              title="지역별 축제 데이터를 불러오는 중 오류가 발생했습니다."
              description="잠시 후 다시 시도해주세요."
            />
          )}
        >
          <Suspense fallback={<FestivalsSectionSkeleton />}>
            <FestivalsAreaSection />
          </Suspense>
        </ErrorBoundary>
      </div>
      <Footer initialSelected="none" />
    </Container>
  );
};

export default FestivalsPage;
