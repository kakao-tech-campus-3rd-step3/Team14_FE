import { useAuth } from '@/context/AuthContext';
import { generatePath, useLocation, useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '@/constants/routes';
import { useEffect } from 'react';
import SEOHead from '@/components/common/SEOHead';

interface ProtectedRouteProps {
  children: React.ReactNode;
}
/**
 * 로그인 확인 페이지
 * 로그인이 되어있지 않으면 로그인 페이지로 리다이렉트
 * 리다이렉트 중이면 렌더 막기
 * @param children - 로그인이 되었을 때 표시될 페이지
 */
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoggedIn) {
      const cont = encodeURIComponent(location.pathname + location.search + location.hash);
      navigate(`${generatePath(ROUTE_PATH.LOGIN)}?continue=${cont}`, {
        replace: true,
      });
    }
  }, [isLoggedIn, navigate, location]);

  if (!isLoggedIn) return null;

  const currentUrl = `${location.pathname}${location.search}${location.hash}`;

  return (
    <>
      <SEOHead noindex={true} url={currentUrl} />
      {children}
    </>
  );
};

export default ProtectedRoute;
