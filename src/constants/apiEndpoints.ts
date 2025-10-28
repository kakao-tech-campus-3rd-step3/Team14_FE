const API_ENDPOINTS = {
  USER_PROFILE_IMAGE: '/api/users/profileImage',
  FESTIVALS: '/api/festivals/area/:areaId',
  FESTIVAL_INFO: '/api/festivals/:festivalId',
  FESTIVAL_WISH: '/api/festivals/:festivalId/wishes',
  FESTIVAL_WISH_DELETE: '/api/wishes/:wishId',
  FESTIVAL_REVIEWS: '/api/festivals/:festivalId/reviews',
  FESTIVAL_CHAT_ROOMS: '/api/festivals/:festivalId/chatRooms',
  FESTIVAL_CHAT_ROOM_MESSAGES: '/api/chatRooms/:chatRoomId/messages',
  FESTIVAL_SEARCH: '/api/festivals',
  FESTIVAL_PICK: '/api/recommendations',
  CHAT: '/stomp',
  // OAuth 로그인
  GOOGLE_LOGIN: '/oauth2/authorization/google',
  KAKAO_LOGIN: '/oauth2/authorization/kakao',
  // JWT 토큰 교환
  JWT_EXCHANGE: '/api/jwt/exchange',
  // 사용자 정보
  USER_INFO: '/api/users/my',
  // 사용자 역할 조회
  USER_ROLE: '/api/users/role',
  // 로그아웃
  LOGOUT: '/api/users/logout',
  // 회원탈퇴
  DELETE_USER: '/api/users',
  // 내가 참여한 채팅 방 조회
  MY_CHATS: '/api/chatRooms/me',
  // 내가 좋아요한 축제 목록 조회
  MY_WISHES_FESTIVAL: '/api/festivals/wishedBy/me',
  // 내가 작성한 리뷰의 축제 목록 조회
  MY_REVIEWS_FESTIVAL: '/api/festivals/reviewedBy/me',
  // 내가 작성한 리뷰
  MY_REVIEWS: '/api/reviews/my',
  // 리뷰 (조회/수정/삭제)
  REVIEW_BY_ID: '/api/reviews/:reviewId',
  // 미디어 업로드
  PRESIGNED_URL: '/api/presigned-url',
  // 축제 관리자 신청
  FM_PERMISSION: '/api/fm-permissions',
  // 내가 축제 관리자 신청 조회
  FM_PERMISSION_MY: '/api/fm-permissions/my',
  // 축제 등록
  FESTIVAL_REGISTER: '/api/festivals',
  // 내가 등록한 축제 조회
  MY_FESTIVALS: '/api/festivals/my',
  // 축제 관리 신청
  FESTIVAL_MANAGER_APPLY: '/api/festival-permissions/festival/:festivalId',
  // 축제 관리 신청 조회
  FESTIVAL_MANAGER_APPLY_CHECK: '/api/festival-permissions/festival/:festivalId/check',
  // 내 축제 관리 신청 목록
  MY_FESTIVAL_PERMISSIONS: '/api/festival-permissions/my',
  // 축제 관리 신청 상세/수정/삭제
  FESTIVAL_PERMISSION_DETAIL: '/api/festival-permissions/:id',
  // 축제 공지사항 관련
  FESTIVAL_NOTICE: '/api/festivals/:festivalId/notices',
  FESTIVAL_NOTICE_DETAIL: '/api/festivals/notices/:id',
} as const;

export default API_ENDPOINTS;
