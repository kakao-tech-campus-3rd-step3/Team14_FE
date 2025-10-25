import type { FestivalInfo } from '@/types/FestivalType';

interface FestivalInfoNoticeInfoCardProps {
  festivalData: FestivalInfo;
}

const FestivalInfoNoticeInfoCard = ({ festivalData }: FestivalInfoNoticeInfoCardProps) => {
  return (
    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
      <h3 className="font-semibold text-lg mb-2">공지사항을 작성할 축제</h3>
      <div className="flex gap-3">
        {festivalData?.posterInfo && (
          <img
            src={festivalData.posterInfo}
            alt={festivalData.title}
            className="w-20 h-20 object-cover rounded"
          />
        )}
        <div className="flex-1">
          <p className="font-medium text-gray-900">{festivalData?.title}</p>
          <p className="text-sm text-gray-600 mt-1">{festivalData?.addr1}</p>
          <p className="text-sm text-gray-500 mt-1">
            {festivalData?.startDate} ~ {festivalData?.endDate}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FestivalInfoNoticeInfoCard;
