import Container from '@/components/common/Container';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import SettingsFMPermissionApplicationForm from '@/pages/SettingsFMPermissionApplication/components/SettingsFMPermissionApplicationForm';
import SettingsFMPermissionEditForm from './components/SettingsFMPermissionEditForm';
import { useSearchParams } from 'react-router-dom';

const SettingsFMPermissionApplicationPage = () => {
  const [searchParams] = useSearchParams();
  const isEdit = searchParams.get('mode') === 'edit';
  return (
    <Container>
      <Header variant="page" title={isEdit ? '신청서 수정' : '축제 관리자 신청'} />
      {isEdit ? <SettingsFMPermissionEditForm /> : <SettingsFMPermissionApplicationForm />}
      <Footer initialSelected="my" />
    </Container>
  );
};

export default SettingsFMPermissionApplicationPage;
