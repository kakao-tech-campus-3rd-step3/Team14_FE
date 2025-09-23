import { useAuth } from '@/context/AuthContext';
import { generatePath, useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '@/constants/routes';

interface ProtectedRouteProps {
  children: React.ReactNode;
}
/**
 * 로그인 확인 페이지
 * @param children - 로그인이 되었을 때 표시될 페이지
 */
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    navigate(generatePath(ROUTE_PATH.LOGIN));
  }

  return <>{children}</>;
};

export default ProtectedRoute;
