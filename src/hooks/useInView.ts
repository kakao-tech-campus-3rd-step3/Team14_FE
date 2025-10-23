import { useRef, useState } from 'react';
import { useEffect } from 'react';

/**
 * 뷰포트에 들어왔는지 확인하는 훅
 * @param threshold - 뷰포트에 들어왔는지 확인하는 임계값
 * @returns isInView - 뷰포트에 들어왔는지 여부
 * @returns ref - 뷰포트에 들어왔는지 확인하는 요소의 ref
 */
const useInView = <T extends HTMLDivElement>(threshold: number = 0.5) => {
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entries]) => {
        setIsInView(entries.isIntersecting);
      },
      { threshold },
    );

    const el = ref.current;
    if (el) {
      observer.observe(el);
    }

    return () => {
      if (el) {
        observer.unobserve(el);
      }
    };
  }, [threshold, ref, setIsInView]);

  return { ref, isInView };
};

export default useInView;
