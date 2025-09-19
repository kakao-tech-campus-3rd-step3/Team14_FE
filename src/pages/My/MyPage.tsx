import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '@/components/common/Container';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { useAuth } from '@/context/AuthContext';
import getUserInfo from '@/apis/user/getUserInfo';
import logout from '@/apis/auth/logout';
import type { UserInfoResponse } from '@/types/UserType';
import type { AxiosError } from 'axios';
import Button from '@/components/common/Button';

const MyPage = () => {
  const navigate = useNavigate();
  const { isLoggedIn, clearAuth } = useAuth();
  const [user, setUser] = useState<UserInfoResponse['content'] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        if (!isLoggedIn) {
          setError('로그인이 필요합니다.');
          setTimeout(() => navigate('/login'), 2000);
          return;
        }

        const response = await getUserInfo();
        setUser(response.data.content);
      } catch (err) {
        console.error('사용자 정보 조회 실패:', err);
        const axiosError = err as AxiosError;

        if (axiosError.response?.status === 401) {
          setError('로그인이 만료되었습니다. 다시 로그인해주세요.');
          clearAuth();
          setTimeout(() => navigate('/login'), 2000);
        } else {
          setError('사용자 정보를 불러오는데 실패했습니다.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserInfo();
  }, [navigate, isLoggedIn, clearAuth]);

  const handleLogout = async () => {
    try {
      // 백엔드 로그아웃 API 호출
      console.log('백엔드 로그아웃 API 호출 시도...');
      await logout();
      console.log('백엔드 로그아웃 API 호출 성공');
    } catch (error) {
      console.error('로그아웃 API 호출 실패:', error);
      // API 실패해도 프론트엔드 정리는 진행
    }

    // 프론트엔드 메모리 정리
    clearAuth();
    console.log('로그아웃 처리 완료');

    // 로그인 페이지로 이동
    navigate('/login');
  };

  if (isLoading) {
    return (
      <Container>
        <Header variant="page" title="마이페이지" />
        <div className="flex items-center justify-center flex-1 px-6">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-300"></div>
        </div>
        <Footer initialSelected="my" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Header variant="page" title="마이페이지" />
        <div className="flex flex-col items-center justify-center flex-1 px-6">
          <div className="text-red-500 text-lg mb-4">{error}</div>
          <p className="text-gray-600">잠시 후 로그인 페이지로 이동합니다</p>
        </div>
        <Footer initialSelected="my" />
      </Container>
    );
  }

  return (
    <Container>
      <Header variant="page" title="마이페이지" />

      <div className="flex-1 px-6 py-8">
        {user && (
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-primary-300 to-primary-400 px-6 py-8 text-white">
              <div className="flex items-center space-x-4">
                {user.profileImageUrl ? (
                  <img
                    src={user.profileImageUrl}
                    alt="프로필"
                    className="w-16 h-16 rounded-full border-2 border-white"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                    <span className="text-2xl font-bold">
                      {user.username.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <div>
                  <h2 className="text-xl font-bold">{user.username}</h2>
                  <p className="text-primary-100">{user.email}</p>
                </div>
              </div>
            </div>

            <div className="px-6 py-6 space-y-4">
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">계정 정보</h3>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">이메일</span>
                    <span className="text-gray-900 font-medium">{user.email}</span>
                  </div>
                </div>
              </div>

              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={handleLogout}
                className="w-full"
              >
                로그아웃
              </Button>
            </div>
          </div>
        )}
      </div>

      <Footer initialSelected="my" />
    </Container>
  );
};

export default MyPage;
