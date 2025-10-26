import PickIcon from '@/components/common/PickIcon';
import { PICK_ICONS } from '@/constants/pickIcons';
import FormSubmitButtons from '@/components/common/FormSubmitButtons';
import type { Notice } from '@/types/Notice';

interface FestivalInfoNoticeCardProps {
  notice: Notice;
  noticeRefs: React.RefObject<{ [key: number]: HTMLDivElement | null }>;
  focusNoticeId: number;
  isCurrentUserManager: boolean;
  handleEditNotice: (noticeId: number) => void;
  handleDeleteNotice: (noticeId: number) => void;
  isDeleting: boolean;
}

export const FestivalInfoNoticeCard = ({
  notice,
  noticeRefs,
  focusNoticeId,
  isCurrentUserManager,
  handleEditNotice,
  handleDeleteNotice,
  isDeleting,
}: FestivalInfoNoticeCardProps) => {
  if (!notice) return null;
  return (
    <div
      key={notice.id}
      ref={(el) => {
        noticeRefs.current[notice.id] = el;
      }}
      className={`p-4 border border-gray-200 rounded-lg bg-white shadow-sm transition-all duration-300 ${
        focusNoticeId === notice.id ? 'ring-2 ring-primary-300 ring-opacity-50' : ''
      }`}
    >
      <div className="flex justify-between items-start mb-2">
        <PickIcon name={PICK_ICONS.NOTICE} size={20} className="mt-1 mr-2" />
        <h3 className="font-semibold text-lg text-gray-900 flex-1">{notice.title}</h3>
        <span className="text-sm text-gray-500 ml-2">
          {new Date(notice.updatedDate).toLocaleDateString()}
        </span>
      </div>
      <p className="text-gray-700 mb-3">{notice.content}</p>
      {notice.images && notice.images.length > 0 && (
        <div className="mt-3 flex gap-2 flex-wrap">
          {notice.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`공지사항 이미지 ${index + 1}`}
              className="w-20 h-20 object-cover rounded border border-gray-200 hover:scale-105 transition-transform duration-200"
            />
          ))}
        </div>
      )}

      {isCurrentUserManager && (
        <div className="mt-4 pt-3 border-t border-gray-100">
          <FormSubmitButtons
            onCancel={() => handleEditNotice(notice.id)}
            onSubmit={() => handleDeleteNotice(notice.id)}
            isEdit={false}
            isDisabled={isDeleting}
            isLoading={isDeleting}
            submitLabel="삭제"
            cancelLabel="수정"
            submitType="button"
          />
        </div>
      )}
    </div>
  );
};
