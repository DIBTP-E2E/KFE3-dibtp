import { METROPOLITAN_CITIES, SPECIAL_CITIES } from '@web/constants';
import type { FullAddress } from '@web/types';

/**
 * 특별시, 광역시, 자치시의 정식 명칭을 반환
 * @param region1 - 1차 행정구역명 (예: '서울', '부산', '세종')
 * @returns 정식 행정구역명 (예: '서울특별시', '부산광역시', '세종특별자치시')
 */
const getCityName = (region1: string): string => {
  if (region1 === '서울') return '서울특별시';
  if (region1 === '세종') return '세종특별자치시';
  return `${region1}광역시`;
};

/**
 * 광역시/도 단위의 지역명을 반환 (상품 매칭용 region 필드)
 * @param region1 - 1차 행정구역명 (예: '서울', '경기', '부산')
 * @param region2 - 2차 행정구역명 (예: '중구', '성남시', '해운대구')
 * @returns 광역시/도 단위 지역명 (예: '서울특별시', '경기도 성남시', '부산광역시')
 */
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

/**
 * 사용자용 상세 주소를 생성 (구/군까지만)
 * @param region1 - 1차 행정구역명 (예: '서울', '경기')
 * @param region2 - 2차 행정구역명 (예: '중구', '성남시')
 * @returns 사용자용 상세 주소 문자열
 * @example
 * getUserDetailAddress('서울', '중구') // '중구'
 * getUserDetailAddress('경기', '성남시') // '성남시'
 */
const getUserDetailAddress = (region1: string, region2: string): string => {
  if (METROPOLITAN_CITIES.includes(region1 as (typeof METROPOLITAN_CITIES)[number])) {
    return region2 || '';
  }
  return region2 || '';
};

/**
 * 주소 정보를 파싱하여 용도에 맞는 형태로 반환
 * @param landAddress - 카카오 지도 API에서 받은 주소 정보
 * @param roadAddress - 카카오 지도 API에서 받은 도로명주소 정보
 * @param isForProduct - 상품용인지 여부 (true: 상품용, false: 사용자용)
 * @returns 파싱된 주소 정보
 * @example
 * // 상품용: "서울 중구 남창동 9-1" → { region: "서울특별시", detail_address: "서울 중구 남창동 9-1" }
 * parseAddressInfo(landAddress, roadAddress, true)
 * // 사용자용: "서울 중구 남창동 9-1" → { region: "서울특별시", detail_address: "중구" }
 * parseAddressInfo(landAddress, roadAddress, false)
 */
export const parseAddressInfo = (
  landAddress: kakao.maps.services.Address,
  roadAddress: kakao.maps.services.RoadAaddress | null = null,
  isForProduct: boolean = false
): FullAddress => {
  const region1 = landAddress.region_1depth_name;
  const region2 = landAddress.region_2depth_name;

  const region = getRegion(region1, region2);

  // 상품용: 구/군 이하 상세 주소, 사용자용: 구/군까지만
  const detailAddress = isForProduct
    ? landAddress.address_name.replace(`${region1} `, '') // "서울 강남구 역삼동 826-21" → "강남구 역삼동 826-21"
    : getUserDetailAddress(region1, region2);

  return {
    full_address: landAddress.address_name,
    region,
    detail_address: detailAddress || '상세 주소 없음',
    road_address: roadAddress?.address_name || undefined,
  };
};
