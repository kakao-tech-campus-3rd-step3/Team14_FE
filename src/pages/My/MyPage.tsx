import Container from '@/components/common/Container';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { Suspense, useState } from 'react';
import MyPageWishListSection from '@/pages/My/components/MyPageWishListSection';
import MyPageReviewedSection from '@/pages/My/components/MyPageReviewedSection';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorComponent from '@/components/error/ErrorComponent';
import { showToastAxiosError } from '@/utils/showToastMessage';
import LoadingSpinner from '@/components/loading/LoadingSpinner';
import MyPageChatSection from '@/pages/My/components/MyPageChatSection';

/**
 * 마이페이지
 * 채팅 목록을 조회
 * 좋아요한 축제와 리뷰 목록 조회
 * @returns 마이페이지
 */
const MyPage = () => {
  const [selectedTab, setSelectedTab] = useState<'wishlist' | 'reviewed'>('wishlist');

  const chooseStyle = 'border-b-2 border-primary-300 font-bold text-primary-300';
  const notChooseStyle = 'border-b-2 border-transparent text-gray-500';
  return (
    <Container>
      <Header variant="mypage" />
      <div className="p-4">
        <ErrorBoundary
          FallbackComponent={() => (
            <ErrorComponent
              title="오류가 발생했습니다."
              message="잠시 후 다시 시도해주세요."
              showBackButton={true}
            />
          )}
          onError={(error) => {
            showToastAxiosError(error);
          }}
        >
          <Suspense
            fallback={
              <LoadingSpinner
                size="lg"
                message="채팅 목록을 불러오는 중..."
                className="h-[116px]"
              />
            }
          >
            <MyPageChatSection />
          </Suspense>
        </ErrorBoundary>
        <div className="mt-6">
          <div className="flex border-b border-gray-200 w-full mb-4">
            <button
              className={`px-4 py-2 text-gray-500 font-medium ${selectedTab === 'wishlist' ? chooseStyle : notChooseStyle} w-full`}
              onClick={() => setSelectedTab('wishlist')}
            >
              좋아요
            </button>
            <button
              className={`px-4 py-2 text-gray-500 font-medium ${selectedTab === 'reviewed' ? chooseStyle : notChooseStyle} w-full`}
              onClick={() => setSelectedTab('reviewed')}
            >
              리뷰
            </button>
          </div>
          <ErrorBoundary
            FallbackComponent={() => (
              <ErrorComponent
                title="오류가 발생했습니다."
                message="잠시 후 다시 시도해주세요."
                showBackButton={true}
              />
            )}
            onError={(error) => {
              showToastAxiosError(error);
            }}
          >
            <Suspense
              fallback={
                <LoadingSpinner
                  size="lg"
                  className="min-h-[400px]"
                  message="좋아요한 축제를 불러오는 중..."
                />
              }
            >
              {selectedTab === 'wishlist' ? <MyPageWishListSection /> : <MyPageReviewedSection />}
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
      <Footer initialSelected="my" />
    </Container>
  );
};

export default MyPage;
