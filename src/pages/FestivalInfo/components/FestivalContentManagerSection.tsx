import { useState } from 'react';
import Button from '@/components/common/Button';
import ConfirmModal from '@/components/modal/ConfirmModal';
import { getUserRole } from '@/apis/user/getUserRole';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '@/constants/routes';
import { generatePath } from 'react-router-dom';
import { SYSTEM_MESSAGES } from '@/constants/systemMessages';
import { checkFestivalManagerApply } from '@/apis/festivalManager/checkFestivalManagerApply';

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
    confirmText: '확인',
    cancelText: '취소',
    onConfirm: () => {},
  });

  const handleApplyClick = async () => {
    if (!isLoggedIn) {
      alert(SYSTEM_MESSAGES.REVIEW.LOGIN_REQUIRED);
      navigate(ROUTE_PATH.LOGIN);
      return;
    }

    // 이미 이 축제의 관리자인 경우
    if (managerId === userInfo?.userId) {
      alert(SYSTEM_MESSAGES.FESTIVAL_MANAGER_APPLY.ALREADY_MANAGER);
      return;
    }

    try {
      // 1차: 축제 관리자 권한 확인
      const roleResponse = await getUserRole();
      const isFestivalManager = roleResponse.data.content.isFestivalManagerOrAdmin;

      if (!isFestivalManager) {
        // 축제 관리자 권한이 없는 경우
        setModalContent({
          title: '권한이 필요해요',
          message: '축제 관리자만 축제를 관리할 수 있습니다.\n축제 관리자 권한을 신청해주세요.',
          confirmText: '신청하러 가기',
          cancelText: '취소',
          onConfirm: () => {
            setShowModal(false);
            navigate(ROUTE_PATH.FM_PERMISSION_APPLICATION);
          },
        });
        setShowModal(true);
        return;
      }

      // 2차: 중복 신청 확인
      const checkResponse = await checkFestivalManagerApply(festivalId);
      const hasAlreadyApplied = checkResponse.data.content;

      if (hasAlreadyApplied) {
        // 이미 신청한 경우
        setModalContent({
          title: '신청 내역이 있습니다',
          message: '이미 이 축제에 관리자 신청을 하셨습니다.\n승인을 기다려주세요.',
          confirmText: '신청내역보러가기',
          cancelText: '취소',
          onConfirm: () => {
            setShowModal(false);
            navigate(ROUTE_PATH.FESTIVAL_MY_MANAGE);
          },
        });
        setShowModal(true);
      } else {
        // 신청 안한 경우 - 신청 페이지로 이동
        navigate(generatePath(ROUTE_PATH.FESTIVAL_MANAGER_APPLY, { festivalId }));
      }
    } catch (error) {
      console.error('권한/중복 확인 실패:', error);
      alert(SYSTEM_MESSAGES.FESTIVAL_MANAGER_APPLY.CHECK_ERROR);
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
        confirmText={modalContent.confirmText}
        cancelText={modalContent.cancelText}
      />
    </>
  );
};

export default FestivalContentManagerSection;
