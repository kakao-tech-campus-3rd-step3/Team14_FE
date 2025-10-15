import { createContext, useContext, useState, type ReactNode, type ChangeEvent } from 'react';
import { useParams, useSearchParams, useNavigate, generatePath } from 'react-router-dom';
import type { PickStyleId } from '@/constants/pickStyles';
import type { PostFestivalsPickBody } from '@/apis/festivals/postFestivalsPick';
import { ROUTE_PATH } from '@/constants/routes';

// 최대 선택 가능한 스타일 수
const MAX_SELECTED_STYLES = 3;

interface PickContextType {
  selectedStyles: PickStyleId[];
  mbtiAnswers: Record<string, boolean>;
  additionalInfo: string;
  canProceedToMbti: boolean;
  canProceedToRecommendation: boolean;
  handleStyleSelect: (styleId: PickStyleId) => void;
  handleMbtiAnswer: (questionId: string, answer: boolean) => void;
  handleAdditionalInfo: (e: ChangeEvent<HTMLInputElement>) => void;
  goToNextStep: () => void;
  onSubmitRecommendation: () => void;
  getRequestData: () => PostFestivalsPickBody;
}

const PickContext = createContext<PickContextType | undefined>(undefined);

export const PickProvider = ({ children }: { children: ReactNode }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [selectedStyles, setSelectedStyles] = useState<PickStyleId[]>([]);
  const [mbtiAnswers, setMbtiAnswers] = useState<Record<string, boolean>>({});
  const [additionalInfo, setAdditionalInfo] = useState<string>('');
  const { areaId } = useParams();

  const handleStyleSelect = (styleId: PickStyleId) => {
    setSelectedStyles((prev) => {
      if (prev.includes(styleId)) {
        return prev.filter((id) => id !== styleId);
      }

      if (prev.length < MAX_SELECTED_STYLES) {
        return [...prev, styleId];
      }

      return [...prev.slice(1), styleId];
    });
  };

  const handleMbtiAnswer = (questionId: string, answer: boolean) => {
    setMbtiAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleAdditionalInfo = (e: ChangeEvent<HTMLInputElement>) => {
    setAdditionalInfo(e.target.value);
  };

  const canProceedToMbti = selectedStyles.length > 0;
  const canProceedToRecommendation = Object.keys(mbtiAnswers).length === 4;

  const goToNextStep = () => {
    if (canProceedToMbti) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set('step', 'mbti');
      setSearchParams(newParams);
    }
  };

  const getRequestData = (): PostFestivalsPickBody => {
    return {
      styles: selectedStyles,
      areaCode: Number(areaId),
      isNewPlace: mbtiAnswers['isNewPlace'] || false,
      isSolo: mbtiAnswers['isSolo'] || false,
      prefersEnjoyment: mbtiAnswers['prefersEnjoyment'] || false,
      isSpontaneous: mbtiAnswers['isSpontaneous'] || false,
      additionalInfo: additionalInfo,
    };
  };

  const onSubmitRecommendation = () => {
    const requestData = getRequestData();

    // Festivals 페이지로 이동하면서 요청 데이터를 전달
    navigate(generatePath(ROUTE_PATH.FESTIVALS, { areaId: areaId || '' }), {
      state: { requestData },
    });
  };

  const value: PickContextType = {
    selectedStyles,
    mbtiAnswers,
    additionalInfo,
    canProceedToMbti,
    canProceedToRecommendation,
    handleStyleSelect,
    handleMbtiAnswer,
    handleAdditionalInfo,
    goToNextStep,
    onSubmitRecommendation,
    getRequestData,
  };

  return <PickContext.Provider value={value}>{children}</PickContext.Provider>;
};

export const usePick = () => {
  const context = useContext(PickContext);
  if (context === undefined) {
    throw new Error('usePick must be used within a PickProvider');
  }
  return context;
};
