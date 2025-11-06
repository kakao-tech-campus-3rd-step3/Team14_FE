/**
 * 시스템 메시지 상수
 * 상황별 시스템 메시지를 정의해두었습니다.
 * @returns 시스템 메시지 상수
 */

export const SYSTEM_MESSAGES = {
  // 축제 수정 관련
  FESTIVAL_EDIT: {
    SUCCESS: '축제가 수정되었습니다.',
    ERROR: '축제 수정에 실패했습니다. 다시 시도해주세요.',
  },
  // 축제 삭제 관련
  FESTIVAL_DELETE: {
    SUCCESS: '축제 정보가 삭제되었습니다.',
    ERROR: '축제 정보 삭제에 실패했습니다. 다시 시도해주세요.',
  },
  // 입력 관련
  INPUT_FORM: {
    TITLE_REQUIRED: '제목을 입력해주세요.',
    CONTENT_REQUIRED: '내용을 입력해주세요.',
    LENGTH_REQUIRED: (min: number, max: number) => `내용은 ${min}자 이상 ${max}자 이하여야 합니다.`,
  },
  // 축제 관리자 권한 신청 관련
  FM_PERMISSION: {
    ALREADY_APPLIED: '축제 관리자 신청이 된 상태입니다.',
    NO_PERMISSION: '축제 관리자 권한이 없습니다. 승급 신청을 해주세요.',
    CHECK_ERROR: '권한 확인 중 오류가 발생했습니다. 다시 시도해주세요.',
  },

  // 축제 관리자 신청서 관리 (승급)
  FM_APPLICATION: {
    SUBMIT_SUCCESS: '축제 관리자 신청이 완료되었습니다.',
    ALREADY_EXISTS: '이미 신청서가 존재합니다.',
    CANNOT_APPLY: '신청할 수 없습니다. 관리자에게 문의해주세요.',
    SUBMIT_ERROR: '신청서 제출에 실패했습니다. 다시 시도해주세요.',
    UPDATE_SUCCESS: '신청서 수정이 완료되었습니다.',
    UPDATE_NO_PERMISSION: '수정 권한이 없습니다.',
    UPDATE_NOT_FOUND: '신청서를 찾을 수 없습니다.',
    UPDATE_INVALID_REQUEST: '잘못된 요청입니다. 입력값을 확인해주세요.',
    UPDATE_ERROR: '신청서 수정에 실패했습니다. 다시 시도해주세요.',
    DELETE_SUCCESS: '신청서가 삭제되었습니다.',
    DELETE_ERROR: '신청서 삭제에 실패했습니다.',
    DELETE_CONFIRM: '정말 신청서를 삭제하시겠습니까?',
  },

  // 신청서 유효성 검사
  FM_APPLICATION_VALIDATION: {
    DEPARTMENT_REQUIRED: '소속된 단체의 이름을 입력해주세요.',
    DEPARTMENT_LENGTH: '소속된 단체의 이름은 2자 이상 50자 이하여야 합니다.',
    DOCUMENT_REQUIRED: '최소 1개 이상의 증빙 서류를 업로드해주세요.',
  },

  // 축제 등록 관련
  FESTIVAL_REGISTER: {
    SUCCESS: '축제가 성공적으로 등록되었습니다!',
    NO_PERMISSION: '축제 등록 권한이 없습니다. 축제 관리자 승인이 필요합니다.',
    ERROR: '축제 등록에 실패했습니다. 다시 시도해주세요.',
    FIELD_ERROR: (errors: string) => `입력 오류:\n${errors}`,
  },

  // 축제 관리 신청 (특정 축제에 대한 관리자 신청)
  FESTIVAL_MANAGER_APPLY: {
    SUCCESS: '축제 관리 신청이 완료되었습니다!',
    ALREADY_APPLIED: '이미 이 축제의 관리자 신청이 존재합니다.',
    MANAGER_ALREADY_EXISTS: '이미 이 축제의 관리자가 존재합니다.',
    INVALID_REQUEST: '신청할 수 없습니다. 입력값을 확인해주세요.',
    NO_PERMISSION: '축제 관리자 권한이 필요합니다.',
    ERROR: '신청 제출에 실패했습니다. 다시 시도해주세요.',
    ALREADY_MANAGER: '이미 이 축제의 관리자입니다.',
    NEED_FM_PERMISSION_TITLE: '권한이 필요해요',
    NEED_FM_PERMISSION_MESSAGE:
      '축제 관리자만 축제를 관리할 수 있습니다.\n축제 관리자 권한을 신청해주세요.',
    HAS_APPLIED_TITLE: '신청 내역이 있습니다',
    HAS_APPLIED_MESSAGE: '이미 이 축제에 관리자 신청을 하셨습니다.\n승인을 기다려주세요.',
    CHECK_ERROR: '확인 중 오류가 발생했습니다. 다시 시도해주세요.',
    GET_APPLICATION_ERROR: '축제 관리 신청 내역을 가져오는데 실패했습니다.',
  },

  // 축제 관리 신청 수정
  FESTIVAL_MANAGER_EDIT: {
    SUCCESS: '축제 관리 신청이 수정되었습니다!',
    INVALID_REQUEST: '수정할 수 없습니다. 입력값을 확인해주세요.',
    ERROR: '수정에 실패했습니다. 다시 시도해주세요.',
  },

  // 리뷰 관련
  REVIEW: {
    SUBMIT_SUCCESS: '리뷰가 작성되었습니다.',
    SUBMIT_ERROR: '리뷰 작성에 실패했습니다.',
    LOGIN_REQUIRED: '로그인이 필요합니다.',
    SCORE_REQUIRED: '별점을 선택해주세요. (1~5점)',
    CONTENT_LENGTH: '내용은 10자 이상 500자 이하여야 합니다.',
    DELETE_CONFIRM: '정말로 이 리뷰를 삭제하시겠습니까?',
    DELETE_SUCCESS: '리뷰가 삭제되었습니다.',
    DELETE_ERROR: '리뷰 삭제에 실패했습니다.',
  },

  // 프로필 이미지 관련
  PROFILE_IMAGE: {
    UPDATE_ERROR: '프로필 사진 변경에 실패했습니다. 다시 시도해주세요.',
    FILE_SIZE_EXCEED: (maxSizeMB: number) =>
      `파일 크기가 ${Math.round(maxSizeMB / 1024 / 1024)}MB를 초과합니다.`,
    INVALID_FILE_TYPE: '이미지 파일만 업로드 가능합니다.',
    NO_IMAGE_SELECTED: '이미지를 선택해주세요.',
    UPLOAD_ERROR: '이미지 업로드에 실패했습니다.',
    UPDATE_SUCCESS_TITLE: '프로필 사진이 변경되었습니다!',
    UPDATE_SUCCESS_MESSAGE: '프로필 사진이 성공적으로 변경되었습니다.',
  },

  // 포스터 업로드 관련
  POSTER: {
    FILE_SIZE_EXCEED: (maxSizeMB: number) =>
      `이미지 크기는 ${Math.round(maxSizeMB / 1024 / 1024)}MB를 초과할 수 없습니다.`,
    INVALID_FILE_TYPE: '이미지 파일만 업로드 가능합니다.',
    UPLOAD_ERROR: '포스터 업로드에 실패했습니다.',
  },

  // 미디어 업로드 관련
  MEDIA_UPLOAD: {
    IMAGE_LIMIT_EXCEEDED: (max: number, current: number) =>
      `이미지는 최대 ${max}개까지만 업로드할 수 있습니다. (현재: ${current}개)`,
    DOCUMENT_LIMIT_EXCEEDED: (max: number, current: number, selected: number) =>
      `최대 ${max}개까지만 업로드할 수 있습니다.\n현재: ${current}개, 선택: ${selected}개`,
  },

  // 로그아웃 관련
  LOGOUT: {
    CONFIRM: '로그아웃 하시겠습니까?',
    ERROR: '로그아웃에 실패했습니다. 다시 시도해주세요.',
  },

  // 회원탈퇴 관련
  DELETE_ACCOUNT: {
    CONFIRM_PRIMARY:
      '정말로 회원탈퇴를 하시겠습니까?\n탈퇴 시 모든 데이터가 삭제되며 복구할 수 없습니다.',
    CONFIRM_SECONDARY:
      '회원탈퇴를 진행하면\n• 작성한 모든 리뷰가 삭제됩니다\n• 등록한 축제 정보가 삭제됩니다\n• 신청한 내역이 모두 삭제됩니다\n\n정말로 탈퇴하시겠습니까?',
    SUCCESS: '회원탈퇴가 완료되었습니다. 그동안 이용해주셔서 감사합니다.',
    ERROR: '회원탈퇴에 실패했습니다. 다시 시도해주세요.',
  },

  // HTTP 상태 코드별 에러 메시지
  HTTP_ERROR_MESSAGES: {
    400: '요청이 올바르지 않습니다. 다시 시도해주세요.',
    401: '로그인이 필요합니다. 다시 로그인해주세요.',
    403: '해당 페이지에 접근할 권한이 없습니다.',
    404: '요청하신 페이지를 찾을 수 없습니다.',
    408: '요청 시간이 초과되었습니다. 다시 시도해주세요.',
    409: '데이터 충돌이 발생했습니다. 새로고침 후 다시 시도해주세요.',
    429: '너무 많은 요청을 보냈습니다. 잠시 후 다시 시도해주세요.',
    500: '서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.',
    502: '서버에 연결할 수 없습니다. 네트워크 상태를 확인해주세요.',
    503: '현재 서비스를 이용할 수 없습니다. 잠시 후 다시 시도해주세요.',
    504: '서버 응답이 지연되고 있습니다. 잠시 후 다시 시도해주세요.',
  },
  // 기본 에러 메시지
  DEFAULT_ERROR_MESSAGES: {
    NETWORK_ERROR: '인터넷 연결을 확인하고 다시 시도해주세요.',
    TIMEOUT_ERROR: '요청 시간이 초과되었습니다. 다시 시도해주세요.',
    UNKNOWN_ERROR: '오류가 발생했습니다. 다시 시도해주세요.',
    PARSING_ERROR: '데이터를 처리하는 중 오류가 발생했습니다.',
    URL_INVALID: '유효하지 않은 URL입니다.',
  },
  // 채팅 관련
  CHAT: {
    MAX_MESSAGE_LENGTH: '최대 255자까지 입력 가능합니다.',
  },
} as const;
