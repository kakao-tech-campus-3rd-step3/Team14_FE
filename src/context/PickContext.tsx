import { createContext, useContext, useState, type ReactNode, type ChangeEvent } from 'react';
import { useSearchParams } from 'react-router-dom';

interface PickContextType {
  selectedStyles: string[];
  mbtiAnswers: Record<string, boolean>;
  additionalInfo: string;
  canProceedToMbti: boolean;
  canProceedToRecommendation: boolean;
  handleStyleSelect: (styleId: string) => void;
  handleMbtiAnswer: (questionId: string, answer: boolean) => void;
  handleAdditionalInfo: (e: ChangeEvent<HTMLInputElement>) => void;
  goToNextStep: () => void;
  onSubmitRecommendation: () => void;
}

const PickContext = createContext<PickContextType | undefined>(undefined);

export const PickProvider = ({ children }: { children: ReactNode }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [mbtiAnswers, setMbtiAnswers] = useState<Record<string, boolean>>({});
  const [additionalInfo, setAdditionalInfo] = useState<string>('');

  const handleStyleSelect = (styleId: string) => {
    setSelectedStyles((prev) => {
      if (prev.includes(styleId)) {
        return prev.filter((id) => id !== styleId);
      }

      if (prev.length < 3) {
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

  const onSubmitRecommendation = () => {
    const requestData = {
      styles: selectedStyles,
      mbti: mbtiAnswers,
      additionalInfo: additionalInfo || undefined,
    };

    // TODO: API 호출
    console.log(requestData);
    // lint 때문에 추가하였고 추후에 api 호출 시 삭제 예정
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
