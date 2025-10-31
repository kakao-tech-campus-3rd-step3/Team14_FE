import Container from '@/components/common/Container';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import SettingsFestivalMyManageApplicationContent from '@/pages/SettingsFestivalMyManageApplication/components/SettingsFestivalMyManageApplicationContent';

/**
 * 축제 관리 신청 내역 페이지
 * @returns 축제 관리 신청 내역 페이지 컴포넌트
 * 축제 관리 신청 내역을 표시합니다.
 */
const SettingsFestivalMyManageApplicationPage = () => {
  return (
    <Container>
      <Header variant="page" title="축제 관리 신청 내역" />
      <SettingsFestivalMyManageApplicationContent />
      <Footer initialSelected="my" />
    </Container>
  );
};

export default SettingsFestivalMyManageApplicationPage;
