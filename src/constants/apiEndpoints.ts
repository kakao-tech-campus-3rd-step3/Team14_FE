const API_ENDPOINTS = {
  FESTIVALS: '/api/festivals/area/:areaId',
  FESTIVAL_INFO: '/api/festivals/:festivalId',
  // OAuth 로그인
  GOOGLE_LOGIN: '/oauth2/authorization/google',
  KAKAO_LOGIN: '/oauth2/authorization/kakao',
  // JWT 토큰 교환
  JWT_EXCHANGE: '/api/jwt/exchange',
  // 사용자 정보
  USER_INFO: '/api/users/my',
  // 로그아웃
  LOGOUT: '/api/users/logout',
} as const;

export default API_ENDPOINTS;
