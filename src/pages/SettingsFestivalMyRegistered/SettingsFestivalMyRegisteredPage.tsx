import Container from '@/components/common/Container';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import SettingsFestivalMyRegisteredContent from '@/pages/SettingsFestivalMyRegistered/components/SettingsFestivalMyRegisteredContent';
/**
 * 내가 등록한 축제 페이지
 * @returns 내가 등록한 축제 페이지 컴포넌트
 * 내가 등록한 축제 목록을 표시합니다.
 */
const SettingsFestivalMyRegisteredPage = () => {
  return (
    <Container>
      <Header variant="page" title="내가 등록한 축제" />
      <SettingsFestivalMyRegisteredContent />
      <Footer initialSelected="my" />
    </Container>
  );
};

export default SettingsFestivalMyRegisteredPage;
