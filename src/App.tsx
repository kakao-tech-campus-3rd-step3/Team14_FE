import Routes from '@/router/Routes';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/utils/queryClient';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AuthProvider } from '@/context/AuthContext';
import { ToastContainer } from 'react-toastify';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorComponent from './components/error/ErrorComponent';

const App = () => {
  return (
    <ErrorBoundary
      FallbackComponent={() => <ErrorComponent isGlobal={true} showBackButton={false} />}
    >
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </AuthProvider>
        <ToastContainer />
        {import.meta.env.VITE_ENABLE_RQ_DEVTOOLS === 'true' && <ReactQueryDevtools />}
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
