import type { FullAddress, DaumPostcodeData } from '@web/types';

/**
 * full_address에서 region과 detail_address를 추출
 * @param fullAddress - 전체 주소 (예: "경기 수원시 영통구 이의동 123")
 * @returns { region, detailAddress }
 * @example
 * parseAddress("경기 수원시 영통구 이의동 123")
 * // { region: "경기", detailAddress: "수원시" }
 * parseAddress("서울 강남구 역삼동 123")
 * // { region: "서울", detailAddress: "강남구" }
 */
export const parseAddress = (fullAddress: string): { region: string; detailAddress: string } => {
  const parts = fullAddress.trim().split(' ');

  if (parts.length < 2) {
    return { region: fullAddress, detailAddress: '' };
  }

  return {
    region: parts[0] || '', // 첫 번째: 시도 (예: "경기", "서울")
    detailAddress: parts[1] || '', // 두 번째: 시/구 (예: "수원시", "강남구")
  };
};

/**
 * 카카오 지도 API 주소 데이터를 앱 형식으로 변환
 * @param landAddress - 카카오 지도 API에서 받은 주소 정보
 * @param roadAddress - 카카오 지도 API에서 받은 도로명주소 정보
 * @param isForProduct - 상품용인지 여부 (true: 상품용, false: 사용자용)
 * @returns 파싱된 주소 정보
 */
export const parseKakaoAddress = (
  landAddress: kakao.maps.services.Address,
  roadAddress: kakao.maps.services.RoadAaddress | null = null,
  isForProduct: boolean = false
): FullAddress => {
  // full_address에서 간단하게 추출
  const { region, detailAddress } = parseAddress(landAddress.address_name);

  // detail_address 로직
  const detail = isForProduct
    ? landAddress.address_name.replace(`${region} `, '') // 상품용: 전체 상세 주소
    : detailAddress; // 사용자용: 두 번째 단어

  return {
    full_address: landAddress.address_name,
    region,
    detail_address: detail || '상세 주소 없음',
    road_address: roadAddress?.address_name || undefined,
  };
};

/**
 * 다음 우편번호 데이터를 앱 형식으로 변환
 * @param data - 다음 우편번호 서비스에서 받은 데이터
 * @param isForProduct - 상품용인지 여부 (true: 상품용, false: 사용자용)
 * @returns 앱 내부 주소 형식
 */
export const parsePostcodeAddress = (
  data: DaumPostcodeData,
  isForProduct: boolean = false
): FullAddress => {
  const { address, roadAddress } = data;

  // full_address에서 간단하게 추출
  const { region, detailAddress } = parseAddress(address);

  // detail_address 로직
  const detail = isForProduct
    ? address.replace(`${region} `, '') // 상품용: 전체 상세 주소
    : detailAddress; // 사용자용: 두 번째 단어

  return {
    full_address: address,
    region,
    detail_address: detail,
    road_address: roadAddress || undefined,
  };
};
