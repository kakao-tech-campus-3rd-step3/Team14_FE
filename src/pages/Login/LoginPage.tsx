import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '@/components/common/Container';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { useAuth } from '@/context/AuthContext';
import LoginContent from './components/LoginContent';

const LoginPage = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    // 이미 로그인되어 있으면 마이페이지로 자동 리다이렉트
    if (isLoggedIn) {
      console.log('이미 로그인되어 있음 - 마이페이지로 이동');
      navigate('/mypage', { replace: true });
    }
  }, [isLoggedIn, navigate]);

  // 로그인되어 있지 않은 경우 - 로그인 폼 표시
  return (
    <Container>
      <Header variant="logo" />
      <LoginContent />
      <Footer />
    </Container>
  );
};

export default LoginPage;
