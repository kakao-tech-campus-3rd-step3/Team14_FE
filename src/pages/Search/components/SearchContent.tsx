import { useState } from 'react';
import { searchFestivals } from '@/apis/search/searchFestivals';
import type { Festival } from '@/types/FestivalType';
import { Link } from 'react-router-dom';
import FestivalCard from '@/pages/Festivals/components/FestivalCard';

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
          placeholder="축제명을 입력하세요..."
          className="w-full p-3 pr-20 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <button
          onClick={handleSearch}
          disabled={loading || !searchQuery.trim()}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          {loading ? '검색중...' : '검색'}
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
            <div className="grid grid-cols-2 ">
              {searchResults.map((festival) => (
                <Link key={festival.id} to={`/festival/${festival.id}`} className="block">
                  <div className="transform  origin-top-left">
                    <FestivalCard data={festival} />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchContent;
