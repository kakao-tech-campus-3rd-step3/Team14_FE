
import Container from '@/components/common/Container';
import Header from '@/components/common/Header';
import SettingsFAQContent from '@/pages/SettingsFAQ/components/SettingsFAQContent';
/**
 * 자주 묻는 질문 페이지
 * @returns 자주 묻는 질문 페이지 컴포넌트
 * 자주 묻는 질문 목록을 표시합니다.
 */
const SettingsFAQPage = () => {
  return (
    <Container>
      <Header variant="page" title="자주 묻는 질문" />
      <SettingsFAQContent />
    </Container>
  );
};

export default SettingsFAQPage;

