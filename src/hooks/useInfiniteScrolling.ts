import { useEffect, useCallback, type RefObject } from 'react';

const THRESHOLD = 0.1;

interface InfiniteScrollingProps {
  observerRef: RefObject<HTMLDivElement>;
  fetchMore: () => void;
  hasMore: boolean;
}

const options: IntersectionObserverInit = {
  threshold: THRESHOLD,
};
/**
 * 무한스크롤 구현을 위한 훅
 * @param observerRef - 관찰 대상 요소
 * @param fetchMore - 더 불러오기 함수
 * @param hasMore - 더 불러올 수 있는지 여부
 * @returns 무한 스크롤 훅
 */
const useInfiniteScrolling = ({ observerRef, fetchMore, hasMore }: InfiniteScrollingProps) => {
  const onIntersect: IntersectionObserverCallback = useCallback(
    (entries) => {
      if (!entries[0].isIntersecting) return;
      fetchMore();
    },
    [fetchMore],
  );

  useEffect(() => {
    const element = observerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(onIntersect, options);
    observer.observe(element);

    if (!hasMore) observer.unobserve(element);
    return () => observer.disconnect();
  }, [observerRef, onIntersect, hasMore]);
};

export default useInfiniteScrolling;
