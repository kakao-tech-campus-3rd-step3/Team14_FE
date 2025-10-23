import { getPresignedUrl } from '@/apis/media/getPresignedUrl';
import type { DocumentInfo, MediaInfo } from '@/types/Media/MediaInfo';

async function putToS3(presignedUrl: string, file: File) {
  await fetch(presignedUrl, { method: 'PUT', body: file });
}
// 쿼리 파라미터 제거하여 짧은 URL로 저장
function cleanUrl(presignedUrl: string) {
  return presignedUrl.split('?')[0];
}
export async function uploadImageFiles(files: File[]) {
  const results: MediaInfo[] = [];
  for (const f of files) {
    const { id, presignedUrl } = await getPresignedUrl();
    await putToS3(presignedUrl, f);
    results.push({ id, presignedUrl: cleanUrl(presignedUrl) });
  }
  return results;
}

export async function uploadVideoFile(file: File) {
  const { id, presignedUrl } = await getPresignedUrl();
  await putToS3(presignedUrl, file);
  return { id, presignedUrl: cleanUrl(presignedUrl) };
}

// 축제 관리자 신청 용 문서 업로드 함수
export async function uploadDocumentFiles(files: File[]) {
  const results: DocumentInfo[] = [];
  for (const file of files) {
    const { id, presignedUrl } = await getPresignedUrl();
    await putToS3(presignedUrl, file);
    results.push({
      id,
      presignedUrl: cleanUrl(presignedUrl),
      fileName: file.name,
    });
  }
  return results;
}
