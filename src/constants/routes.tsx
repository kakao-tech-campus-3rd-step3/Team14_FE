export const ROUTE_PATH = {
  HOME: '/',
  LOGIN: '/login',
  LOGIN_CALLBACK: '/cookie',
  MY: '/mypage',
  PICK: '/pick/:areaId',
  FESTIVALS: '/festivals/:areaId',

  LOGIN_CHECK: '/login/check',

  SEARCH: '/search', // 검색 추가 예정
} as const;
