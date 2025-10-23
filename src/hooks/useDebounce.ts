import { useState, useEffect, useRef } from 'react';
/**
 * 디바운스 훅
 * 검색 기능 시 디바운스를 구현하기 위한 훅입니다.
 * 디바운스를 적용하여 매번 요청하지 않도록 하지만 사용자가 입력할 때 일정시간마다 뜨게함으로써 나은 사용자경험을 의도하였습니다.
 * @param value - 디바운스할 값
 * @param delay - 디바운스 지연 시간
 * @returns 디바운스된 값
 */
const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
