import Container from '@/components/common/Container';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import SearchContent from './components/SearchContent';

const SearchPage = () => {
  return (
    <Container>
      <Header variant="page" />
      <div className="flex flex-col items-center px-8 py-4 gap-12">
        <SearchContent />
      </div>
      <Footer initialSelected="none" />
    </Container>
  );
};

export default SearchPage;
