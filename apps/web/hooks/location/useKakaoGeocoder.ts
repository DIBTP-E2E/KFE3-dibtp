import { useCallback } from 'react';

import type { FullAddress } from '@web/types';
import { isKakaoMapsLoaded, parseKakaoAddress } from '@web/utils/location';

export const useKakaoGeocoder = () => {
  const convertCoordsToAddress = useCallback(
    async (lat: number, lng: number, isForProduct: boolean = false): Promise<FullAddress> => {
      try {
        if (!isKakaoMapsLoaded()) {
          throw new Error('카카오 지도 API를 사용할 수 없습니다.');
        }

        const geocoder = new window.kakao.maps.services.Geocoder();

        return new Promise((resolve, reject) => {
          geocoder.coord2Address(lng, lat, (result, status) => {
            if (status === window.kakao.maps.services.Status.OK && result.length > 0) {
              const landAddress = result[0]?.address;
              const roadAddress = result[0]?.road_address;

              if (!landAddress) reject(new Error('주소 변환에 실패했습니다.'));
              else resolve(parseKakaoAddress(landAddress, roadAddress, isForProduct));
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
    },
    []
  );

  const convertAddressToCoords = useCallback(
    async (address: string): Promise<{ latitude: number; longitude: number } | null> => {
      try {
        if (!isKakaoMapsLoaded()) {
          throw new Error('카카오 지도 API를 사용할 수 없습니다.');
        }

        const geocoder = new window.kakao.maps.services.Geocoder();

        return new Promise((resolve, _) => {
          geocoder.addressSearch(address, (result, status) => {
            if (status === window.kakao.maps.services.Status.OK && result.length > 0) {
              const coords = result[0];
              if (coords && coords.y && coords.x) {
                resolve({
                  latitude: parseFloat(coords.y),
                  longitude: parseFloat(coords.x),
                });
              } else {
                resolve(null);
              }
            } else {
              resolve(null);
            }
          });
        });
      } catch (error) {
        console.error('좌표 변환 중 오류:', error);
        return null;
      }
    },
    []
  );

  return { convertCoordsToAddress, convertAddressToCoords };
};
