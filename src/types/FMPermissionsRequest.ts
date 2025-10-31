import type { MediaInfo } from '@/types/Media/MediaInfo';
export interface FMPermissionRequest {
  department: string;
  documents: MediaInfo[];
}

export type ApplicationState = 'PENDING' | 'ACCEPTED' | 'DENIED' | 'APPROVED' | 'PROCESSING';
