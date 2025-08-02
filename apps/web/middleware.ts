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
    '/',
    '/login',
    '/signup',
    '/location',
    '/chat/:path*',
    '/mypage',
    '/mypage/:path*',
    '/products/:path*',
    '/search',

    /*
     * 인증이 필요한 모든 API들
     */
    '/api/products',
    '/api/products/:path*',
    '/api/my-info',
    '/api/bids/:path*',
    '/api/favorites/:path*',
    '/api/images/:path*',
    '/api/chat/:path*',
    '/api/user/:path*',
  ],
};
