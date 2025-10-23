/**
 * S3에 업로드된 미디어 정보
 */
export interface MediaInfo {
  id: number;
  presignedUrl: string;
}

/**
 * 파일명 정보가 포함된 문서 정보 (축제 관리자 신청 등에 사용)
 */
export interface DocumentInfo extends MediaInfo {
  fileName: string;
}
