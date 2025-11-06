import ImageModal, { type MediaItem } from '@/components/modal/ImageModal';
import { useState } from 'react';

const ChatMessageItemImage = ({ imageUrl }: { imageUrl: string }) => {
  const mediaItems: MediaItem[] = [{ type: 'image', url: imageUrl }];
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  return (
    <div className="inline-block max-w-[80vw] rounded-lg bg-gray-100 px-3 py-2 text-sm text-gray-900 whitespace-pre-wrap break-words">
      <img
        src={imageUrl}
        className="size-20 object-cover cursor-pointer"
        onClick={() => setIsImageModalOpen(true)}
      />
      {isImageModalOpen && (
        <ImageModal
          mediaItems={mediaItems}
          selectedMediaIndex={0}
          onClose={() => setIsImageModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ChatMessageItemImage;
