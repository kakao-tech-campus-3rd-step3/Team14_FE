import Container from '@/components/common/Container';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { useState } from 'react';

/**
 * 마이페이지
 * 피어리뷰를 위해 우선적으로 UI위주로 구현하였습니다.
 * 사용자 정보를 불러오고 방문 예정과 방문 완료 버튼 기능은 이후 추가적으로 구현할 예정입니다.
 *
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
        <div className="mt-6">
          <div className="flex border-b border-gray-200 w-full">
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
