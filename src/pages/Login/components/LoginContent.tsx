import Logo from '@/components/icon/LogoIcon';
import Button from '@/components/common/Button';

const LoginContent = () => {
  const handleGoogleLogin = () => {
    console.log('Google Login');
  };
  const handleKakaoLogin = () => {
    console.log('Kakao Login');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-12rem)] px-6">
      <div className="flex flex-col items-center space-y-12">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-3 mb-6">
            <Logo className="w-16 h-16" />
            <h1 className="text-7xl text-gray-900">FestaPICK</h1>
          </div>
          <p className="text-lg text-gray-700 text-center">소셜로그인으로 빠르게 시작하세요!</p>
        </div>

        <div className="w-full max-w-sm space-y-3">
          <Button
            variant="socialLogin"
            size="lg"
            fullWidth
            onClick={handleGoogleLogin}
            className="border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400"
          >
            <img src="/login/google.svg" alt="Google" className="w-5 h-5 mr-3" />
            구글 로그인
          </Button>

          <Button
            variant="socialLogin"
            size="lg"
            fullWidth
            onClick={handleKakaoLogin}
            className="border-yellow-400 bg-yellow-400 text-gray-900 hover:bg-yellow-500 hover:border-yellow-500"
          >
            <img src="/login/kakao.svg" alt="Kakao" className="w-5 h-5 mr-3" />
            카카오 로그인
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginContent;
