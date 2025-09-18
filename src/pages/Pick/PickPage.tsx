import Container from '@/components/common/Container';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import PickStyleSection from '@/pages/Pick/components/PickStyleSection';
import PickMBTISection from '@/pages/Pick/components/PickMBTISection';
import PICK_STYLES from '@/constants/pickStyles';

const PickPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const style = searchParams.get('style');
  const isValidStyle = style ? PICK_STYLES.some((s) => s.id === style) : false;

  const isShowStyle = !style || !isValidStyle;

  useEffect(() => {
    if (style && !isValidStyle) {
      setSearchParams({}, { replace: true });
    }
  }, [style, isValidStyle, setSearchParams]);
  return (
    <Container>
      <Header variant="page" />
      {isShowStyle ? <PickStyleSection /> : <PickMBTISection />}
      <Footer initialSelected="pick" />
    </Container>
  );
};

export default PickPage;
