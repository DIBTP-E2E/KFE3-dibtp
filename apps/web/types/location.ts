export interface Address {
  full_address: string; // 모든 단위의 주소
  region: string; // 도/시, 시/군 단위 (예: "서울특별시", "경기도 성남시")
  detail_address: string; // 구, 읍/면/동 단위 (예: "강남구", "분당구 정자동")
}

export interface Location extends Address {
  latitude: number;
  longitude: number;
}
