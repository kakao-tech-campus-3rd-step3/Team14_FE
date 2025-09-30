import type { AuthToken } from '@/types/Auth/AuthToken';

export type TokenSetter = (token: AuthToken) => void;
