import { type NextRequest } from 'next/server';

import { updateSession } from './lib/supabase/server';

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * 인증이 필요한 모든 페이지들
     */
    '/chat/:path*',
    '/mypage/:path*',
    '/products/:path*',

    /*
     * 인증이 필요한 모든 API들
     */
    '/api/products/:path*',
    '/api/my-info',
    '/api/bids/:path*',
    '/api/images/:path*',
    '/api/chat/:path*',
    '/api/user/:path*',
  ],
};
