import Container from '@/components/common/Container';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import SearchContent from './components/SearchContent';

const SearchPage = () => {
  return (
    <Container>
      <Header variant="page" title="검색" />
      <SearchContent />
      <Footer initialSelected="search" />
    </Container>
  );
};

export default SearchPage;
