'use client';

import { useRouter } from 'next/navigation';

import { PAGE_ROUTES } from '@/constants';

/**
 * 타입 안전한 네비게이션 훅
 * 경로 상수를 활용하여 안전한 네비게이션을 제공합니다.
 */
export const useAppNavigation = () => {
  const router = useRouter();

  // 기본 네비게이션 함수
  const navigateTo = (route: string) => router.push(route);

  // 홈 페이지로 이동
  const goHome = () => router.push(PAGE_ROUTES.HOME);

  // 인증 관련 네비게이션
  const goToLogin = () => router.push(PAGE_ROUTES.AUTH.LOGIN);

  const goToSignup = () => router.push(PAGE_ROUTES.AUTH.SIGNUP);

  const goToLocationSetup = () => router.push(PAGE_ROUTES.LOCATION);

  // 상품 관련 네비게이션
  const goToProductRegister = () => router.push(PAGE_ROUTES.PRODUCTS.REGISTER);

  const goToProductDetail = (productId: string) =>
    router.push(PAGE_ROUTES.PRODUCTS.DETAIL(productId));

  const goToProductEdit = (productId: string) => router.push(PAGE_ROUTES.PRODUCTS.EDIT(productId));

  // 검색 관련 네비게이션
  const goToSearch = (keyword: string) => {
    const encodedKeyword = encodeURIComponent(keyword);
    router.push(PAGE_ROUTES.SEARCH(encodedKeyword));
  };

  // 채팅 관련 네비게이션
  const goToChat = () => router.push(PAGE_ROUTES.CHAT.LIST);

  const goToChatList = () => router.push(PAGE_ROUTES.CHAT.LIST);

  const goToProductChatList = (productId: string) =>
    router.push(PAGE_ROUTES.CHAT.LIST_BY_PRODUCT(productId));

  const goToChatRoom = (chatId: string) => router.push(PAGE_ROUTES.CHAT.ROOM(chatId));

  // 마이페이지 관련 네비게이션
  const goToMypage = () => router.push(PAGE_ROUTES.MYPAGE.INDEX);

  const goToMyProfile = () => router.push(PAGE_ROUTES.MYPAGE.PROFILE);

  const goToMyNotifications = () => router.push(PAGE_ROUTES.MYPAGE.NOTIFICATIONS);

  const goToMyAccount = () => router.push(PAGE_ROUTES.MYPAGE.ACCOUNT);

  const goToMySales = () => router.push(PAGE_ROUTES.MYPAGE.SALES);

  const goToMyPurchases = () => router.push(PAGE_ROUTES.MYPAGE.PURCHASES);

  const goToMyFavorites = () => router.push(PAGE_ROUTES.MYPAGE.FAVORITES);

  // 뒤로 가기
  const goBack = () => router.back();

  // 새로고침
  const refresh = () => router.refresh();

  // 교체 (히스토리 스택에 추가하지 않음)
  const replace = (route: string) => router.replace(route);

  return {
    // 기본 함수들
    navigateTo,
    goBack,
    refresh,
    replace,

    // 페이지별 네비게이션
    goHome,
    goToLogin,
    goToSignup,
    goToLocationSetup,
    goToProductRegister,
    goToProductDetail,
    goToProductEdit,
    goToSearch,
    goToChat,
    goToChatList,
    goToProductChatList,
    goToChatRoom,
    goToMypage,
    goToMyProfile,
    goToMyNotifications,
    goToMyAccount,
    goToMySales,
    goToMyPurchases,
    goToMyFavorites,
  };
};
