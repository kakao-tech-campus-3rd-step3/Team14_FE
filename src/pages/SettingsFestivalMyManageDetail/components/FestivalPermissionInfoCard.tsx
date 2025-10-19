import type { FestivalPermissionDetail } from '@/apis/festivalManager/getMyFestivalPermissionDetail';

interface FestivalPermissionInfoCardProps {
  permission: FestivalPermissionDetail;
}

const FestivalPermissionInfoCard = ({ permission }: FestivalPermissionInfoCardProps) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <h3 className="font-semibold mb-3">축제 정보</h3>

      <div className="space-y-3">
        {/* 포스터 이미지 */}
        <div>
          <img
            src={permission.posterImg}
            alt={permission.title}
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>

        {/* 축제 제목 */}
        <div>
          <label className="text-sm text-gray-600">축제명</label>
          <p className="font-medium text-lg">{permission.title}</p>
        </div>

        {/* 신청 ID */}
        <div>
          <label className="text-sm text-gray-600">신청 ID</label>
          <p className="font-medium text-gray-500">#{permission.id}</p>
        </div>

        {/* 신청일 */}
        <div>
          <label className="text-sm text-gray-600">신청일</label>
          <p className="font-medium text-gray-500">
            {new Date(permission.appliedDate).toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FestivalPermissionInfoCard;
