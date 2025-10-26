export const PICK_ICONS = {
  // 파일/문서 관련
  DOCUMENT: 'none',
  BOOK_GREEN: 'pdf',
  BOOK_BLUE: 'hwp',
  CLIP: 'clip',

  // 미디어 관련
  CAMERA: 'camera',
  VIDEO: 'video',
  IMAGE: 'img',
  FILM: 'film',

  // 액션 관련
  DELETE: 'trash',
  EDIT: 'edit',
  // 안내/표시
  PIN: 'pin',
  NOTICE: 'notice',

  // 상태 관련
  CHECK: 'check',
  TIME: 'time',
  NONE: 'none',
} as const;

export type PickIconName = (typeof PICK_ICONS)[keyof typeof PICK_ICONS];
