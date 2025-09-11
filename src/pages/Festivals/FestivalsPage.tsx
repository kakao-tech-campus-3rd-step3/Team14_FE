import Container from '@/components/common/Container';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import FestivalsAISection from '@/pages/Festivals/components/FestivalsAISection';
import FestivalsAreaSection from '@/pages/Festivals/components/FestivalsAreaSection';
import { Suspense } from 'react';
import { FestivalsSectionSkeleton } from '@/pages/Festivals/components/FestivalCardSkeleton';
import { ErrorBoundary } from 'react-error-boundary';

const FestivalsPage = () => {
  return (
    <Container>
      <Header variant="page" />
      <div className="flex flex-col items-center px-8 py-4 gap-12">
        <ErrorBoundary FallbackComponent={() => null}>
          <Suspense fallback={<FestivalsSectionSkeleton count={3} />}>
            <FestivalsAISection />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary FallbackComponent={() => null}>
          <Suspense fallback={<FestivalsSectionSkeleton count={3} />}>
            <FestivalsAreaSection />
          </Suspense>
        </ErrorBoundary>
      </div>
      <Footer initialSelected="none" />
    </Container>
  );
};

export default FestivalsPage;
