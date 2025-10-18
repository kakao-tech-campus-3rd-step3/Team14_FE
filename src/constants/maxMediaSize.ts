const MAX_MEDIA_SIZE = {
  IMAGE: 1024 * 1024 * 10,
  VIDEO: 1024 * 1024 * 250,
  DOCUMENT: 1024 * 1024 * 10,
} as const;

export const MAX_DOCUMENT_COUNT = 5;

export default MAX_MEDIA_SIZE;
