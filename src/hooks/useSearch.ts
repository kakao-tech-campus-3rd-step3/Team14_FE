import { useState } from 'react';
import useDebounce from '@/hooks/useDebounce';
import { useQuery } from '@tanstack/react-query';
import { searchFestivals } from '@/apis/search/searchFestivals';

/**
 * 검색 훅
 * 엔터키, 돋보기 버튼 클릭 등의 경우 : 즉시 검색 실햄
 * 디바운스된 검색어 : 250ms 디바운스 후 검색
 * 즉시 검색 기능도 추가할 예정이었으나 사용자경험 상 불필요할 것 같아
 * 현재는 디바운스로 검색 기능만 구현해두었습니다.
 * 즉시 검색 기능 사용시 다시 구현하여야 함.
 * @returns {Object}
 * - searchQuery: 검색어
 * - setSearchQuery: 검색어 설정
 * - searchResults: 검색 결과
 * - isLoading: 로딩 상태
 * - error: 에러
 * - canShowResults: 검색 결과 표시 여부
 * - debouncedQuery: 디바운스된 검색어
 */

const useSearch = () => {
  const DEBOUNCE_TIME = 250;
  const MIN_LENGTH = 1;

  const [searchQuery, setSearchQuery] = useState('');
  const debouncedQuery = useDebounce(searchQuery, DEBOUNCE_TIME);

  const {
    data: searchResults = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['search', debouncedQuery],
    queryFn: () => searchFestivals({ keyword: debouncedQuery }),
    select: (data) => data.data.content,
    enabled: debouncedQuery.length >= MIN_LENGTH,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  const canShowResults = debouncedQuery.length >= MIN_LENGTH;

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    isLoading,
    error,
    canShowResults,
    refetch,
  };
};
export default useSearch;
