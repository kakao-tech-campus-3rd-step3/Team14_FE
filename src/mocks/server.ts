import { setupServer } from 'msw/node';
import { handlers } from '@/mocks/handlers/handlers';

export const server = setupServer(...handlers);
