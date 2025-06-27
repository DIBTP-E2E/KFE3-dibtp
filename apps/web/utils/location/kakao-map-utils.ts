export const validateKakaoApiKey = (): boolean => {
  return !!process.env.NEXT_PUBLIC_KAKAO_API_KEY;
};

export const isKakaoMapsLoaded = (): boolean => {
  return !!(window.kakao && window.kakao.maps);
};
