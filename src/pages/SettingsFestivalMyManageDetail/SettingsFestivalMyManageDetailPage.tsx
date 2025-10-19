import Container from '@/components/common/Container';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import SettingsFestivalMyManageDetailContent from '@/pages/SettingsFestivalMyManageDetail/components/SettingsFestivalMyManageDetailContent';
/**
 * 축제 관리 신청 상세 페이지
 * @returns 축제 관리 신청 상세 페이지 컴포넌트
 * 축제 관리 신청 상세 정보를 표시합니다.
 */
const SettingsFestivalMyManageDetailPage = () => {
  return (
    <Container>
      <Header variant="page" title="축제 관리 신청 상세" />
      <SettingsFestivalMyManageDetailContent />
      <Footer initialSelected="my" />
    </Container>
  );
};

export default SettingsFestivalMyManageDetailPage;
