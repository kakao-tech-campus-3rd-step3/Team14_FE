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

export type ImageInfo = MediaInfo;
export type VideoInfo = MediaInfo;
// PosterInfo는 축제 등록 시에만 사용되므로 MediaInfo로 유지
// export type PosterInfo = MediaInfo; // 이 줄 제거하거나 주석 처리
