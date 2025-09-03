import Button from '@/components/common/Button';
import Container from '@/components/common/Container';
import Header from '@/components/common/Header';

const HomePage = () => {
  return (
    <Container>
      <Header variant="logo" title="Home" />
      <div className="w-full h-full mt-12">HomePage</div>
      <Button variant="primary" size="lg">
        Primary
      </Button>
      <Button variant="secondary" size="lg">
        Secondary
      </Button>
      <Button variant="tertiary" size="lg">
        Tertiary
      </Button>
      <Button variant="icon" size="lg">
        Icon
      </Button>
      <Button variant="primary" size="md">
        Primary
      </Button>
      <Button variant="secondary" size="md">
        Secondary
      </Button>
      <Button variant="tertiary" size="md">
        Tertiary
      </Button>
      <Button variant="icon" size="md">
        Icon
      </Button>
      <Button variant="primary" size="sm">
        Primary
      </Button>
      <Button variant="secondary" size="sm">
        Secondary
      </Button>
      <Button variant="tertiary" size="sm">
        Tertiary
      </Button>
      <Button variant="icon" size="sm">
        Icon
      </Button>
    </Container>
  );
};

export default HomePage;
