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

  MY_REVIEWS: '/settings/my-reviews',
  FM_PERMISSION_APPLICATION: '/settings/fm-permission-application',
  FM_PERMISSION_STATUS: '/settings/fm-permission-status',
  SEARCH: '/search',
} as const;
