import { setupWorker } from 'msw/browser';
import { handlers } from '@/mocks/handlers/handlers';

export const client = setupWorker(...handlers);
