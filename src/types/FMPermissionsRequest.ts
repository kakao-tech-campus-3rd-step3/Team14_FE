export interface FMPermissionRequest {
  department: string;
  documents: Array<{
    id: number;
    presignedUrl: string;
  }>;
}
