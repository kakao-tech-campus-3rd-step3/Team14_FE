import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { showToastSuccessMessage, showToastErrorMessage } from '@/utils/showToastMessage';
/**
 * 삭제 확인 훅
 * 삭제와 관련된 부분들에서 사용할 수 있도록 핸들러를 구현하였습니다.
 * @param deleteFn - 삭제 함수
 * @param queryKey - 쿼리 키
 * @param successMessage - 성공 메시지
 * @param errorMessage - 에러 메시지
 * @returns {Object}
 * - isConfirmOpen - 확인 모달 열림 여부
 * - selectedId - 선택된 ID
 * - isDeleting - 삭제 중 여부
 * - handleDelete - 삭제 핸들러
 * - handleConfirmDelete - 확인 모달 확인 핸들러
 * - setIsConfirmOpen - 확인 모달 열림 여부 설정
 * - setSelectedId - 선택된 ID 설정
 */
export const useDeleteWithConfirm = (
    deleteFn: (id: number) => Promise<void>,
    queryKey: string[],
    successMessage: string,
    errorMessage: string
  ) => {
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const queryClient = useQueryClient();
    
    const deleteMutation = useMutation({
      mutationFn: deleteFn,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey });
        showToastSuccessMessage(successMessage);
        setIsConfirmOpen(false);
        setSelectedId(null);
      },
      onError: () => {
        showToastErrorMessage(errorMessage);
      },
    });
    
    const handleDelete = (id: number) => {
      setSelectedId(id);
      setIsConfirmOpen(true);
    };
    
    const handleConfirmDelete = () => {
      if (selectedId) {
        deleteMutation.mutate(selectedId);
      }
    };
    
    return {
      isConfirmOpen,
      selectedId,
      isDeleting: deleteMutation.isPending,
      handleDelete,
      handleConfirmDelete,
      setIsConfirmOpen,
      setSelectedId
    };
  };