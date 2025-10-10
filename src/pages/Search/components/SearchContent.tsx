import { useState, useRef, useEffect } from 'react';
import { searchFestivals } from '@/apis/search/searchFestivals';
import type { Festival } from '@/types/FestivalType';
import SearchIcon from '@/components/icon/SearchIcon';
import FestivalCard from '@/pages/Festivals/components/FestivalCard';

const DEBOUNCE_TIME = 250;
const MIN_LENGTH = 0;

const SearchContent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Festival[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mySeqRef = useRef<number>(0);

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
      // 에러바운더리 / 토스트 등 적용을 위해 일단 alert만 처리하였습니다.
      alert('검색에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      // 만약 사용자가 엔터를 눌렀는 데 이미 디바운스 타이머가 있다면 비워줍니다.
      if (timerRef.current) clearTimeout(timerRef.current);
      handleSearch();
    }
  };
  useEffect(() => {
    const q = searchQuery.trim();
    // 현재는 검색어의 길이가 0이면 검색 안 하고 그 이외의 경우에는 검색하게 구현하였는데,
    // 이는 참고한 레퍼런스처럼 초성만 검색해도 나오게 검색 결과가 나오도록 수정할 여지를 남겨두기 위해서 입니다.(올리브영 등)
    // 하지만 이렇게 초성만으로도 검색이 되는 것은 백엔드와 협의가 필요한 부분이기에 일단은 0이 아니면 요청을 보내게 해두었습니다.
    // 의도한 결과 : 'ㄴ' 초성 검색 -> 결과에 '남동' 나옴
    // 현재 구현 : 'ㄴ' 초성 검색 -> 결과에 아무것도 안나오고 '검색결과 (0개)'로 렌더링됨.
    if (q.length === MIN_LENGTH) {
      return; // 검색 안 함
    }
    // 직전 타이머를 초기화시킵니다.
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    const mySeq = ++mySeqRef.current;
    // 새로운 타이머를 설정합니다.
    timerRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await searchFestivals({ keyword: q });
        if (mySeq !== mySeqRef.current) return;
        setSearchResults(res.data.content);
        setHasSearched(true);
      } catch (err) {
        // 에러바운더리 / 토스트 등 적용을 위해 일단 alert만 처리하였습니다.
        alert('검색에 실패했습니다.');
      } finally {
        setLoading(false);
      }
    }, DEBOUNCE_TIME);

    // 언마운트/검색어 변경 시 타이머 정리
    // 검색어가 변경될 때마다: 새 effect가 돌기 전에 이전 effect의 cleanup이 실행 -> 이전 타이머 정리
    // 컴포넌트가 사라질 때: 남아있을 수 있는 타이머 싹 정리 -> 언마운트 후 setState 방지
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [searchQuery]);

  const canShowResults = hasSearched && searchQuery.trim().length > 0;
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

      {canShowResults && (
        <div>
          <h2 className="text-lg font-semibold mb-4">검색 결과 ({searchResults.length}개)</h2>
          {searchResults.length === 0 ? (
            <div className="text-center py-8 text-gray-500">검색 결과가 없습니다.</div>
          ) : (
            <div className="grid grid-cols-2  gap-6">
              {searchResults.map((result) => {
                return <FestivalCard key={result.id} data={result} />;
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchContent;
