import Routes from '@/router/Routes';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/utils/queryClient';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AuthProvider } from '@/context/AuthContext';

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </AuthProvider>
      {import.meta.env.VITE_ENABLE_RQ_DEVTOOLS === 'true' && <ReactQueryDevtools />}
    </QueryClientProvider>
  );
};

export default App;
