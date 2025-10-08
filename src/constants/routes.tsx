export const ROUTE_PATH = {
  HOME: '/',
  LOGIN: '/login',
  LOGIN_CALLBACK: '/cookie',
  MY: '/mypage',
  PICK: '/pick/:areaId',
  FESTIVALS: '/festivals/:areaId',
  FESTIVAL_INFO: '/festival/:festivalId',
  REVIEW: '/review/:festivalId',
  CHAT: '/chat/:festivalId',
  LOGIN_CHECK: '/login/check',
  SETTINGS: '/settings',
  MY_FESTIVALS: '/settings/my-festivals',
  FESTIVAL_MANAGER: '/settings/festival-manager',
  FESTIVAL_ADMIN: '/settings/festival-admin',
  MY_REVIEWS: '/settings/my-reviews',
  PROFILE_IMAGE: '/settings/profile-image',
  SEARCH: '/search', // 검색 추가 예정
} as const;
