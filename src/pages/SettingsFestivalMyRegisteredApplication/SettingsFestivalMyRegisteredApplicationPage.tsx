import Container from '@/components/common/Container';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import SettingsFestivalMyRegisteredApplicationContent from './components/SettingsFestivalMyRegisteredApplicationContent';
/**
 * 내가 등록 신청한 축제 페이지
 * @returns 내가 등록 신청한 축제 페이지 컴포넌트
 * 내가 등록 신청한 축제 목록을 표시합니다.
 */

const SettingsFestivalMyRegisteredApplicationPage = () => {
  return (
    <Container>
      <Header variant="page" title="축제 등록 신청 내역" />
      <SettingsFestivalMyRegisteredApplicationContent />
      <Footer />
    </Container>
  );
};

export default SettingsFestivalMyRegisteredApplicationPage;
