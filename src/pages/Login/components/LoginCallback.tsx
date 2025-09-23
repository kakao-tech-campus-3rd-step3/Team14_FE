import { useEffect, useState } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import jwtExchange from '@/apis/auth/jwtExchange';
import type { AxiosError } from 'axios';
import { ROUTE_PATH } from '@/constants/routes';

const LoginCallback = () => {
  const navigate = useNavigate();
  const { setAccessToken } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleLoginCallback = async () => {
      try {
        console.log('현재 URL:', window.location.href);

        // URL에서 에러 파라미터 확인
        const urlParams = new URLSearchParams(window.location.search);
        const errorParam = urlParams.get('error');

        if (errorParam) {
          console.error('소셜 로그인 실패:', errorParam);
          setError('소셜 로그인에 실패했습니다. 다시 시도해주세요.');
          setTimeout(() => navigate('/login', { replace: true }), 2000);
          return;
        }

        console.log('소셜 로그인 성공! JWT 토큰 교환 시도합니다');

        // withCredentials: true로 refreshToken 쿠키 포함하여 JWT 교환
        const response = await jwtExchange();
        console.log('JWT 교환 성공');

        // Authorization 헤더에서 accessToken 추출
        const authHeader = response.headers?.authorization || response.headers?.Authorization;

        if (authHeader && authHeader.startsWith('Bearer ')) {
          const accessToken = authHeader.substring(7);

          // 메모리(Context)에 accessToken 저장
          setAccessToken(accessToken);
          console.log('accessToken 메모리 저장 완료');

          // 로그인 확인 페이지로 리다이렉트
          console.log('로그인 확인 페이지로 리다이렉트');
          navigate(generatePath(ROUTE_PATH.LOGIN_CHECK));
        } else {
          throw new Error('Authorization 헤더에서 accessToken을 찾을 수 없습니다.');
        }
      } catch (err) {
        console.error('JWT 교환 실패:', err);

        const axiosError = err as AxiosError;
        if (axiosError.response?.status === 401) {
          setError('인증이 만료되었습니다. 다시 로그인해주세요.');
        } else {
          setError('로그인 처리 중 오류가 발생했습니다.');
        }

        setTimeout(() => navigate('/login', { replace: true }), 2000);
      } finally {
        setIsLoading(false);
      }
    };

    handleLoginCallback();
  }, [navigate, setAccessToken]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-300"></div>
        <p className="mt-4 text-lg text-gray-600">로그인 처리 중</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-red-500 text-lg mb-4">{error}</div>
        <p className="text-gray-600">에러가 발생했습니다. 로그인 페이지로 다시 이동됩니다.</p>
      </div>
    );
  }

  return null;
};

export default LoginCallback;
