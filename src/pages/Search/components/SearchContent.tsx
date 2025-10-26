import SearchIcon from '@/components/icon/SearchIcon';
import FestivalCard from '@/pages/Festivals/components/FestivalCard';
import type { Festival } from '@/types/FestivalType';
import useSearch from '@/hooks/useSearch';
import ErrorComponent from '@/components/common/ErrorComponent';
import LoadingSpinner from '@/components/loading/LoadingSpinner';

/**
 * 검색 컨텐츠 컴포넌트
 * @returns 검색 컨텐츠 컴포넌트
 */
const SearchContent = () => {
  const { searchQuery, setSearchQuery, searchResults, isLoading, error, canShowResults } =
    useSearch();
  if (error) {
    return <ErrorComponent title="검색에 실패했습니다." message="다시 시도해주세요." />;
  }
  if (isLoading) {
    return <LoadingSpinner size="lg" className="min-h-[400px]" message="검색 중..." />;
  }
  return (
    <div className="p-4">
      <div className="relative mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="찾으시는 축제가 있으신가요?"
          className="w-full p-3 pr-20 border border-gray-300 rounded-md focus:outline-none focus:ring-0 focus:border-gray-300"
        />
        <button
          disabled={isLoading || !searchQuery.trim()}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 text-primary-500 rounded-md hover:text-primary-600 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          <SearchIcon />
        </button>
      </div>

      {canShowResults && !isLoading && !error && (
        <div>
          <h2 className="text-lg font-semibold mb-4">검색 결과 ({searchResults.length}개)</h2>
          {searchResults.length === 0 ? (
            <div className="text-center py-8 text-gray-500">검색 결과가 없습니다.</div>
          ) : (
            <div className="grid grid-cols-2 gap-6">
              {searchResults.map((result: Festival) => (
                <FestivalCard key={result.id} data={result} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchContent;
