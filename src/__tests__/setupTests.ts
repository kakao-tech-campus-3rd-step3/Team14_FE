import '@testing-library/jest-dom';
import { server } from '@/mocks/server';
import { vi } from 'vitest';

vi.stubEnv('VITE_API_BASE_URL', 'http://localhost:8080');

// IntersectionObserver Mock
global.IntersectionObserver = class IntersectionObserver {
  constructor(
    public callback: IntersectionObserverCallback,
    public options?: IntersectionObserverInit,
  ) {}

  observe() {
    return null;
  }

  disconnect() {
    return null;
  }

  unobserve() {
    return null;
  }

  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }

  get root() {
    return null;
  }

  get rootMargin() {
    return '';
  }

  get thresholds() {
    return [];
  }
} as unknown as typeof IntersectionObserver;

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
