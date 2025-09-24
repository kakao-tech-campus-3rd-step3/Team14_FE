import { useEffect } from 'react';
import { generatePath, useLocation, useNavigate } from 'react-router-dom';
import Container from '@/components/common/Container';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { useAuth } from '@/context/AuthContext';
import LoginContent from './components/LoginContent';
import { ROUTE_PATH } from '@/constants/routes';
import { safePath } from '@/utils/safePath';
/**
 * 로그인 페이지
 * 로그인이 되어있지 않으면 로그인 페이지로 리다이렉트
 * 로그인 되어 있지 않을 시 로그인 폼 표시
 * continue 파라미터가 있을 시 해당 페이지로 리다이렉트
 * continue 파라미터가 없을 시 홈으로 리다이렉트
 * @param children - 로그인이 되었을 때 표시될 페이지
 * @returns 로그인 페이지
 */
const LoginPage = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (isLoggedIn) {
      const params = new URLSearchParams(location.search);
      const cont = safePath(params.get('continue'));

      navigate(cont ?? generatePath(ROUTE_PATH.HOME) , { replace: true });
    }
  }, [isLoggedIn, navigate, location.search]);

  return (
    <Container>
      <Header variant="logo" />
      <LoginContent />
      <Footer />
    </Container>
  );
};

export default LoginPage;
