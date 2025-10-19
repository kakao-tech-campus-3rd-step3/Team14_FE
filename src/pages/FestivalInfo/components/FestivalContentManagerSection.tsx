import { useState } from 'react';
import Button from '@/components/common/Button';
import ConfirmModal from '@/components/modal/ConfirmModal';
import { getUserRole } from '@/apis/user/getUserRole';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '@/constants/routes';
import { generatePath } from 'react-router-dom';

interface FestivalContentManagerSectionProps {
  festivalId: string;
  managerId: number | null;
}

/**
 * 축제 관리자로 나를 신청할 수 있는 섹션
 * @returns 축제 관리자 섹션 컴포넌트
 */
const FestivalContentManagerSection = ({
  festivalId,
  managerId,
}: FestivalContentManagerSectionProps) => {
  const { userInfo, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: '',
    message: '',
    onConfirm: () => {},
  });

  const handleApplyClick = async () => {
    if (!isLoggedIn) {
      alert('로그인이 필요합니다.');
      navigate(ROUTE_PATH.LOGIN);
      return;
    }

    // 이미 이 축제의 관리자인 경우
    if (managerId === userInfo?.userId) {
      alert('이미 이 축제의 관리자입니다.');
      return;
    }

    try {
      const response = await getUserRole();
      const isFestivalManager = response.data.content.isFestivalManagerOrAdmin;

      if (!isFestivalManager) {
        // 축제 관리자 권한이 없는 경우
        setModalContent({
          title: '권한이 필요해요',
          message: '축제 관리자만 축제를 관리할 수 있습니다.\n축제 관리자 권한을 신청해주세요.',
          onConfirm: () => {
            setShowModal(false);
            navigate(ROUTE_PATH.FM_PERMISSION_APPLICATION);
          },
        });
        setShowModal(true);
      } else {
        // 축제별 관리자 신청 페이지로 이동
        navigate(generatePath(ROUTE_PATH.FESTIVAL_MANAGER_APPLY, { festivalId }));
      }
    } catch (error) {
      console.error('역할 확인 실패:', error);
      alert('권한 확인에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <>
      <div className="space-y-2">
        <h3 className="text-sm text-gray-900 font-bold">이 축제의 관리자라면?</h3>
        <div className="flex items-center justify-between mr-2">
          <p className="text-sm text-gray-900">축제 관리자가 되어 축제를 관리해보세요!</p>
          <Button variant="link" onClick={handleApplyClick}>
            축제 관리 신청하기
          </Button>
        </div>
      </div>

      <ConfirmModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={modalContent.onConfirm}
        title={modalContent.title}
        message={modalContent.message}
        confirmText={modalContent.title === '권한 필요' ? '신청하러 가기' : '신청하기'}
      />
    </>
  );
};

export default FestivalContentManagerSection;
