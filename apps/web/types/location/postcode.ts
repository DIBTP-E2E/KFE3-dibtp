export interface DaumPostcodeData {
  address: string; // 기본 주소 (검색 결과에서 첫줄에 나오는 주소, 보통 도로명 주소가 있어서 도로명 주소임)
  roadAddress: string; // 도로명 주소
  jibunAddress: string; // 지번 주소
  zonecode: string; // 우편번호
  sido: string; // 시도
  sigungu: string; // 시군구
  bname: string; // 법정동/법정리
  roadname?: string; // 도로명
  buildingName?: string; // 건물명
}

interface DaumPostcodeOptions {
  onComplete: (data: DaumPostcodeData) => void;
  onClose?: () => void;
  width?: string | number;
  height?: string | number;
  animation?: boolean;
}

interface DaumPostcodeService {
  open: () => void;
  embed: (element: HTMLElement) => void;
}

export interface UseDaumPostcodeOptions {
  onComplete: (data: DaumPostcodeData) => void;
  onClose?: () => void;
}

declare global {
  interface Window {
    daum: {
      Postcode: new (options: DaumPostcodeOptions) => DaumPostcodeService;
    };
  }
}
