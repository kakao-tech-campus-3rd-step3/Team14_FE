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
import { showToastErrorMessage, showToastAxiosError } from '@/utils/showToastMessage';
import { checkFestivalManagerExist } from '@/apis/festivalManager/checkFestivalManagerExist';

interface FestivalContentManagerSectionProps {
  festivalId: string;
  isManager: boolean;
}

/**
 * 축제 관리자로 나를 신청할 수 있는 섹션
 * 두단계의 검증을 거칩니다.
 * 1. 축제 관리자 권한 확인
 *  유저가 해당 권한을 가진 role인지 확인합니다.
 * 2. 축제 관리자 존재 확인
 *  해당 축제에 관리자가 이미 존재하는 지 확인합니다.
 *  이미 존재하는 경우 예외처리를 합니다.
 * 3. 축제 관리자 신청 확인
 *  해당 축제에 관리자 신청이 이미 존재하는 지 확인합니다.
 *  이미 존재하는 경우 예외처리를 합니다.
 *  신청이 없는 경우 신청 페이지로 이동합니다.
 * @returns 축제 관리자 섹션 컴포넌트
 */
const FestivalContentManagerSection = ({
  festivalId,
  isManager,
}: FestivalContentManagerSectionProps) => {
  const { isLoggedIn } = useAuth();
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
      showToastErrorMessage(SYSTEM_MESSAGES.REVIEW.LOGIN_REQUIRED);
      navigate(ROUTE_PATH.LOGIN);
      return;
    }

    // 이미 이 축제의 관리자인 경우
    if (isManager) {
      showToastErrorMessage(SYSTEM_MESSAGES.FESTIVAL_MANAGER_APPLY.ALREADY_MANAGER);
      return;
    }

    try {
      // 1차: 축제 관리자 권한 확인
      const roleResponse = await getUserRole();
      const isFestivalManager = roleResponse.data.content.isFestivalManagerOrAdmin;

      if (!isFestivalManager) {
        // 축제 관리자 권한이 없는 경우
        setModalContent({
          title: SYSTEM_MESSAGES.FESTIVAL_MANAGER_APPLY.NEED_FM_PERMISSION_TITLE,
          message: SYSTEM_MESSAGES.FESTIVAL_MANAGER_APPLY.NEED_FM_PERMISSION_MESSAGE,
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
      try {
        const checkResponse = await checkFestivalManagerExist(festivalId);
        const exists = checkResponse.data.content;
        // 관리자가 이미 존재하는 경우 예외처리
        if (exists) {
          showToastErrorMessage(SYSTEM_MESSAGES.FESTIVAL_MANAGER_APPLY.MANAGER_ALREADY_EXISTS);
          return;
        }
      } catch (error) {
        showToastAxiosError(error);
        return;
      }
      // 2차: 중복 신청 확인
      const checkResponse = await checkFestivalManagerApply(festivalId);
      const hasAlreadyApplied = checkResponse.data.content;

      if (hasAlreadyApplied) {
        // 이미 신청한 경우
        setModalContent({
          title: SYSTEM_MESSAGES.FESTIVAL_MANAGER_APPLY.HAS_APPLIED_TITLE,
          message: SYSTEM_MESSAGES.FESTIVAL_MANAGER_APPLY.HAS_APPLIED_MESSAGE,
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
      showToastAxiosError(error);
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
