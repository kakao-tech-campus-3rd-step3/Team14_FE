import Button from '@/components/common/Button';
import SettingsSection from '@/pages/Settings/components/SettingsSection';
import { ROUTE_PATH } from '@/constants/routes';
import useNav from '@/hooks/useNav';
import { useState } from 'react';
import { getMyFMPermission } from '@/apis/festivalManager/getMyFMPermission';

const SettingsContent = () => {
  const { goTo } = useNav();
  const [checkingPermission, setCheckingPermission] = useState(false);

  const handleFestivalManagerClick = async () => {
    if (checkingPermission) return;

    try {
      setCheckingPermission(true);
      // 축제에 대한 신청서 조회
      const response = await getMyFMPermission();

      if (response.status === 200) {
        alert('축제 관리자 신청이 된 상태입니다.');
      }
    } catch (error: any) {
      if (error.response?.status === 404) {
        // 404: 신청서 없음
        goTo(ROUTE_PATH.FM_PERMISSION_APPLICATION);
      } else if (error.response?.status === 409) {
        goTo(ROUTE_PATH.FM_PERMISSION_STATUS);
      } else {
        alert('오류가 발생했습니다. 다시 시도해주세요.');
      }
    } finally {
      setCheckingPermission(false);
    }
  };
  return (
    <>
      <SettingsSection title="등업하기">
        <div className="flex flex-col gap-2">
          {/* TODO: 내가 등록한 축제 버튼 추가 */}
          <Button variant="text" onClick={handleFestivalManagerClick} disabled={checkingPermission}>
            축제 관리자 되기
          </Button>
          {/* TODO: 축제 관리자 되기 버튼 추가 */}
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
          {/* TODO: 내가 작성한 리뷰 보기 버튼 추가 */}
          <Button
            variant="text"
            onClick={() => {
              goTo('#');
            }}
          >
            내가 축제 등록하기
          </Button>
          <Button
            variant="text"
            onClick={() => {
              goTo('#');
            }}
          >
            내가 등록한 축제
          </Button>
          <Button
            variant="text"
            onClick={() => {
              goTo('#');
            }}
          >
            내가 관리하는 축제
          </Button>
        </div>
      </SettingsSection>
      <SettingsSection title="계정">
        <div className="flex flex-col gap-2">
          {/* TODO: 내가 작성한 리뷰 보기 버튼 추가 */}
          <Button
            variant="text"
            onClick={() => {
              goTo(ROUTE_PATH.MY_REVIEWS);
            }}
          >
            내가 작성한 리뷰 보기
          </Button>
          {/* TODO: 프로필 이미지 수정 버튼 추가 */}
          <Button
            variant="text"
            onClick={() => {
              goTo('#');
            }}
          >
            프로필 이미지 수정
          </Button>
          {/* TODO: 로그아웃 버튼 추가 */}
          <Button
            variant="text"
            onClick={() => {
              goTo('#');
            }}
          >
            로그아웃
          </Button>
          {/* TODO: 회원탈퇴 버튼 추가 */}
          <Button
            variant="text"
            onClick={() => {
              goTo('#');
            }}
          >
            회원탈퇴
          </Button>
        </div>
      </SettingsSection>
      <SettingsSection title="고객센터">
        <div className="flex flex-col gap-2">
          {/* TODO: 자주 묻는 질문 버튼 추가 */}
          <Button
            variant="text"
            onClick={() => {
              goTo('#');
            }}
          >
            자주 묻는 질문
          </Button>
        </div>
      </SettingsSection>
    </>
  );
};

export default SettingsContent;
