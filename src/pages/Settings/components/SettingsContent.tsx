import Button from '@/components/common/Button';
import SettingsSection from './SettinsSection';
import { Link } from 'react-router-dom';
import { ROUTE_PATH } from '@/constants/routes';

const SettingsContent = () => {
  return (
    <>
      <SettingsSection title="축제">
        <div className="flex flex-col gap-2">
          <Link to="#">
            <Button variant="text">내가 등록한 축제</Button>
          </Link>
          <Link to="#">
            <Button variant="text">축제 매니저 되기</Button>
          </Link>
          <Link to="#">
            <Button variant="text">축제 관리자 되기</Button>
          </Link>
          <Link to={ROUTE_PATH.MY_REVIEWS}>
            <Button variant="text">내가 작성한 리뷰 보기</Button>
          </Link>
        </div>
      </SettingsSection>
      <SettingsSection title="계정">
        <div className="flex flex-col gap-2">
          <Link to="#">
            <Button variant="text">프로필 이미지 수정</Button>
          </Link>
          <Button variant="text">로그아웃</Button>
          <Button variant="text">회원탈퇴</Button>
        </div>
      </SettingsSection>
      <SettingsSection title="고객센터">
        <div className="flex flex-col gap-2">
          <Button variant="text">자주 묻는 질문</Button>
        </div>
      </SettingsSection>
    </>
  );
};

export default SettingsContent;
