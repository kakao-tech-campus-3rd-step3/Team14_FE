import Button from '@/components/common/Button';
import SettingsSection from '@/pages/Settings/components/SettingsSection';
import { ROUTE_PATH } from '@/constants/routes';
import useNav from '@/hooks/useNav';
import { useState } from 'react';
import { getMyFMPermission } from '@/apis/festivalManager/getMyFMPermission';
import getUserRole from '@/apis/user/getUserRole';
import ProfileImageUploadModal from '@/components/modal/ProfileImageUploadModal';
import logout from '@/apis/auth/logout';
import deleteUser from '@/apis/user/deleteUser';
import { useAuth } from '@/context/AuthContext';
import { isAxiosError } from 'axios';
import { SYSTEM_MESSAGES } from '@/constants/systemMessages';
/**
 * 설정 내용 컴포넌트
 * 다양한 기능들의 버튼과 실질적인 핸들러들 담당 부분입니다.
 * @returns 설정 내용 컴포넌트
 * 설정 내용을 표시합니다.
 */
const SettingsContent = () => {
  const { goTo } = useNav();
  const { clearAuth } = useAuth();
  const [checkingPermission, setCheckingPermission] = useState(false);
  const [checkingRole, setCheckingRole] = useState(false);
  const [isProfileImageModalOpen, setIsProfileImageModalOpen] = useState(false);

  const handleFestivalManagerClick = async () => {
    if (checkingPermission) return;

    try {
      setCheckingPermission(true);
      // 축제에 대한 신청서 조회
      const response = await getMyFMPermission();

      if (response.status === 200) {
        alert(SYSTEM_MESSAGES.FM_PERMISSION.ALREADY_APPLIED);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 404) {
          // 404: 신청서 없음
          goTo(ROUTE_PATH.FM_PERMISSION_APPLICATION);
        } else if (error.response?.status === 409) {
          goTo(ROUTE_PATH.FM_PERMISSION_STATUS);
        } else {
          alert(SYSTEM_MESSAGES.COMMON.GENERIC_ERROR);
        }
      } else {
        alert(SYSTEM_MESSAGES.COMMON.GENERIC_ERROR);
      }
    } finally {
      setCheckingPermission(false);
    }
  };

  // 축제 관리 권한 체크 및 페이지 이동 핸들러
  const handleFestivalManagementClick = async (targetPath: string) => {
    if (checkingRole) return;

    try {
      setCheckingRole(true);
      const response = await getUserRole();

      if (response.data.content.isFestivalManagerOrAdmin) {
        // 축제 매니저이거나 관리자인 경우 해당 페이지로 이동
        goTo(targetPath);
      } else {
        // 권한이 없는 경우 승급 신청 알림
        alert(SYSTEM_MESSAGES.FM_PERMISSION.NO_PERMISSION);
      }
    } catch (error) {
      console.error('권한 확인 중 오류 발생:', error);
      alert(SYSTEM_MESSAGES.COMMON.GENERIC_ERROR);
    } finally {
      setCheckingRole(false);
    }
  };

  // 로그아웃 핸들러
  const handleLogout = async () => {
    if (!confirm(SYSTEM_MESSAGES.LOGOUT.CONFIRM)) return;

    try {
      // 로그아웃 API 호출 (서버에서 리프레시 토큰 쿠키 삭제)
      await logout();

      // 로컬 인증 정보 삭제 (액세스 토큰, 사용자 정보)
      clearAuth();

      // 로그인 페이지로 이동
      goTo(ROUTE_PATH.LOGIN);
    } catch (error) {
      console.error('로그아웃 실패:', error);
      alert(SYSTEM_MESSAGES.LOGOUT.ERROR);
    }
  };

  // 회원탈퇴 핸들러
  const handleDeleteAccount = async () => {
    // 1차 확인
    if (!confirm(SYSTEM_MESSAGES.DELETE_ACCOUNT.CONFIRM_PRIMARY)) {
      return;
    }

    // 2차 확인 (더 강력한 경고)
    if (!confirm(SYSTEM_MESSAGES.DELETE_ACCOUNT.CONFIRM_SECONDARY)) {
      return;
    }

    try {
      // 회원탈퇴 API 호출
      await deleteUser();

      // 로컬 인증 정보 삭제
      clearAuth();

      // 완료 메시지 및 홈으로 이동
      alert(SYSTEM_MESSAGES.DELETE_ACCOUNT.SUCCESS);
      goTo(ROUTE_PATH.HOME);
    } catch (error) {
      console.error('회원탈퇴 실패:', error);
      alert(SYSTEM_MESSAGES.DELETE_ACCOUNT.ERROR);
    }
  };

  return (
    <>
      <SettingsSection title="등업하기">
        <div className="flex flex-col gap-2">
          <Button variant="text" onClick={handleFestivalManagerClick} disabled={checkingPermission}>
            축제 관리자 되기
          </Button>

          <Button
            variant="text"
            onClick={() => {
              goTo(ROUTE_PATH.FM_PERMISSION_STATUS);
            }}
          >
            신청서 조회하기
          </Button>
        </div>
      </SettingsSection>
      <SettingsSection title="축제 관리하기 ">
        <div className="flex flex-col gap-2">
          <Button
            variant="text"
            onClick={() => handleFestivalManagementClick(ROUTE_PATH.FESTIVAL_REGISTER)}
          >
            내가 축제 등록하기
          </Button>
          <Button
            variant="text"
            onClick={() => handleFestivalManagementClick(ROUTE_PATH.FESTIVAL_MY_REGISTERED)}
          >
            내가 등록한 축제
          </Button>
          <Button
            variant="text"
            onClick={() => handleFestivalManagementClick(ROUTE_PATH.FESTIVAL_MY_MANAGE)}
          >
            내가 관리하는 축제
          </Button>
        </div>
      </SettingsSection>
      <SettingsSection title="계정">
        <div className="flex flex-col gap-2">
          <Button
            variant="text"
            onClick={() => {
              goTo(ROUTE_PATH.MY_REVIEWS);
            }}
          >
            내가 작성한 리뷰 보기
          </Button>
          <Button variant="text" onClick={() => setIsProfileImageModalOpen(true)}>
            프로필 이미지 수정
          </Button>
          <Button variant="text" onClick={handleLogout}>
            로그아웃
          </Button>
          <Button variant="text" onClick={handleDeleteAccount} className="text-red-500">
            회원탈퇴
          </Button>
        </div>
      </SettingsSection>
      <SettingsSection title="고객센터">
        <div className="flex flex-col gap-2">
          <Button
            variant="text"
            onClick={() => {
              goTo(ROUTE_PATH.FAQ);
            }}
          >
            자주 묻는 질문
          </Button>
        </div>
      </SettingsSection>
      <ProfileImageUploadModal
        isOpen={isProfileImageModalOpen}
        onClose={() => setIsProfileImageModalOpen(false)}
      />
    </>
  );
};

export default SettingsContent;
