import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // NOTE: 인증이 안 된 경우 -> 로그인 페이지로 리다이렉트
  const isAuthPage = pathname === '/login' || pathname === '/signup';
  if (!session && !isAuthPage) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // NOTE: 인증된 사용자가 /login, /signup 접근 시 -> 홈으로
  if (session && isAuthPage) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // NOTE: 로그인된 사용자가 메인 기능에 접근할 때 -> 위치 정보가 없으면 /location으로 리다이렉트
  const protectedPaths = ['/', '/products', '/chat'];
  const isProtectedPage = protectedPaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );

  if (session && isProtectedPage && pathname !== '/location') {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data: userData } = await supabase
      .from('users')
      .select('region, detail_address')
      .eq('id', user?.id)
      .single();

    const hasLocation = !!userData?.region?.trim() && !!userData?.detail_address?.trim();

    if (!hasLocation) {
      return NextResponse.redirect(new URL('/location', req.url));
    }
  }

  return res;
}

export const config = {
  matcher: ['/', '/login', '/signup', '/products/:path*', '/chat/:path*', '/location'],
};
