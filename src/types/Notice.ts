import type { MediaInfo } from '@/types/Media/MediaInfo';

export interface Notice {
  id: number;
  userId: number;
  updatedDate: string;
  title: string;
  content: string;
  images: string[];
}

export interface NoticeCreateRequest {
  title: string;
  content: string;
  images: MediaInfo[];
}

export interface NoticeUpdateRequest {
  title: string;
  content: string;
  images: MediaInfo[];
}