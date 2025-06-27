import { METROPOLITAN_CITIES, SPECIAL_CITIES } from '@/constants';
import type { Address } from '@/types';

// 특별,광역,자치 시 이름
const getCityName = (region1: string): string => {
  if (region1 === '서울') return '서울특별시';
  if (region1 === '세종') return '세종특별자치시';
  return `${region1}광역시`;
};

// 광역시,도/시 단위 지역 이름
const getRegion = (region1: string, region2: string): string => {
  if (SPECIAL_CITIES.includes(region1 as (typeof SPECIAL_CITIES)[number])) {
    return getCityName(region1);
  }

  if (region1 === '제주') {
    return '제주특별자치도';
  }

  const provinceName = `${region1}도`;
  if (region2.includes('시') || region2.includes('군')) {
    return `${provinceName} ${region2}`;
  }
  return provinceName;
};

// 구/동 단위 지역 이름
const getDetailAddress = (region1: string, region2: string, region3: string): string => {
  if (METROPOLITAN_CITIES.includes(region1 as (typeof METROPOLITAN_CITIES)[number])) {
    if (region2 && region3) {
      return `${region2} ${region3}`;
    }
    return region2 || region3 || '';
  }
  return region3 || '';
};

// 주소 정보 파싱
export const parseAddressInfo = (landAddress: kakao.maps.services.Address): Address => {
  const region1 = landAddress.region_1depth_name;
  const region2 = landAddress.region_2depth_name;
  const region3 = landAddress.region_3depth_name;

  const region = getRegion(region1, region2);

  const detailAddress = getDetailAddress(region1, region2, region3);

  return {
    full_address: landAddress.address_name,
    region,
    detail_address: detailAddress || '상세 주소 없음',
  };
};
