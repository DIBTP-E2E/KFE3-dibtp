/**
 * 성능 측정 자동화: Lighthouse CI 자동 로그인 스크립트
 *
 * 목적:
 * - 인증이 필요한 페이지들의 성능 측정을 위한 자동 로그인
 * - Supabase 인증을 통해 테스트 계정으로 로그인 후 세션 유지
 * - Lighthouse CI가 홈, 마이페이지, 채팅 등 보호된 페이지 측정 가능
 *
 * 동작 과정:
 * 1. 테스트 계정 정보를 환경변수에서 가져오기
 * 2. Puppeteer를 사용해 /login 페이지에서 자동 로그인
 * 3. 로그인 성공 후 세션 쿠키 추출
 * 4. Lighthouse가 인증된 상태로 다른 페이지들 측정
 *
 * 환경변수:
 * - LIGHTHOUSE_TEST_EMAIL: 테스트 계정 이메일
 * - LIGHTHOUSE_TEST_PASSWORD: 테스트 계정 비밀번호
 * - LOCAL_BASE_URL: 로컬 서버 URL (기본값: http://localhost:3001)
 *
 * 기술 스택:
 * - Puppeteer (향후 Playwright로 대체 가능)
 * - Supabase Auth
 *
 * 사용법: lighthouserc.js에서 puppeteerScript로 자동 실행
 */

const puppeteer = require('puppeteer');

module.exports = async (browser, context) => {
  // 테스트용 계정 정보 (GitHub Secrets에서 환경변수로 전달됨)
  const TEST_EMAIL = process.env.LIGHTHOUSE_TEST_EMAIL || 'ymg@test.com';
  const TEST_PASSWORD = process.env.LIGHTHOUSE_TEST_PASSWORD || '123456';
  const BASE_URL = process.env.LOCAL_BASE_URL || 'http://localhost:3001';

  console.log('🔑 Starting auto-login for Lighthouse CI...');

  // 새 페이지 열기
  const page = await browser.newPage();

  try {
    // 로그인 페이지로 이동
    console.log('📱 Navigating to login page...');
    await page.goto(`${BASE_URL}/login`, {
      waitUntil: 'networkidle2',
      timeout: 30000,
    });

    // 이메일 입력
    console.log('📧 Entering email...');
    await page.waitForSelector('input[type="email"]', { timeout: 10000 });
    await page.type('input[type="email"]', TEST_EMAIL);

    // 비밀번호 입력
    console.log('🔒 Entering password...');
    await page.waitForSelector('input[type="password"]', { timeout: 10000 });
    await page.type('input[type="password"]', TEST_PASSWORD);

    // 로그인 버튼 클릭
    console.log('✅ Clicking login button...');
    await page.click('button[type="submit"]');

    // 로그인 완료 대기 (홈페이지로 리다이렉트 대기)
    await page.waitForNavigation({
      waitUntil: 'networkidle2',
      timeout: 15000,
    });

    // 로그인 성공 확인 (URL 또는 특정 요소 확인)
    const currentUrl = page.url();
    if (currentUrl.includes('/login')) {
      throw new Error('Login failed - still on login page');
    }

    console.log('🎉 Auto-login successful!');
    console.log(`📍 Current URL: ${currentUrl}`);

    // 세션 쿠키 추출
    const cookies = await page.cookies();
    console.log(`🍪 Extracted ${cookies.length} cookies for session persistence`);

    // 위치 설정이 필요한 경우 처리
    if (currentUrl.includes('/location')) {
      console.log('📍 Location setup required, handling...');

      // 위치 설정 로직 (필요시 구현)
      // 여기서는 간단히 넘어가기
      await page.waitForTimeout(2000);
    }
  } catch (error) {
    console.error('❌ Auto-login failed:', error.message);

    // 스크린샷 캡처 (디버깅용)
    try {
      await page.screenshot({
        path: './lighthouse-login-error.png',
        fullPage: true,
      });
      console.log('📸 Error screenshot saved: lighthouse-login-error.png');
    } catch (screenshotError) {
      console.error('📸 Screenshot failed:', screenshotError.message);
    }

    throw error;
  } finally {
    // 페이지 닫기
    await page.close();
  }

  console.log('🚀 Auto-login script completed successfully');
};
