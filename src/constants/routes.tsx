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

  SEARCH: '/search', // 검색 추가 예정
} as const;
