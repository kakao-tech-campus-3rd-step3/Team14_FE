import Container from '@/components/common/Container';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import LoginContent from './components/LoginContent';

const LoginPage = () => {
  return (
    <Container>
      <Header variant="logo" />
      <LoginContent />
      <Footer />
    </Container>
  );
};

export default LoginPage;
