import { Route, Routes as RouterRoutes } from 'react-router-dom';
import { ROUTE_PATH } from '@/constants/routes';
import HomePage from '@/pages/Home/HomePage';
import LoginPage from '@/pages/Login/LoginPage';
import LoginCallback from '@/pages/Login/components/LoginCallback';
import MyPage from '@/pages/My/MyPage';
import PickPage from '@/pages/Pick/PickPage';
import FestivalsPage from '@/pages/Festivals/FestivalsPage';
import ProtectedRoute from './ProtectedRoute';
/**
 * 라우터 컴포넌트
 * 로그인 필요 여부에 따라 ProtectedRoute 컴포넌트로 감싸져 있음
 * @returns 라우터 컴포넌트
 */
const Routes = () => {
  return (
    <RouterRoutes>
      <Route path={ROUTE_PATH.HOME} element={<HomePage />} />
      <Route path={ROUTE_PATH.LOGIN} element={<LoginPage />} />
      <Route path={ROUTE_PATH.LOGIN_CALLBACK} element={<LoginCallback />} />
      <Route
        path={ROUTE_PATH.MY}
        element={
          <ProtectedRoute>
            <MyPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTE_PATH.PICK}
        element={
          <ProtectedRoute>
            <PickPage />
          </ProtectedRoute>
        }
      />
      <Route path={ROUTE_PATH.FESTIVALS} element={<FestivalsPage />} />
    </RouterRoutes>
  );
};

export default Routes;
