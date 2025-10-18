export interface FMPermissionResponse {
    department: string;
    documents: Array<{
      id: number;
      presignedUrl: string;
    }>;
  }