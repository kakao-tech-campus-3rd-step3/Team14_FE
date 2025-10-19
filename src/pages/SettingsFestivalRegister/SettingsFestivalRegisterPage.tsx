import Container from '@/components/common/Container';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

import SettingsFestivalRegisterContent from '@/pages/SettingsFestivalRegister/components/SettingsFestivalRegisterContent';

const SettingsFestivalRegisterPage = () => {

  return (
    <Container>
      <Header variant="page" title="축제 등록하기" />
      <SettingsFestivalRegisterContent />
      <Footer initialSelected="my" />
    </Container>
  );
};

export default SettingsFestivalRegisterPage;