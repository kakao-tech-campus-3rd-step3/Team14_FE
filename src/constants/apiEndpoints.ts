const API_ENDPOINTS = {
  FESTIVALS: '/api/festivals/area/:areaId',
  FESTIVAL_INFO: '/api/festivals/:festivalId',
  FESTIVAL_WISH: '/api/festivals/:festivalId/wishes',
  FESTIVAL_WISH_DELETE: '/api/wishes/:wishId',
  FESTIVAL_REVIEWS: '/api/festivals/:festivalId/reviews',
  FESTIVAL_CHAT_ROOMS: '/api/festivals/:festivalId/chatRooms',
  FESTIVAL_CHAT_ROOM_MESSAGES: '/api/chatRooms/:chatRoomId/messages',
  CHAT: '/stomp',
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
