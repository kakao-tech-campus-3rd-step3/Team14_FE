import Button from '@/components/common/Button';
import SettingsSection from './SettingsSection';
import { ROUTE_PATH } from '@/constants/routes';
import useNav from '@/hooks/useNav';

const SettingsContent = () => {
  const { goTo } = useNav();
  return (
    <>
      <SettingsSection title="축제">
        <div className="flex flex-col gap-2">
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
            축제 관리자 되기
          </Button>
          <Button
            variant="text"
            onClick={() => {
              goTo(ROUTE_PATH.MY_REVIEWS);
            }}
          >
            내가 작성한 리뷰 보기
          </Button>
        </div>
      </SettingsSection>
      <SettingsSection title="계정">
        <div className="flex flex-col gap-2">
          <Button
            variant="text"
            onClick={() => {
              goTo('#');
            }}
          >
            프로필 이미지 수정
          </Button>
          <Button
            variant="text"
            onClick={() => {
              goTo('#');
            }}
          >
            로그아웃
          </Button>
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
