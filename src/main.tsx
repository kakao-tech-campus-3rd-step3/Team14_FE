import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/styles/index.css';
import App from '@/App.tsx';

async function enableMocking() {
  if (import.meta.env.VITE_ENABLE_MSW === 'true') {
    const { client } = await import('@/mocks/client');
    return client.start({});
  }
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
});
