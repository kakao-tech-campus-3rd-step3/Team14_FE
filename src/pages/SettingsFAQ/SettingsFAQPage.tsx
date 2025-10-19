
import Container from '@/components/common/Container';
import Header from '@/components/common/Header';
import SettingsFAQContent from '@/pages/SettingsFAQ/components/SettingsFAQContent';

const SettingsFAQPage = () => {
  return (
    <Container>
      <Header variant="page" title="자주 묻는 질문" />
      <SettingsFAQContent />
    </Container>
  );
};

export default SettingsFAQPage;

