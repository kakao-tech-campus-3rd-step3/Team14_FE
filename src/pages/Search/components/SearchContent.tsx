import { useState } from 'react';
import { searchFestivals } from '@/apis/search/searchFestivals';
import type { Festival } from '@/types/FestivalType';
import SearchIcon from '@/components/icon/SearchIcon';
import FestivalsSection from '@/pages/Festivals/components/FestivalsSection';

const SearchContent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Festival[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    try {
      const response = await searchFestivals({ 
        keyword: searchQuery,
      });
      setSearchResults(response.data.content);
      setHasSearched(true);
    } catch (error) {
      console.error('검색 실패:', error);
      alert('검색에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

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
          disabled={loading || !searchQuery.trim()}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 text-primary-500 rounded-md hover:text-primary-600 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          <SearchIcon />
        </button>
      </div>

      {hasSearched && (
        <div>
          <h2 className="text-lg font-semibold mb-4">
            검색 결과 ({searchResults.length}개)
          </h2>
          
          {searchResults.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              검색 결과가 없습니다.
            </div>
          ) : (

              <FestivalsSection title="" data={searchResults} />
 
          )}
        </div>
      )}
    </div>
  );
};

export default SearchContent;
