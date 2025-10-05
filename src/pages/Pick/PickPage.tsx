import Container from '@/components/common/Container';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import PickStyleSection from '@/pages/Pick/components/PickStyleSection';
import PickMBTISection from '@/pages/Pick/components/PickMBTISection';
import { PickProvider } from '@/context/PickContext';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

const PickPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const step = searchParams.get('step');
  const isValidStep = step === 'style' || step === 'mbti';
  const isStyleStep = step === 'style';

  useEffect(() => {
    if (!step || !isValidStep) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set('step', 'style');
      setSearchParams(newParams, {replace: true})
    }
  }, [step, searchParams, isValidStep, setSearchParams]);

  return (
    <PickProvider>
      <Container>
        <Header variant="page" />
        {isStyleStep ? <PickStyleSection /> : <PickMBTISection />}
        <Footer initialSelected={'pick'} />
      </Container>
    </PickProvider>
  );
};

export default PickPage;
