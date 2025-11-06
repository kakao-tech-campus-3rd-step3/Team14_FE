import type { Notice } from '@/types/Notice';

interface FestivalContentNoticeSectionCardProps {
  notice: Notice;
  onClick?: (noticeId: number) => void;
}

const FestivalContentNoticeSectionCard = ({
  notice,
  onClick,
}: FestivalContentNoticeSectionCardProps) => {
  return (
    <button
      onClick={() => onClick?.(notice.id)}
      className="w-full h-full p-3 border border-gray-200 rounded-lg flex items-center bg-white shadow-sm hover:bg-gray-50 hover:border-primary-300 transition-all duration-200 cursor-pointer"
    >
      <p className="font-medium text-gray-900 text-lg line-clamp-2 w-full text-center">
        {notice.title}
      </p>
    </button>
  );
};

export default FestivalContentNoticeSectionCard;
