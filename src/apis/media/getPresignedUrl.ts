import { apiInstance } from "../apiInstance";
import API_ENDPOINTS from "@/constants/apiEndpoints";

export async function getPresignedUrl() {
    const { data } = await apiInstance.get(API_ENDPOINTS.PRESIGNED_URL);
    return data.content as { id: number; presignedUrl: string };
  }