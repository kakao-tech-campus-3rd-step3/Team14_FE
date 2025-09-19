import { useEffect, useState } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import Container from '@/components/common/Container';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import Button from '@/components/common/Button';
import { useAuth } from '@/context/AuthContext';
import getUserInfo from '@/apis/user/getUserInfo';
import logout from '@/apis/auth/logout';
import type { UserInfoResponse } from '@/types/UserType';
import type { AxiosError } from 'axios';
import { ROUTE_PATH } from '@/constants/routes';

const LoginCheckPage = () => {
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
          setTimeout(() => navigate(generatePath(ROUTE_PATH.LOGIN)), 2000);
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
          setTimeout(() => navigate(generatePath(ROUTE_PATH.LOGIN)), 2000);
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
      await logout();
    } catch (error) {
      console.error('로그아웃 API 호출 실패:', error);
    }

    clearAuth();
    navigate(generatePath(ROUTE_PATH.LOGIN));
  };

  const handleGoHome = () => {
    navigate(generatePath(ROUTE_PATH.HOME));
  };

  if (isLoading) {
    return (
      <Container>
        <Header variant="page" title="로그인 확인" />
        <div className="flex items-center justify-center flex-1 px-6">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-300"></div>
        </div>
        <Footer />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Header variant="page" title="로그인 확인" />
        <div className="flex flex-col items-center justify-center flex-1 px-6">
          <div className="text-red-500 text-lg mb-4">{error}</div>
          <p className="text-gray-600">잠시 후 로그인 페이지로 이동합니다</p>
        </div>
        <Footer />
      </Container>
    );
  }

  return (
    <Container>
      <Header variant="page" title="로그인 성공!" />

      <div className="flex-1 px-6 py-8">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">로그인 성공!</h2>
            <p className="text-gray-600">환영합니다, {user?.username}님!</p>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
            <div className="bg-gradient-to-r from-primary-300 to-primary-400 px-6 py-6 text-white">
              <div className="flex items-center space-x-4">
                {user?.profileImageUrl ? (
                  <img
                    src={user.profileImageUrl}
                    alt="프로필"
                    className="w-12 h-12 rounded-full border-2 border-white"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                    <span className="text-lg font-bold">
                      {user?.username.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-bold">{user?.username}</h3>
                  <p className="text-primary-100 text-sm">{user?.email}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Button variant="primary" size="lg" fullWidth onClick={handleGoHome}>
              홈으로 이동
            </Button>

            <Button variant="secondary" size="lg" fullWidth onClick={handleLogout}>
              로그아웃
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </Container>
  );
};

export default LoginCheckPage;
