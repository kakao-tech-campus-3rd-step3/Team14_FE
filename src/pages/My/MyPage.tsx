import { useState, useEffect } from 'react';
import Container from '@/components/common/Container';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { getUserInfo } from '@/apis/user/getUserInfo';
import type { UserInfoResponse } from '@/types/UserType';

/**
 * 마이페이지
 * 피어리뷰를 위해 우선적으로 UI위주로 구현하였습니다.
 * 사용자 정보를 불러오고 방문 예정과 방문 완료 버튼 기능은 이후 추가적으로 구현할 예정입니다.
 *
 * @returns 마이페이지
 */
const MyPage = () => {
  // TODO: userInfo를 사용한 UI 구현 예정
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_userInfo, setUserInfo] = useState<UserInfoResponse['content'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        setLoading(true);
        const response = await getUserInfo();
        setUserInfo(response.data.content);
        setError(null);
      } catch (err) {
        console.error('사용자 정보를 가져오는데 실패했습니다:', err);
        setError('사용자 정보를 불러올 수 없습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-300"></div>
        <p className="mt-4 text-lg text-gray-600">사용자 정보를 불러오는 중</p>
      </div>
    );
  }

  if (error) {
    return (
      <Container>
        <Header variant="mypage" />
        <div className="flex items-center justify-center h-64">
          <div className="text-red-500">{error}</div>
        </div>
        <Footer initialSelected="my" />
      </Container>
    );
  }

  return (
    <Container>
      <Header variant="mypage" />
      <div className="p-4">
        {/* 방문 예정과 방문 완료 버튼 기능은 이후 추가적으로 구현할 예정입니다. */}
        <div className="mt-6">
          <div className="flex border-b border-gray-200">
            <button className="px-4 py-2 text-orange-500 border-b-2 border-orange-500 font-medium">
              방문예정
            </button>
            <button className="px-4 py-2 text-gray-500 font-medium">방문완료</button>
          </div>

          <div className="mt-4 min-h-64 flex items-center justify-center">
            <div className="text-gray-400 text-center">
              <p>아직 방문 예정인 축제가 없습니다.</p>
              <p className="text-sm mt-1">축제를 찾아보고 방문 계획을 세워보세요!</p>
            </div>
          </div>
        </div>
      </div>
      <Footer initialSelected="my" />
    </Container>
  );
};

export default MyPage;
