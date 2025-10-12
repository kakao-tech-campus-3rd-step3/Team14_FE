import SearchIcon from '@/components/icon/SearchIcon';
import FestivalCard from '@/pages/Festivals/components/FestivalCard';
import type { Festival } from '@/types/FestivalType';
import useSearch from '@/hooks/useSearch';

const SearchContent = () => {
  const {
    searchQuery,
    setSearchQuery,
    searchResults,
    isLoading,
    error,
    handleSearch,
    canShowResults,
  } = useSearch();

  //사용자는 엔터키를 눌렀을때도 검색할 수 있음
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="p-4">
      <div className="relative mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="찾으시는 축제가 있으신가요?"
          className="w-full p-3 pr-20 border border-gray-300 rounded-md focus:outline-none focus:ring-0 focus:border-gray-300"
        />
        <button
          onClick={handleSearch}
          disabled={isLoading || !searchQuery.trim()}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 text-primary-500 rounded-md hover:text-primary-600 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          <SearchIcon />
        </button>
      </div>

      {error && (
        <div className="text-center py-8 text-red-500">검색에 실패했습니다. 다시 시도해주세요.</div>
      )}

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
