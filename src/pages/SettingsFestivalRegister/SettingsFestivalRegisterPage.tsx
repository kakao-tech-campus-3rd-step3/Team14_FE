import Container from '@/components/common/Container';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

import SettingsFestivalRegisterContent from '@/pages/SettingsFestivalRegister/components/SettingsFestivalRegisterContent';
/**
 * 축제 등록 페이지
 * @returns 축제 등록 페이지 컴포넌트
 * 축제 등록 폼을 표시합니다.
 * @returns
 */
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
