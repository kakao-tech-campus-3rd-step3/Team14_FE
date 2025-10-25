import { useState } from 'react';
import { createDocumentPicker } from '@/utils/filePicker';
import { MAX_DOCUMENT_COUNT } from '@/constants/maxMediaSize';
import type { DocumentInfo } from '@/types/Media/MediaInfo';
import { SYSTEM_MESSAGES } from '@/constants/systemMessages';
import { showToastErrorMessage } from '@/utils/showToastMessage';

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
        showToastErrorMessage(
          SYSTEM_MESSAGES.MEDIA_UPLOAD.DOCUMENT_LIMIT_EXCEEDED(
            MAX_DOCUMENT_COUNT,
            documents.length,
            uploaded.length,
          ),
        );
        return;
      }
      setDocuments((prev) => [...prev, ...uploaded]);
    },
    setIsUploading,
    (error) => showToastErrorMessage(error),
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
