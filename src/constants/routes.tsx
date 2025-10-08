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
  //세팅 페이지 내 마이리뷰 보기 기능 추가 - 중첩라우팅으로 변경 여지 있음
  MY_REVIEWS: '/settings/my-reviews',

  SEARCH: '/search', // 검색 추가 예정
} as const;
