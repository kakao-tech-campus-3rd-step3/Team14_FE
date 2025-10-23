import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import Container from '@/components/common/Container';
import SettingsFMPermissionStatusContent from '@/pages/SettingsFMPermissionStatus/components/SettingsFMPermissionStatusContent';
/**
 * 축제 관리자 신청 상태 페이지
 * @returns 축제 관리자 신청 상태 페이지 컴포넌트
 * 축제 관리자 신청 상태를 표시합니다.
 */
const SettingsFMPermissionStatusPage = () => {
  return (
    <Container>
      <Header variant="page" title="축제 관리자 신청 상태" />
      <SettingsFMPermissionStatusContent />
      <Footer initialSelected="my" />
    </Container>
  );
};

export default SettingsFMPermissionStatusPage;
