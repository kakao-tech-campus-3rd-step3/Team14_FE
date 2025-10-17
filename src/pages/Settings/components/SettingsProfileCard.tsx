import type { UserInfoResponse } from '@/types/UserType';
const SettingsProfileCard = ({ userInfo }: { userInfo: UserInfoResponse['content'] }) => {
  return (

    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center space-x-4">
        {userInfo?.profileImageUrl ? (
          <img
            src={userInfo.profileImageUrl}
            alt="프로필"
            className="w-16 h-16 rounded-full object-cover"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500 text-xl">👤</span>
          </div>
        )}
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            {userInfo?.username}님 안녕하세요!
          </h2>
          <p className="text-sm text-gray-500">{userInfo?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default SettingsProfileCard;