import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

import { PAGE_ROUTES } from '@web/constants';

export async function updateSession(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  console.log(`🔍 Middleware triggered for: ${pathname}`);
  console.time(`⏰ middleware-${pathname}`);

  let supabaseResponse = NextResponse.next({
    request,
  });

  console.time('⏰ middleware - createServerClient');

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  console.timeEnd('⏰ middleware - createServerClient');

  // Do not run code between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // IMPORTANT: DO NOT REMOVE auth.getUser()
  console.time('⏰ middleware: supabase.auth.getUser');

  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.timeEnd('⏰ middleware: supabase.auth.getUser');

  const isAuthPage = pathname === PAGE_ROUTES.AUTH.LOGIN || pathname === PAGE_ROUTES.AUTH.SIGNUP;

  // 인증되지 않은 사용자 처리
  if (!user && !isAuthPage) {
    const url = request.nextUrl.clone();
    url.pathname = PAGE_ROUTES.AUTH.LOGIN;
    return NextResponse.redirect(url);
  }

  // 인증된 사용자가 로그인/회원가입 페이지 접근 시 홈으로 리다이렉트
  if (user && isAuthPage) {
    const url = request.nextUrl.clone();
    url.pathname = PAGE_ROUTES.HOME;
    return NextResponse.redirect(url);
  }

  // 로그인된 사용자의 위치 정보 확인
  const protectedPaths = [PAGE_ROUTES.HOME, PAGE_ROUTES.CHAT.INDEX, PAGE_ROUTES.MYPAGE.INDEX];
  const isProtectedPage = protectedPaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );

  if (user && isProtectedPage && pathname !== PAGE_ROUTES.LOCATION) {
    const { data: userData } = await supabase
      .from('users')
      .select('region, detail_address')
      .eq('user_id', user.id)
      .single();

    const hasLocation = !!userData?.region?.trim() && !!userData?.detail_address?.trim();

    if (!hasLocation) {
      const url = request.nextUrl.clone();
      url.pathname = PAGE_ROUTES.LOCATION;
      return NextResponse.redirect(url);
    }

    // 🚀 사용자 정보 쿠키에 저장
    supabaseResponse.cookies.set(
      'user-auth-info',
      JSON.stringify({
        userId: user.id,
        region: userData?.region || '',
        detailAddress: userData?.detail_address || '',
        lastUpdated: Date.now(),
      }),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 30, // 30분
        path: '/',
      }
    );
  }

  // 🔒 인증되지 않은 사용자 → 쿠키 삭제
  if (!user) {
    supabaseResponse.cookies.delete('user-auth-info');
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is.
  // If you're creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  console.timeEnd(`⏰ middleware-${pathname}`);

  return supabaseResponse;
}
