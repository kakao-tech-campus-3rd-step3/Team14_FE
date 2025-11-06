import { useState } from 'react';
import Button from '@/components/common/Button';
import useNav from '@/hooks/useNav';
import { generatePath } from 'react-router-dom';
import { ROUTE_PATH } from '@/constants/routes';
import { useDeleteWithConfirm } from '@/hooks/useDeleteWithConfirm';
import { deleteFestival } from '@/apis/festivals/deleteFestival';
import ConfirmModal from '@/components/modal/ConfirmModal';
import { SYSTEM_MESSAGES } from '@/constants/systemMessages';
import { queryClient } from '@/utils/queryClient';

interface FestivalContentOverviewSectionProps {
  festivalId: string;
  overview: string;
  isManager: boolean;
}
const FestivalContentOverviewSection = ({
  festivalId,
  overview,
  isManager,
}: FestivalContentOverviewSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  // 5-6줄 정도의 길이를 대략적으로 계산 (한 줄당 약 50자로 가정)
  const maxLength = 250;
  const shouldShowButton = overview.length > maxLength;

  const displayText =
    isExpanded || !shouldShowButton ? overview : overview.slice(0, maxLength) + '...';
  const { goTo } = useNav();
  const handleEditClick = () => {
    goTo(generatePath(ROUTE_PATH.FESTIVAL_EDIT, { festivalId: festivalId || '' }));
  };
  const handleDeleteClick = () => {
    handleDelete(Number(festivalId));
  };
  const { isConfirmOpen, handleDelete, handleConfirmDelete, setIsConfirmOpen } =
    useDeleteWithConfirm(
      async (id: number) => {
        await deleteFestival(id.toString());
        queryClient.invalidateQueries({ queryKey: ['festivals'] });
        queryClient.invalidateQueries({ queryKey: ['search'] });

        goTo(ROUTE_PATH.HOME);
      },
      ['festival', festivalId],
      SYSTEM_MESSAGES.FESTIVAL_DELETE.SUCCESS,
      SYSTEM_MESSAGES.FESTIVAL_DELETE.ERROR,
    );

  return (
    <div className="w-full h-full flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h3 className="text-sm text-gray-900 font-bold">상세정보</h3>
        {isManager && (
          <div className="flex items-center gap-2">
            <Button variant="text" className="!text-blue-500" size="sm" onClick={handleEditClick}>
              축제 정보 수정
            </Button>
            <Button variant="text" className="text-red-500" size="sm" onClick={handleDeleteClick}>
              축제 정보 삭제
            </Button>
          </div>
        )}
      </div>
      <p className="text-sm text-gray-900 leading-relaxed whitespace-pre-wrap break-words">
        {displayText}
      </p>
      {shouldShowButton && (
        <div className="flex justify-center">
          <Button variant="tertiary" size="sm" fullWidth onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? '접기' : '더보기'}
          </Button>
        </div>
      )}
      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        title="축제 정보 삭제"
        message="정말로 이 축제 정보를 삭제하시겠습니까?
        삭제 후에는 복구가 불가능합니다."
        confirmText="삭제"
        cancelText="취소"
      />
    </div>
  );
};

export default FestivalContentOverviewSection;
