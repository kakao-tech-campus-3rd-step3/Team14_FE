import { useState, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import Button from '@/components/common/Button';
import { patchProfileImage } from '@/apis/user/patchProfileImage';
import { uploadImageFiles } from '@/utils/s3Upload';
import MAX_MEDIA_SIZE from '@/constants/maxMediaSize';
import { useAuth } from '@/context/AuthContext';
import { getUserInfo } from '@/apis/user/getUserInfo';
import { SYSTEM_MESSAGES } from '@/constants/systemMessages';
import PickIcon from '@/components/common/PickIcon';
import { PICK_ICONS } from '@/constants/pickIcons';

interface ProfileImageUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileImageUploadModal = ({ isOpen, onClose }: ProfileImageUploadModalProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { setUserInfo } = useAuth();

  // 프로필 이미지 업데이트 mutation
  const { mutate: updateProfileImage, isPending } = useMutation({
    mutationFn: patchProfileImage,
    onSuccess: async () => {
      setIsUploading(false);
      setIsSuccess(true);

      // 최신 사용자 정보를 다시 가져와서 AuthContext 업데이트
      try {
        const userInfoResponse = await getUserInfo();
        setUserInfo(userInfoResponse.data.content);
      } catch (error) {
        console.error('사용자 정보 갱신 실패:', error);
      }
    },
    onError: (error: unknown) => {
      console.error('프로필 이미지 업데이트 실패:', error);
      alert(SYSTEM_MESSAGES.PROFILE_IMAGE.UPDATE_ERROR);
      setIsUploading(false);
    },
  });

  // 이미지 선택 핸들러
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 파일 크기 체크
    if (file.size > MAX_MEDIA_SIZE.IMAGE) {
      alert(SYSTEM_MESSAGES.PROFILE_IMAGE.FILE_SIZE_EXCEED(MAX_MEDIA_SIZE.IMAGE));
      return;
    }

    // 이미지 타입 체크
    if (!file.type.startsWith('image/')) {
      alert(SYSTEM_MESSAGES.PROFILE_IMAGE.INVALID_FILE_TYPE);
      return;
    }

    // 미리보기 생성
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);
    setSelectedFile(file);
  };

  // 이미지 삭제 (미리보기 제거)
  const handleRemoveImage = () => {
    setPreviewUrl(null);
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // 업로드 버튼 클릭
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // 확인 버튼 클릭
  const handleConfirm = async () => {
    if (!selectedFile) {
      alert(SYSTEM_MESSAGES.PROFILE_IMAGE.NO_IMAGE_SELECTED);
      return;
    }

    // 이미 업로드 중이면 중복 실행 방지
    if (isUploading || isPending) return;

    try {
      setIsUploading(true);

      // S3에 업로드
      const uploaded = await uploadImageFiles([selectedFile]);

      if (uploaded.length > 0) {
        const { id, presignedUrl } = uploaded[0];
        // 프로필 이미지 업데이트 API 호출
        updateProfileImage({ id, presignedUrl });
      } else {
        // 업로드 결과가 비어있는 경우
        alert(SYSTEM_MESSAGES.PROFILE_IMAGE.UPLOAD_ERROR);
        setIsUploading(false);
      }
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
      alert(SYSTEM_MESSAGES.PROFILE_IMAGE.UPLOAD_ERROR);
      setIsUploading(false);
    }
  };

  // 다시 수정 버튼 클릭
  const handleRetry = () => {
    setIsSuccess(false);
    handleRemoveImage();
  };

  // 모달 닫기
  const handleClose = () => {
    if (isUploading || isPending) return;
    setIsSuccess(false);
    handleRemoveImage();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[1001] flex items-center justify-center bg-black/40"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 제목 */}
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          {isSuccess ? SYSTEM_MESSAGES.PROFILE_IMAGE.UPDATE_SUCCESS_TITLE : '프로필 이미지 변경'}
        </h3>

        {/* 성공 메시지가 아닐 때만 업로드 UI 표시 */}
        {!isSuccess && (
          <>
            {/* 업로드 버튼 */}
            <div className="mb-6">
              <Button
                variant="secondary"
                className="w-full"
                onClick={handleUploadClick}
                disabled={isUploading || isPending}
              >
                <PickIcon name={PICK_ICONS.CAMERA} size={20} className="mr-2" />
                이미지 업로드
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
              />
            </div>

            {/* 미리보기 영역 */}
            {previewUrl && (
              <div className="mb-6 flex flex-col items-center">
                <p className="text-sm text-gray-600 mb-3">미리보기</p>
                <div className="relative">
                  {/* 원형 이미지 미리보기 */}
                  <img
                    src={previewUrl}
                    alt="미리보기"
                    className="w-32 h-32 rounded-full object-cover border-2 border-gray-200"
                  />
                  {/* 빨간 X 버튼 */}
                  <button
                    onClick={handleRemoveImage}
                    disabled={isUploading || isPending}
                    className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transition-colors disabled:opacity-50"
                  >
                    ✕
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {/* 성공 시 안내 메시지 */}
        {isSuccess && (
          <div className="mb-6 py-8 text-center">
            <p className="text-gray-600">{SYSTEM_MESSAGES.PROFILE_IMAGE.UPDATE_SUCCESS_MESSAGE}</p>
          </div>
        )}

        {/* 버튼 - 성공 여부에 따라 다르게 표시 */}
        <div className="flex gap-2">
          {isSuccess ? (
            <>
              <Button variant="secondary" className="flex-1" onClick={handleRetry}>
                다시 수정
              </Button>
              <Button variant="primary" className="flex-1" onClick={handleClose}>
                확인
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="secondary"
                className="flex-1"
                onClick={handleClose}
                disabled={isUploading || isPending}
              >
                취소
              </Button>
              <Button
                variant="primary"
                className="flex-1"
                onClick={handleConfirm}
                disabled={!selectedFile || isUploading || isPending}
              >
                {isUploading || isPending ? '업로드 중...' : '확인'}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileImageUploadModal;
