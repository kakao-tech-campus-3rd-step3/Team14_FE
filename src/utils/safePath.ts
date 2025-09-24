/**
 * 안전한 경로 생성
 * 절대 URL 거절
 * 경로만 허용
 * @param next - 리다이렉트할 경로
 * @returns 안전한 경로
 */
export function safePath(next?: string | null): string | null {
    if (!next) return null;
    try {
      const url = new URL(next, 'http://dummy'); 
      if (url.origin !== 'http://dummy') return null;      
      if (!url.pathname.startsWith('/')) return null;      
      return url.pathname + url.search + url.hash;
    } catch {
      return null;
    }
  }
  