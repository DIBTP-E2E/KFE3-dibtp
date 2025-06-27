import { useCallback } from 'react';

import type { Address } from '@/types';
import { isKakaoMapsLoaded, parseAddressInfo } from '@/utils';

export const useKakaoGeocoder = () => {
  const convertCoordsToAddress = useCallback(async (lat: number, lng: number): Promise<Address> => {
    try {
      if (!isKakaoMapsLoaded()) {
        throw new Error('카카오 지도 API를 사용할 수 없습니다.');
      }

      const geocoder = new window.kakao.maps.services.Geocoder();

      return new Promise((resolve, reject) => {
        geocoder.coord2Address(lng, lat, (result, status) => {
          if (status === window.kakao.maps.services.Status.OK && result.length > 0) {
            const landAddress = result[0]?.address;

            if (!landAddress) reject(new Error('주소 변환에 실패했습니다.'));
            else resolve(parseAddressInfo(landAddress));
          } else {
            reject(new Error('주소 변환에 실패했습니다.'));
          }
        });
      });
    } catch (error) {
      console.error('주소 변환 중 오류:', error);
      return {
        full_address: '알 수 없음',
        region: '알 수 없음',
        detail_address: '알 수 없음',
      };
    }
  }, []);

  return { convertCoordsToAddress };
};
