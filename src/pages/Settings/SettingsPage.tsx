import Container from '@/components/common/Container';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import SettingsContent from '@/pages/Settings/components/SettingsContent';
import SettingsProfileCard from '@/pages/Settings/components/SettingsProfileCard';
import { useAuth } from '@/context/AuthContext';
/**
 * 설정 페이지
 * 다양한 기능들을 제공합니다.
 * @returns 설정 페이지 컴포넌트
 * 설정 페이지 내용을 표시합니다.
 */
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
