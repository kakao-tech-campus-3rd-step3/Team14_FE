import { Route, Routes as RouterRoutes } from 'react-router-dom';
import { ROUTE_PATH } from '@/constants/routes';
import HomePage from '@/pages/Home/HomePage';
import LoginPage from '@/pages/Login/LoginPage';
import LoginCallback from '@/pages/Login/components/LoginCallback';
import MyPage from '@/pages/My/MyPage';
import PickPage from '@/pages/Pick/PickPage';
import FestivalsPage from '@/pages/Festivals/FestivalsPage';
import FestivalInfoPage from '@/pages/FestivalInfo/FestivalInfoPage';
import ProtectedRoute from '@/router/ProtectedRoute';
import SearchPage from '@/pages/Search/SearchPage';
import ReviewPage from '@/pages/Review/ReviewPage';
import ChatPage from '@/pages/Chat/ChatPage';
import SettingsPage from '@/pages/Settings/SettingsPage';
import SettingsFestivalMyReviewsPage from '@/pages/SettingsFestivalMyReview/SettingsFestivalMyReviewsPage';
import SettingsFMPermissionApplicationPage from '@/pages/SettingsFMPermissionApplication/SettingsFMPermissionApplicationPage';
import SettingsFMPermissionStatusPage from '@/pages/SettingsFMPermissionStatus/SettingsFMPermissionStatusPage';
import SettingsFestivalMyManagePage from '@/pages/SettingsFestivalMyManage/SettingsFestivalMyManagePage';
import SettingsFestivalMyRegisteredPage from '@/pages/SettingsFestivalMyRegistered/SettingsFestivalMyRegisteredPage';
import SettingsFestivalRegisterPage from '@/pages/SettingsFestivalRegister/SettingsFestivalRegisterPage';
import FestivalManagerApplyPage from '@/pages/FestivalInfoManagerApply/FestivalInfoManagerApplyPage';

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
        path={ROUTE_PATH.FM_PERMISSION_APPLICATION}
        element={
          <ProtectedRoute>
            <SettingsFMPermissionApplicationPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTE_PATH.FM_PERMISSION_STATUS}
        element={
          <ProtectedRoute>
            <SettingsFMPermissionStatusPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTE_PATH.MY_REVIEWS}
        element={
          <ProtectedRoute>
            <SettingsFestivalMyReviewsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTE_PATH.FESTIVAL_REGISTER}
        element={
          <ProtectedRoute>
            <SettingsFestivalRegisterPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTE_PATH.FESTIVAL_MY_REGISTERED}
        element={
          <ProtectedRoute>
            <SettingsFestivalMyRegisteredPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTE_PATH.FESTIVAL_MY_MANAGE}
        element={
          <ProtectedRoute>
            <SettingsFestivalMyManagePage />
          </ProtectedRoute>
        }
      />
      <Route path={ROUTE_PATH.FESTIVALS} element={<FestivalsPage />} />
      <Route path={ROUTE_PATH.FESTIVAL_INFO} element={<FestivalInfoPage />} />
      <Route path={ROUTE_PATH.SEARCH} element={<SearchPage />} />
      <Route
        path={ROUTE_PATH.FESTIVAL_MANAGER_APPLY}
        element={
          <ProtectedRoute>
            <FestivalManagerApplyPage />
          </ProtectedRoute>
        }
      />
    </RouterRoutes>
  );
};

export default Routes;
