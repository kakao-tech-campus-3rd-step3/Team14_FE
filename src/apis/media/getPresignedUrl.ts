import { apiInstance } from "../apiInstance";

export async function getPresignedUrl() {
    const { data } = await apiInstance.get('/api/presigned-url');
    return data.content as { id: number; presignedUrl: string };
  }