import { useEffect, useCallback, type RefObject } from 'react';

type Props = {
  observerRef: RefObject<HTMLDivElement>;
  fetchMore: () => void;
  hasMore: boolean;
};

const options: IntersectionObserverInit = {
  threshold: 0.1,
};

export default function useInfiniteScrolling({ observerRef, fetchMore, hasMore }: Props) {
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
}
