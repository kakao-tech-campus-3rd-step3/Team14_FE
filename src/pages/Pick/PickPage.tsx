import Container from '@/components/common/Container';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import { useSearchParams } from 'react-router-dom';
import PickStyleSection from '@/pages/Pick/components/PickStyleSection';
import PickMBTISection from '@/pages/Pick/components/PickMBTISection';

const PickPage = () => {
  const [searchParams] = useSearchParams();
  const style = searchParams.get('style'); // tradition, modern 등
  return (
    <Container>
      <Header variant="page" />
      {!style ? <PickStyleSection /> : <PickMBTISection />}
      <Footer initialSelected="pick" />
    </Container>
  );
};

export default PickPage;
