import Container from "@/components/common/Container";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

const SettingsFestivalManagerPage = () => {
  return (
    <Container>
      <Header variant="page" title="축제 관리자" /> 
      <Footer initialSelected="my" />
    </Container>
  );
};

export default SettingsFestivalManagerPage;