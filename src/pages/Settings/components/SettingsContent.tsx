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
        alert('축제 관리자 신청이 된 상태입니다.');
      }
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 404) {
          // 404: 신청서 없음
          goTo(ROUTE_PATH.FM_PERMISSION_APPLICATION);
        } else if (error.response?.status === 409) {
          goTo(ROUTE_PATH.FM_PERMISSION_STATUS);
        } else {
          alert('오류가 발생했습니다. 다시 시도해주세요.');
        }
      } else {
        alert('오류가 발생했습니다. 다시 시도해주세요.');
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
        alert('축제 관리자 권한이 없습니다. 승급 신청을 해주세요.');
      }
    } catch (error) {
      console.error('권한 확인 중 오류 발생:', error);
      alert('권한 확인 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setCheckingRole(false);
    }
  };

  // 로그아웃 핸들러
  const handleLogout = async () => {
    if (!confirm('로그아웃 하시겠습니까?')) return;

    try {
      // 로그아웃 API 호출 (서버에서 리프레시 토큰 쿠키 삭제)
      await logout();

      // 로컬 인증 정보 삭제 (액세스 토큰, 사용자 정보)
      clearAuth();

      // 로그인 페이지로 이동
      goTo(ROUTE_PATH.LOGIN);
    } catch (error) {
      console.error('로그아웃 실패:', error);
      alert('로그아웃에 실패했습니다. 다시 시도해주세요.');
    }
  };

  // 회원탈퇴 핸들러
  const handleDeleteAccount = async () => {
    // 1차 확인
    if (
      !confirm(
        '정말로 회원탈퇴를 하시겠습니까?\n탈퇴 시 모든 데이터가 삭제되며 복구할 수 없습니다.',
      )
    ) {
      return;
    }

    // 2차 확인 (더 강력한 경고)
    if (
      !confirm(
        '최종 확인\n\n회원탈퇴를 진행하면:\n• 작성한 모든 리뷰가 삭제됩니다\n• 등록한 축제 정보가 삭제됩니다\n• 신청한 내역이 모두 삭제됩니다\n\n정말로 탈퇴하시겠습니까?',
      )
    ) {
      return;
    }

    try {
      // 회원탈퇴 API 호출
      await deleteUser();

      // 로컬 인증 정보 삭제
      clearAuth();

      // 완료 메시지 및 홈으로 이동
      alert('회원탈퇴가 완료되었습니다. 그동안 이용해주셔서 감사합니다.');
      goTo(ROUTE_PATH.HOME);
    } catch (error) {
      console.error('회원탈퇴 실패:', error);
      alert('회원탈퇴에 실패했습니다. 다시 시도해주세요.');
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
