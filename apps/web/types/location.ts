export interface Address {
  region: string; // 도/시, 시/군 단위 (예: "서울특별시", "경기도 성남시")
  detail_address: string; // 구, 읍/면/동 단위 (예: "강남구", "분당구 정자동")
}

export interface FullAddress extends Address {
  full_address: string; // 모든 단위의 주소
  road_address?: string; // 도로명주소
}

export interface Location extends FullAddress {
  latitude: number;
  longitude: number;
}
