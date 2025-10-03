export const ROUTE_PATH = {
  HOME: '/',
  LOGIN: '/login',
  LOGIN_CALLBACK: '/cookie',
  MY: '/mypage',
  PICK: '/pick/:areaId',
  FESTIVALS: '/festivals/:areaId',
  FESTIVAL_INFO: '/festival/:festivalId',
  REVIEW: '/review/*', // review/:festivalId 였으나 사용자가 임의로 특정 숫자의 페이지에 접속할 경우에 대비해서 *로 변경하였습니다.
  LOGIN_CHECK: '/login/check',

  SEARCH: '/search', // 검색 추가 예정
} as const;
