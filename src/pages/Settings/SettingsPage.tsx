import Container from '@/components/common/Container';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import SettingsContent from './components/SettingsContent';

const SettingsPage = () => {
  return (
    <Container>
      <Header variant="page" title="설정" />
      <div className="flex flex-col items-center px-8 py-4 gap-12">
        <SettingsContent />
      </div>
      <Footer initialSelected="my" />
    </Container>
  );
};

export default SettingsPage;
