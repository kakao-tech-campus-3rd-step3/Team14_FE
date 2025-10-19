import Container from '@/components/common/Container';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import SettingsFestivalMyManageDetailContent from '@/pages/SettingsFestivalMyManageDetail/components/SettingsFestivalMyManageDetailContent';

const SettingsFestivalMyManageDetailPage = () => {
  return (
    <Container>
      <Header variant="page" title="축제 관리 신청 상세" />
      <SettingsFestivalMyManageDetailContent />
      <Footer initialSelected="my" />
    </Container>
  );
};

export default SettingsFestivalMyManageDetailPage;
