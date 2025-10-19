import Container from '@/components/common/Container';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import SettingsFestivalMyManageEditContent from '@/pages/SettingsFestivalMyManageEdit/components/SettingsFestivalMyManageEditContent';
/**
 * 축제 관리 신청 수정 페이지
 * @returns 축제 관리 신청 수정 페이지 컴포넌트
 * 축제 관리 신청 수정 폼을 표시합니다.
 */
const SettingsFestivalMyManageEditPage = () => {
  return (
    <Container>
      <Header variant="page" title="축제 관리 신청 수정" />
      <SettingsFestivalMyManageEditContent />
      <Footer initialSelected="my" />
    </Container>
  );
};

export default SettingsFestivalMyManageEditPage;
