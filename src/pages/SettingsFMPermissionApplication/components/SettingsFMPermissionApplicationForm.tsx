import { useState } from 'react';
import Button from '@/components/common/Button';
import useNav from '@/hooks/useNav';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postFMPermission, type PostFMPermissionBody } from '@/apis/festivalManager/postFMPermission';
import { ROUTE_PATH } from '@/constants/routes';
import { uploadDocumentFiles } from '@/utils/s3Upload';


const SettingsFMPermissionApplicationForm = () => {
  const [department, setDepartment] = useState('');
  const [documents, setDocuments] = useState<Array<{ id: number; presignedUrl: string; fileName: string }>>([]);
  const [isUploading, setIsUploading] = useState(false);
  
  const { goTo, goBack } = useNav();
  const queryClient = useQueryClient();

  const { mutate: submitApplication, isPending } = useMutation({
    mutationFn: (body: PostFMPermissionBody) => postFMPermission(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fmPermission'] });
      alert('축제 관리자 신청이 완료되었습니다.');
      goTo(ROUTE_PATH.FM_PERMISSION_STATUS);
    },
    onError: (error: any) => {
        console.error(' FM Permission 신청 에러:', error);
    console.error(' 에러 응답:', error.response);
    console.error('에러 데이터:', error.response?.data);
    console.error(' 에러 상태:', error.response?.status);
    console.error(' 에러 헤더:', error.response?.headers);
    console.error(' 에러 메시지:', error.response?.data?.message);
      if (error.response?.data?.message === 'duplicated') {
        alert('이미 신청서가 존재합니다.');
      } else {
        alert('신청서 제출에 실패했습니다. 다시 시도해주세요.');
      }
    },
  });

  const handleFileUpload = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.doc,.docx,.hwp,image/*';
    input.multiple = true;

    input.onchange = async () => {
      const files = input.files;
      if (!files || files.length === 0) return;

      try {
        setIsUploading(true);
        const fileArray = Array.from(files);
        
        // 파일 크기 검증 (각 파일 최대 10MB)
        const maxSize = 10 * 1024 * 1024;
        const oversizedFiles = fileArray.filter(f => f.size > maxSize);
        if (oversizedFiles.length > 0) {
          alert(`파일 크기는 10MB를 초과할 수 없습니다.\n문제 파일: ${oversizedFiles.map(f => f.name).join(', ')}`);
          return;
        }

        const uploaded = await uploadDocumentFiles(fileArray);
        setDocuments(prev => [...prev, ...uploaded]);
      } catch (error) {
        alert('파일 업로드에 실패했습니다. 다시 시도해주세요.');
        console.error(error);
      } finally {
        setIsUploading(false);
        input.remove();
      }
    };

    input.click();
  };

  const handleSubmit = async () => {
    const trimmedDepartment = department.trim();
    
    if (!trimmedDepartment) {
      return alert('부서명을 입력해주세요.');
    }
    
    if (trimmedDepartment.length < 2 || trimmedDepartment.length > 50) {
      return alert('부서명은 2자 이상 50자 이하여야 합니다.');
    }

    if (documents.length === 0) {
      return alert('최소 1개 이상의 증빙 서류를 업로드해주세요.');
    }


    submitApplication({
      department: trimmedDepartment,
      documents: documents.map(doc => ({
        id: doc.id,
        presignedUrl: doc.presignedUrl,
      })),
    });
  };

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
    <div className="bg-white rounded-lg p-4 shadow-sm">
      {/* 부서명 입력 */}
      <div className="mb-4">
        <label htmlFor="department" className="block font-semibold mb-2">
          소속 부서 <span className="text-red-500">*</span>
        </label>
        <input
          id="department"
          type="text"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          placeholder="예: 부산대학교 축제기획위원회"
          className="w-full p-3 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-300"
          maxLength={50}
        />
        <p className="text-xs text-gray-500 mt-1">
          소속된 단체, 기관, 부서명을 정확히 입력해주세요. (2-50자)
        </p>
      </div>

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
                  <span className="text-sm text-gray-700 truncate">
                    {doc.fileName}
                  </span>
                </div>
                <button
                  onClick={() => setDocuments(prev => prev.filter((_, i) => i !== index))}
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

      {/* 안내사항 */}
      <div className="mb-4 p-3 bg-blue-50 rounded-lg">
        <h4 className="text-sm font-medium text-blue-900 mb-1">안내사항</h4>
        <ul className="text-xs text-blue-800 space-y-1">
          <li>• 신청서 검토에는 영업일 기준 3~5일이 소요됩니다.</li>
          <li>• 승인 결과는 설정 페이지에서 확인할 수 있습니다.</li>
          <li>• 허위 서류 제출 시 계정이 정지될 수 있습니다.</li>
          <li>• 제출한 서류는 관리자 권한 심사 용도로만 사용됩니다.</li>
        </ul>
      </div>

      {/* 제출 버튼 */}
      <div className="flex gap-3">
        <Button variant="secondary" className="flex-1" onClick={goBack}>
          취소
        </Button>
        <Button
          variant="primary"
          className="flex-1"
          onClick={handleSubmit}
          disabled={isPending || isUploading || documents.length === 0 || !department.trim()}
        >
          {isPending || isUploading ? '제출 중...' : '신청하기'}
        </Button>
      </div>
    </div>
  );
};

export default SettingsFMPermissionApplicationForm;