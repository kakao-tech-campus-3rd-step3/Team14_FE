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
import SettingsFestivalMyManageDetailPage from '@/pages/SettingsFestivalMyManageDetail/SettingsFestivalMyManageDetailPage';
import SettingsFestivalMyManageEditPage from '@/pages/SettingsFestivalMyManageEdit/SettingsFestivalMyManageEditPage';
import SettingsFAQPage from '@/pages/SettingsFAQ/SettingsFAQPage';
import FestivalInfoNoticeCreatePage from '@/pages/FestivalInfoNoticeCreate/FestivalInfoNoticeCreatePage';
import FestivalInfoNoticeEditPage from '@/pages/FestivalInfoNoticeEdit/FestivalInfoNoticeEditPage';
import FestivalInfoNoticeListPage from '@/pages/FestivalInfoNoticeList/FestivalInfoNoticeListPage';
import NotFoundPage from '@/pages/NotFound/NotFoundPage';
import ReviewEditPage from '@/pages/ReviewEdit/ReviewEditPage';
import FestivalInfoEditPage from '@/pages/FestivalInfoEdit/FestivalInfoEditPage';

/**
 * 라우터 컴포넌트
 * 로그인 필요 여부에 따라 ProtectedRoute 컴포넌트로 감싸져 있음
 * @returns 라우터 컴포넌트
 */
const Routes = () => {
  return (
    <RouterRoutes>
      {publicRoutes.map(({ path, component: Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
      {protectedRoutes.map(({ path, component: Component }) => (
        <Route
          key={path}
          path={path}
          element={
            <ProtectedRoute>
              <Component />
            </ProtectedRoute>
          }
        />
      ))}
    </RouterRoutes>
  );
};

export default Routes;

const publicRoutes = [
  { path: ROUTE_PATH.HOME, component: HomePage },
  { path: ROUTE_PATH.LOGIN, component: LoginPage },
  { path: ROUTE_PATH.LOGIN_CALLBACK, component: LoginCallback },
  { path: ROUTE_PATH.SEARCH, component: SearchPage },
  { path: ROUTE_PATH.FESTIVALS, component: FestivalsPage },
  { path: ROUTE_PATH.FESTIVAL_INFO, component: FestivalInfoPage },
  { path: ROUTE_PATH.NOT_FOUND, component: NotFoundPage },
] as const;

const protectedRoutes = [
  { path: ROUTE_PATH.MY, component: MyPage },
  { path: ROUTE_PATH.PICK, component: PickPage },
  { path: ROUTE_PATH.REVIEW, component: ReviewPage },
  { path: ROUTE_PATH.CHAT, component: ChatPage },
  { path: ROUTE_PATH.SETTINGS, component: SettingsPage },
  { path: ROUTE_PATH.FM_PERMISSION_APPLICATION, component: SettingsFMPermissionApplicationPage },
  { path: ROUTE_PATH.FM_PERMISSION_STATUS, component: SettingsFMPermissionStatusPage },
  { path: ROUTE_PATH.MY_REVIEWS, component: SettingsFestivalMyReviewsPage },
  { path: ROUTE_PATH.FESTIVAL_REGISTER, component: SettingsFestivalRegisterPage },
  { path: ROUTE_PATH.FESTIVAL_MY_REGISTERED, component: SettingsFestivalMyRegisteredPage },
  { path: ROUTE_PATH.FESTIVAL_MY_MANAGE, component: SettingsFestivalMyManagePage },
  { path: ROUTE_PATH.FESTIVAL_MY_MANAGE_DETAIL, component: SettingsFestivalMyManageDetailPage },
  { path: ROUTE_PATH.FESTIVAL_MY_MANAGE_EDIT, component: SettingsFestivalMyManageEditPage },
  { path: ROUTE_PATH.FAQ, component: SettingsFAQPage },
  { path: ROUTE_PATH.FESTIVAL_MANAGER_APPLY, component: FestivalManagerApplyPage },
  { path: ROUTE_PATH.FESTIVAL_NOTICE_CREATE, component: FestivalInfoNoticeCreatePage },
  { path: ROUTE_PATH.FESTIVAL_NOTICES, component: FestivalInfoNoticeListPage },
  { path: ROUTE_PATH.FESTIVAL_NOTICE_EDIT, component: FestivalInfoNoticeEditPage },
  { path: ROUTE_PATH.REVIEW_EDIT, component: ReviewEditPage },
  { path: ROUTE_PATH.FESTIVAL_EDIT, component: FestivalInfoEditPage },
];
