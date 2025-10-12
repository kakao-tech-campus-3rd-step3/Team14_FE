import { useEffect, useState } from 'react';
import useDebounce from './useDebounce';
import { useQuery } from '@tanstack/react-query';
import { searchFestivals } from '@/apis/search/searchFestivals';

const MIN_LENGTH = 1;

const useSearch = () => {
  const DEBOUNCE_TIME = 250;

  const [searchQuery, setSearchQuery] = useState('');
  const [immediateQuery, setImmediateQuery] = useState('');
  const debouncedQuery = useDebounce(searchQuery, DEBOUNCE_TIME);

  // 즉시 검색이 있으면 그것을, 없으면 디바운스된 값을 사용
  const activeQuery = immediateQuery || debouncedQuery;

  // 리팩토링하여서 React Query로 검색하는걸로 수정
  const {
    data: searchResults = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['search', activeQuery],
    queryFn: () => searchFestivals({ keyword: activeQuery }),
    select: (data) => data.data.content,
    enabled: activeQuery.length >= MIN_LENGTH,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    //throwOnError: true, // TODO: 차후 에러 바운더리 리팩토링을 위해 해당 설정을 추가해놓았습니다.
  });
/*
  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    setImmediateQuery(searchQuery.trim()); // 즉시 검색 실행
  };
*/
    // 검색어가 변경되면 즉시 검색 상태 초기화
    useEffect(() => {
        setImmediateQuery('');
      }, [searchQuery]);
  const canShowResults = activeQuery.length >= MIN_LENGTH;

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    isLoading,
    error,
    //handleSearch,
    canShowResults,
  };
};
export default useSearch;
