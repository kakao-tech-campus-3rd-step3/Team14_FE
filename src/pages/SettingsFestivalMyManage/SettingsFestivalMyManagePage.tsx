import Container from '@/components/common/Container';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import SettingsFestivalMyManageContent from './components/SettingsFestivalMyManageContent';

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
