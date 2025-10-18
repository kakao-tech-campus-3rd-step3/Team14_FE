import Container from '@/components/common/Container';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import SettingsFMPermissionApplicationForm from '@/pages/SettingsFMPermissionApplication/components/SettingsFMPermissionApplicationForm';

const SettingsFMPermissionApplicationPage = () => {
  return (
    <Container>
      <Header variant="page" title="축제 관리자 신청" />
      <SettingsFMPermissionApplicationForm />
      <Footer initialSelected="my" />
    </Container>
  );
};

export default SettingsFMPermissionApplicationPage;
