import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Container from "@/components/common/Container";

const SettingsFMPermissionStatusPage = () => {
  return (
    <Container>
      <Header variant="page" title="축제 관리자 신청 상태" />
      <Footer initialSelected="my" />
    </Container>
  );
};

export default SettingsFMPermissionStatusPage;