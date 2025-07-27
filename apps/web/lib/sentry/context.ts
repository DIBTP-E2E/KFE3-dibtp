import * as Sentry from '@sentry/nextjs';

/**
 * 사용자 컨텍스트를 Sentry에 설정
 */
export const setSentryUserContext = (user: { id: string; email?: string; nickname?: string }) => {
  Sentry.setUser({
    id: user.id,
    email: user.email,
    username: user.nickname,
  });

  // 추가 컨텍스트 정보
  Sentry.setContext('user_info', {
    user_id: user.id,
    has_email: !!user.email,
    has_nickname: !!user.nickname,
  });
};

/**
 * 사용자 로그아웃 시 컨텍스트 정리
 */
export const clearSentryUserContext = () => {
  Sentry.setUser(null);
  Sentry.setContext('user_info', null);
};

/**
 * 페이지 컨텍스트 설정
 */
export const setSentryPageContext = (page: { route: string; title?: string }) => {
  Sentry.setContext('page', {
    route: page.route,
    title: page.title,
  });
};
