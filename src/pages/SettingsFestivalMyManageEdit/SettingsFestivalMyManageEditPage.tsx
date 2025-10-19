import Container from '@/components/common/Container';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import SettingsFestivalMyManageEditContent from '@/pages/SettingsFestivalMyManageEdit/components/SettingsFestivalMyManageEditContent';
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