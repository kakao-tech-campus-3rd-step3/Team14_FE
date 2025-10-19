import Container from '@/components/common/Container';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import SettingsFestivalMyManageContent from '@/pages/SettingsFestivalMyManage/components/SettingsFestivalMyManageContent';

/**
 * 내가 관리하는 축제 페이지
 * @returns 내가 관리하는 축제 페이지 컴포넌트
 * 내가 관리하는 축제 목록을 표시합니다.
 */
const SettingsFestivalMyManagePage = () => {
  return (
    <Container>
      <Header variant="page" title="내가 관리하는 축제" />
      <SettingsFestivalMyManageContent />
      <Footer initialSelected="my" />
    </Container>
  );
};

export default SettingsFestivalMyManagePage;
