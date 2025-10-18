import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getMyFMPermission } from '@/apis/festivalManager/getMyFMPermission';
import { deleteFMPermission } from '@/apis/festivalManager/deleteFMPermission';
import Button from '@/components/common/Button';
import useNav from '@/hooks/useNav';
import { ROUTE_PATH } from '@/constants/routes';
import axios from 'axios';
import EmptyComponent from '@/components/common/EmptyComponent';
import ErrorComponent from '@/components/common/ErrorComponent';
import LoadingSpinner from '@/components/common/LoadingSpinner';

const SettingsFMPermissionStatusContent = () => {
  const { goTo, goBack } = useNav();
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['fmPermission'],
    queryFn: getMyFMPermission,
    retry: false, // 404 시 재시도하지 않음
  });

  const { mutate: deleteApplication, isPending: isDeleting } = useMutation({
    mutationFn: deleteFMPermission,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fmPermission'] });
      alert('신청서가 삭제되었습니다.');
      goBack();
    },
    onError: () => {
      alert('신청서 삭제에 실패했습니다.');
    },
  });

  const handleDelete = () => {
    if (confirm('정말 신청서를 삭제하시겠습니까?')) {
      deleteApplication();
    }
  };

  const handleEdit = () => {
    // 수정 페이지로 이동 (나중에 구현)
    alert('수정 기능은 준비 중입니다.');
  };

  // 로딩 중
  if (isLoading) {
    return <LoadingSpinner size="lg" className="min-h-[400px]" message="신청서를 불러오는 중..." />;
  }

  // 404 에러 (신청서가 없음)
  if (isError && axios.isAxiosError(error) && error.response?.status === 404) {
    return (
      <div className="p-4">
        <EmptyComponent
          title="신청서가 없습니다"
          description="아직 축제 관리자 신청을 하지 않으셨습니다."
        />
        <div className="flex justify-center mt-4">
          <Button variant="primary" onClick={() => goTo(ROUTE_PATH.FM_PERMISSION_APPLICATION)}>
            신청서 작성하기
          </Button>
        </div>
      </div>
    );
  }

  // TODO: 에러 처리 수정
  if (isError) {
    return (
      <ErrorComponent
        title="오류가 발생했습니다"
        message="신청서를 불러오는 중 문제가 발생했습니다."
        showBackButton={true}
      />
    );
  }

  const permission = data?.data.content;
  if (!permission) return null;

  // 상태에 따른 스타일과 메시지
  const getStatusInfo = (state: string) => {
    switch (state) {
      case 'PENDING':
        return {
          color: 'bg-yellow-100 text-yellow-800 border-yellow-300',
          icon: '⏳',
          label: '심사 중',
          message: '신청서가 검토 중입니다. 영업일 기준 3~5일이 소요됩니다.',
        };
      case 'ACCEPTED':
        return {
          color: 'bg-green-100 text-green-800 border-green-300',
          icon: '✅',
          label: '승인됨',
          message: '축제 관리자로 승인되었습니다!',
        };
      case 'DENIED':
        return {
          color: 'bg-red-100 text-red-800 border-red-300',
          icon: '❌',
          label: '거절됨',
          message: '신청이 거절되었습니다. 다시 신청하실 수 있습니다.',
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-800 border-gray-300',
          icon: '📄',
          label: '알 수 없음',
          message: '',
        };
    }
  };

  const statusInfo = getStatusInfo(permission.state);

  return (
    <div className="p-4 space-y-4">
      {/* 상태 카드 */}
      <div className={`rounded-lg p-4 border-2 ${statusInfo.color}`}>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{statusInfo.icon}</span>
          <div>
            <h3 className="font-bold text-lg">{statusInfo.label}</h3>
            <p className="text-sm">{statusInfo.message}</p>
          </div>
        </div>
      </div>

      {/* 신청 정보 */}
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <h3 className="font-semibold mb-3">신청 정보</h3>

        <div className="space-y-3">
          <div>
            <label className="text-sm text-gray-600">소속 부서</label>
            <p className="font-medium">{permission.department}</p>
          </div>

          <div>
            <label className="text-sm text-gray-600">신청 ID</label>
            <p className="font-medium text-gray-500">#{permission.id}</p>
          </div>

          <div>
            <label className="text-sm text-gray-600">최종 수정일</label>
            <p className="font-medium text-gray-500">
              {new Date(permission.updatedDate).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
        </div>
      </div>

      {/* 제출한 서류 */}
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <h3 className="font-semibold mb-3">제출한 증빙 서류</h3>
        <div className="space-y-2">
          {permission.docsUrls.map((url, index) => (
            <a
              key={index}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">📎</span>
                <span className="text-sm text-gray-700">서류 {index + 1}</span>
              </div>
              <span className="text-sm text-blue-600">보기 →</span>
            </a>
          ))}
        </div>
      </div>

      {/* 버튼 */}
      <div className="flex gap-3">
        <Button variant="secondary" className="flex-1" onClick={goBack}>
          돌아가기
        </Button>

        {permission.state === 'PENDING' && (
          <>
            <Button variant="secondary" className="flex-1" onClick={handleEdit}>
              수정
            </Button>
            <Button
              variant="secondary"
              className="flex-1 text-red-600 border-red-300 hover:bg-red-50"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? '삭제 중...' : '삭제'}
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default SettingsFMPermissionStatusContent;
