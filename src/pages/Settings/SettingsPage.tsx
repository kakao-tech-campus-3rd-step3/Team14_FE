import Container from '@/components/common/Container';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import SettingsContent from './components/SettingsContent';
import SettingsProfileCard from './components/SettingsProfileCard';
import { useAuth } from '@/context/AuthContext';

const SettingsPage = () => {
  const { userInfo } = useAuth();
  return (
    <Container>
      <Header variant="page" title="설정" />
      <div className="p-4">{userInfo && <SettingsProfileCard userInfo={userInfo} />}</div>
      <div className="flex flex-col items-center px-8 py-4 gap-4">
        <SettingsContent />
      </div>
      <Footer initialSelected="my" />
    </Container>
  );
};

export default SettingsPage;
