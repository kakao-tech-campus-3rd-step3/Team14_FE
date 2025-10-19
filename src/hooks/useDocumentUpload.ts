import { useState } from 'react';
import { createDocumentPicker } from '@/utils/filePicker';
import { MAX_DOCUMENT_COUNT } from '@/constants/maxMediaSize';

export interface DocumentInfo {
  id: number;
  presignedUrl: string;
  fileName: string;
}

/**
 * 문서 업로드 훅
 * 증빙 서류 업로드 로직을 재사용하기 위한 커스텀 훅
 * @param initialDocuments - 초기 문서 목록
 * @returns documents, setDocuments, isUploading, handleFileUpload
 */
export const useDocumentUpload = (initialDocuments: DocumentInfo[] = []) => {
  const [documents, setDocuments] = useState<DocumentInfo[]>(initialDocuments);
  const [isUploading, setIsUploading] = useState(false);

  const pickAndUploadDocuments = createDocumentPicker(
    (uploaded) => {
      const totalAfterUpload = documents.length + uploaded.length;
      if (totalAfterUpload > MAX_DOCUMENT_COUNT) {
        alert(
          `최대 ${MAX_DOCUMENT_COUNT}개까지만 업로드할 수 있습니다.\n` +
            `현재: ${documents.length}개, 선택: ${uploaded.length}개`,
        );
        return;
      }
      setDocuments((prev) => [...prev, ...uploaded]);
    },
    setIsUploading,
    (error) => alert(error),
  );

  const handleFileUpload = () => {
    pickAndUploadDocuments();
  };

  return {
    documents,
    setDocuments,
    isUploading,
    handleFileUpload,
  };
};
