import Container from '@/components/common/Container';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

const SettingsFestivalMyManagePage = () => {
  return (
    <Container>
      <Header variant="page" title="내가 관리하는 축제" />
      <div className="p-4">
        {/* 내가 관리하는 축제 목록 구현 */}
        <p>내가 관리하는 축제 목록</p>
      </div>
      <Footer initialSelected="my" />
    </Container>
  );
};

export default SettingsFestivalMyManagePage;