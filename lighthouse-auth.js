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

// Puppeteer 모듈 로드 (apps/web의 설치된 버전 사용)
let puppeteer;
try {
  puppeteer = require('./apps/web/node_modules/puppeteer');
  console.log('✅ Using Puppeteer from apps/web/node_modules');
} catch (e) {
  try {
    puppeteer = require('puppeteer');
    console.log('✅ Using Puppeteer from global/local installation');
  } catch (e2) {
    throw new Error('❌ Puppeteer not found. Please install puppeteer in apps/web or globally.');
  }
}

// 로그인 수행 함수
async function performLogin(page, email, password) {
  console.log('📧 Looking for email input...');
  
  // 여러 셀렉터 시도
  const emailSelectors = [
    'input[name="email"]',
    'input[type="email"]', 
    'input[placeholder*="이메일"]'
  ];
  
  let emailInput = null;
  for (const selector of emailSelectors) {
    try {
      await page.waitForSelector(selector, { timeout: 5000 });
      emailInput = selector;
      console.log(`✅ Found email input with selector: ${selector}`);
      break;
    } catch (e) {
      console.log(`❌ Email selector failed: ${selector}`);
    }
  }
  
  if (!emailInput) {
    throw new Error('Could not find email input field');
  }
  
  await page.type(emailInput, email);
  console.log('📧 Email entered successfully');

  // 비밀번호 입력
  console.log('🔒 Looking for password input...');
  
  const passwordSelectors = [
    'input[name="password"]',
    'input[type="password"]',
    'input[placeholder*="비밀번호"]'
  ];
  
  let passwordInput = null;
  for (const selector of passwordSelectors) {
    try {
      await page.waitForSelector(selector, { timeout: 5000 });
      passwordInput = selector;
      console.log(`✅ Found password input with selector: ${selector}`);
      break;
    } catch (e) {
      console.log(`❌ Password selector failed: ${selector}`);
    }
  }
  
  if (!passwordInput) {
    throw new Error('Could not find password input field');
  }
  
  await page.type(passwordInput, password);
  console.log('🔒 Password entered successfully');

  // 로그인 버튼 클릭
  console.log('✅ Looking for login button...');
  
  const buttonSelectors = [
    'button[type="submit"]',
    'button:contains("로그인")',
    'form button'
  ];
  
  let loginButton = null;
  for (const selector of buttonSelectors) {
    try {
      await page.waitForSelector(selector, { timeout: 5000 });
      loginButton = selector;
      console.log(`✅ Found login button with selector: ${selector}`);
      break;
    } catch (e) {
      console.log(`❌ Button selector failed: ${selector}`);
    }
  }
  
  if (!loginButton) {
    throw new Error('Could not find login button');
  }

  // 로그인 버튼 클릭 및 네비게이션 대기
  await Promise.all([
    page.waitForNavigation({
      waitUntil: 'domcontentloaded',
      timeout: 15000,
    }),
    page.click(loginButton)
  ]);
  
  console.log('✅ Login button clicked successfully');

  // 로그인 성공 확인
  const finalUrl = page.url();
  if (finalUrl.includes('/login')) {
    throw new Error('Login failed - still on login page');
  }

  console.log('🎉 Auto-login successful!');
  console.log(`📍 Final URL: ${finalUrl}`);
}

module.exports = async (browser, context) => {
  // 테스트용 계정 정보 (GitHub Secrets에서 환경변수로 전달됨)
  const TEST_EMAIL = process.env.LIGHTHOUSE_TEST_EMAIL || 'ymg@test.com';
  const TEST_PASSWORD = process.env.LIGHTHOUSE_TEST_PASSWORD || '123456';

  // 현재 측정하려는 URL 확인
  const targetUrl = context.url;
  console.log(`🔑 Auto-login script called for URL: ${targetUrl}`);

  // 모든 페이지는 인증이 필요한 페이지로 간주

  console.log('🔑 Private page detected - starting auto-login...');

  // 새 페이지 열기
  const page = await browser.newPage();

  try {
    // 목표 URL에 직접 접근하여 리다이렉트 확인
    console.log(`🔍 Accessing target URL: ${targetUrl}`);
    await page.goto(targetUrl, {
      waitUntil: 'domcontentloaded',
      timeout: 30000,
    });

    // 페이지 로딩 대기
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const currentUrl = page.url();
    console.log(`📍 Current URL after navigation: ${currentUrl}`);

    // 로그인 페이지로 리다이렉트되었는지 확인
    if (currentUrl.includes('/login')) {
      console.log('🔐 Redirected to login page - performing login...');
      
      // 로그인 수행
      await performLogin(page, TEST_EMAIL, TEST_PASSWORD);
      
      // 로그인 후 현재 URL 확인
      const afterLoginUrl = page.url();
      console.log(`📍 After login URL: ${afterLoginUrl}`);
      
      // 목표 URL과 다른 곳에 있다면 이동, 같은 곳이면 스킵
      if (afterLoginUrl !== targetUrl && !afterLoginUrl.includes('/location')) {
        console.log(`🎯 Navigating to target URL: ${targetUrl}`);
        await page.goto(targetUrl, {
          waitUntil: 'domcontentloaded',
          timeout: 30000,
        });
      } else {
        console.log('✅ Already at correct page after login');
      }
      
    } else if (currentUrl === targetUrl) {
      console.log('✅ Successfully accessed target URL - already authenticated');
      
    } else if (currentUrl.includes('/location')) {
      console.log('📍 Redirected to location setup - user authenticated but needs location');
      
    } else {
      console.log(`⚠️ Unexpected redirect from ${targetUrl} to ${currentUrl}`);
    }

    // 세션 쿠키 확인
    const cookies = await page.cookies();
    console.log(`🍪 Session cookies: ${cookies.length} found`);
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
