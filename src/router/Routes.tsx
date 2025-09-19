import { Route, Routes as RouterRoutes } from 'react-router-dom';
import { ROUTE_PATH } from '@/constants/routes';
import HomePage from '@/pages/Home/HomePage';
import LoginPage from '@/pages/Login/LoginPage';
import LoginCallback from '@/pages/Login/components/LoginCallback';
import MyPage from '@/pages/My/MyPage';
import PickPage from '@/pages/Pick/PickPage';
import FestivalsPage from '@/pages/Festivals/FestivalsPage';

const Routes = () => {
  return (
    <RouterRoutes>
      <Route path={ROUTE_PATH.HOME} element={<HomePage />} />
      <Route path={ROUTE_PATH.LOGIN} element={<LoginPage />} />
      <Route path={ROUTE_PATH.LOGIN_CALLBACK} element={<LoginCallback />} />
      <Route path={ROUTE_PATH.MY} element={<MyPage />} />
      <Route path={ROUTE_PATH.PICK} element={<PickPage />} />
      <Route path={ROUTE_PATH.FESTIVALS} element={<FestivalsPage />} />
    </RouterRoutes>
  );
};

export default Routes;
