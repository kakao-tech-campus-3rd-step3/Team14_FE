import Container from '@/components/common/Container';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import SettingsFestivalMyRegisteredContent from '@/pages/SettingsFestivalMyRegistered/components/SettingsFestivalMyRegisteredContent';

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
