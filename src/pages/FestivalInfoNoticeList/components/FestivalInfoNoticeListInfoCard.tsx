import type { FestivalInfo } from '@/types/FestivalType';
import Button from '@/components/common/Button';

interface FestivalInfoNoticeListInfoCardProps {
  festivalData: FestivalInfo;
  title?: string;
  showCreateButton?: boolean;
  onCreateNotice?: () => void;
  onClick?: () => void;
}

const FestivalInfoNoticeListInfoCard = ({
  festivalData,
  title,
  showCreateButton = false,
  onCreateNotice,
  onClick,
}: FestivalInfoNoticeListInfoCardProps) => {
  return (
    <div className="mb-6 p-4 bg-gray-50 rounded-lg cursor-pointer" onClick={onClick}>
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-lg">{title || '공지사항을 작성할 축제'}</h3>
        {showCreateButton && onCreateNotice && (
          <Button
            variant="text"
            onClick={(e) => {
              e.stopPropagation();
              onCreateNotice();
            }}
            className="text-sm text-primary-300"
          >
            공지사항 작성
          </Button>
        )}
      </div>
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

export default FestivalInfoNoticeListInfoCard;
