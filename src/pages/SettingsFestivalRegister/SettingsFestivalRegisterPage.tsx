import Container from '@/components/common/Container';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

const SettingsFestivalRegisterPage = () => {
  return (
    <Container>
      <Header variant="page" title="축제 등록하기" />
      <div className="p-4">
        {/* 축제 등록 폼 구현 */}
        <p>축제 등록 페이지</p>
      </div>
      <Footer initialSelected="my" />
    </Container>
  );
};

export default SettingsFestivalRegisterPage;