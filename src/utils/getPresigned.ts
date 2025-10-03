import { apiInstance } from '@/apis/apiInstance';

async function getPresigned() {
  const { data } = await apiInstance.get('/api/presigned-url');
  return data.content as { id: number; presignedUrl: string };
}

async function putToS3(presignedUrl: string, file: File) {
  await fetch(presignedUrl, { method: 'PUT', body: file });
}

export async function uploadImageFiles(files: File[]) {
  const results: { id: number; presignedUrl: string }[] = [];
  for (const f of files) {
    const { id, presignedUrl } = await getPresigned();
    await putToS3(presignedUrl, f);
    // 쿼리 파라미터 제거하여 짧은 URL로 저장
    const shortUrl = presignedUrl.split('?')[0];
    results.push({ id, presignedUrl: shortUrl });
  }
  return results;
}

export async function uploadVideoFile(file: File) {
  const { id, presignedUrl } = await getPresigned();
  await putToS3(presignedUrl, file);
  // 쿼리 파라미터 제거하여 짧은 URL로 저장
  const shortUrl = presignedUrl.split('?')[0];
  return { id, presignedUrl: shortUrl };
}
