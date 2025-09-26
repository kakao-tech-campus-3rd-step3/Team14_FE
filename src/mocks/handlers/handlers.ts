import { getFestivalsHandler } from '@/mocks/handlers/festivals/getFestivals.mock';
import { getFestivalsInfoHandler } from '@/mocks/handlers/festivals/getFestivalsInfo.mock';

export const handlers = [...getFestivalsHandler, ...getFestivalsInfoHandler];
