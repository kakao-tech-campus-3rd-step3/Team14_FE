import { useState } from 'react';
import useDebounce from './useDebounce';
import { useQuery } from '@tanstack/react-query';
import { searchFestivals } from '@/apis/search/searchFestivals';

const MIN_LENGTH = 1;

const useSearch = () => {
  const DEBOUNCE_TIME = 250;

  const [searchQuery, setSearchQuery] = useState('');
  const debouncedQuery = useDebounce(searchQuery, DEBOUNCE_TIME);

  // 리팩토링하여서 React Query로 검색하는걸로 수정
  const {
    data: searchResults = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['search', debouncedQuery],
    queryFn: () => searchFestivals({ keyword: debouncedQuery }),
    select: (data) => data.data.content,
    enabled: debouncedQuery.length >= MIN_LENGTH,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    //throwOnError: true, // TODO: 차후 에러 바운더리 리팩토링을 위해 해당 설정을 추가해놓았습니다.
  });

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
  };

  const canShowResults = debouncedQuery.length >= MIN_LENGTH;

  return {
    searchQuery,
    setSearchQuery,
    debouncedQuery,
    searchResults,
    isLoading,
    error,
    handleSearch,
    canShowResults,
  };
};
export default useSearch;
