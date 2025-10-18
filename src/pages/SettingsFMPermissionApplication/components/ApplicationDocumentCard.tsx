import Button from '@/components/common/Button';

interface ApplicationDocumentCardProps {
  documents: { id: number; presignedUrl: string; fileName: string }[];
  setDocuments: (documents: { id: number; presignedUrl: string; fileName: string }[]) => void;
  handleFileUpload: () => void;
  isUploading: boolean;
}
/**
 * 축제 관리자 승급 신청자를 위한 증빙 서류 업로드 카드
 * @param documents - 업로드된 서류 목록
 * @param setDocuments - 서류 목록을 설정하는 함수
 * @param handleFileUpload - 서류 업로드 함수
 * @param isUploading - 서류 업로드 상태
 * @returns 카드 컴포넌트
 */
const ApplicationDocumentCard = ({
  documents,
  setDocuments,
  handleFileUpload,
  isUploading,
}: ApplicationDocumentCardProps) => {
  const getFileIcon = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'pdf':
        return '📄';
      case 'doc':
      case 'docx':
        return '📘';
      case 'hwp':
        return '📗';
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return '🖼️';
      default:
        return '📎';
    }
  };

  return (
    <>
      {/* 증빙 서류 업로드 */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">
          증빙 서류 업로드 <span className="text-red-500">*</span>
        </h3>
        <p className="text-sm text-gray-600 mb-3">
          축제 관리자로 활동할 수 있는 자격을 증명할 수 있는 서류를 업로드해주세요.
          <br />
          (예: 재직증명서, 소속 증명서, 자격증, 경력 증명서 등)
        </p>

        <Button
          variant="secondary"
          className="w-full"
          onClick={handleFileUpload}
          disabled={isUploading}
        >
          📎 증빙 서류 업로드 (PDF, 이미지, 문서 파일)
        </Button>
        <p className="text-xs text-gray-500 mt-1">
          지원 형식: PDF, DOC, DOCX, HWP, 이미지 (최대 10MB/파일)
        </p>
      </div>

      {/* 업로드된 파일 목록 */}
      {documents.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            업로드된 서류 ({documents.length}개)
          </h4>
          <div className="space-y-2">
            {documents.map((doc, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <span className="text-xl">{getFileIcon(doc.fileName)}</span>
                  <span className="text-sm text-gray-700 truncate">{doc.fileName}</span>
                </div>
                <button
                  onClick={() => setDocuments(documents.filter((_, i) => i !== index))}
                  className="ml-2 px-2 py-1 text-red-500 hover:bg-red-50 rounded text-sm"
                  aria-label="파일 삭제"
                >
                  삭제
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ApplicationDocumentCard;
