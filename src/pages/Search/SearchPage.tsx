import Container from '@/components/common/Container';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import SEOHead from '@/components/common/SEOHead';
import SearchContent from '@/pages/Search/components/SearchContent';

const SearchPage = () => {
  return (
    <Container>
      <SEOHead
        title="축제 검색 | FestaPick"
        description="관심 지역과 취향에 맞는 축제를 빠르게 찾아보세요."
        url="/search"
      />
      <Header variant="page" title="검색" />
      <SearchContent />
      <Footer initialSelected="search" />
    </Container>
  );
};

export default SearchPage;
