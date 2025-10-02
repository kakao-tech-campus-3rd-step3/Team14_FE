import { getFestivalsHandler } from '@/mocks/handlers/festivals/getFestivals.mock';
import { getFestivalsInfoHandler } from '@/mocks/handlers/festivals/getFestivalsInfo.mock';
import { getReviewHandler } from '@/mocks/handlers/review/getReview.mock';

export const handlers = [...getFestivalsHandler, ...getFestivalsInfoHandler, ...getReviewHandler];
