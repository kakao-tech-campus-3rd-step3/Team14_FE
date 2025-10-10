import { Route, Routes as RouterRoutes } from 'react-router-dom';
import { ROUTE_PATH } from '@/constants/routes';
import HomePage from '@/pages/Home/HomePage';
import LoginPage from '@/pages/Login/LoginPage';
import LoginCallback from '@/pages/Login/components/LoginCallback';
import MyPage from '@/pages/My/MyPage';
import PickPage from '@/pages/Pick/PickPage';
import FestivalsPage from '@/pages/Festivals/FestivalsPage';
import FestivalInfoPage from '@/pages/FestivalInfo/FestivalInfoPage';
import ProtectedRoute from './ProtectedRoute';
import SearchPage from '@/pages/Search/SearchPage';
import ReviewPage from '@/pages/Review/ReviewPage';
import ChatPage from '@/pages/Chat/ChatPage';
import SettingsPage from '@/pages/Settings/SettingsPage';
import MyReviewsPage from '@/pages/SettingsMyReview/MyReviewsPage';

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
      <Route
        path={ROUTE_PATH.REVIEW}
        element={
          <ProtectedRoute>
            <ReviewPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTE_PATH.CHAT}
        element={
          <ProtectedRoute>
            <ChatPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTE_PATH.SETTINGS}
        element={
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTE_PATH.MY_REVIEWS}
        element={
          <ProtectedRoute>
            <MyReviewsPage />
          </ProtectedRoute>
        }
      />
      <Route path={ROUTE_PATH.FESTIVALS} element={<FestivalsPage />} />
      <Route path={ROUTE_PATH.FESTIVAL_INFO} element={<FestivalInfoPage />} />
      <Route path={ROUTE_PATH.SEARCH} element={<SearchPage />} />
    </RouterRoutes>
  );
};

export default Routes;
