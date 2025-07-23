/**
 * ISO 8601 날짜 문자열을 yyyy.mm.dd 형식으로 변환
 * @param dateString - ISO 8601 형식의 날짜 문자열 (예: "2025-07-22T16:42:22.425Z")
 * @returns yyyy.mm.dd 형식의 문자열 (예: "2025.07.22")
 */
export const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);

    // 유효한 날짜인지 확인
    if (isNaN(date.getTime())) {
      return dateString; // 유효하지 않은 경우 원본 반환
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}.${month}.${day}`;
  } catch {
    return dateString; // 에러 발생 시 원본 반환
  }
};

/**
 * ISO 8601 날짜 문자열을 yyyy.mm.dd HH:mm 형식으로 변환
 * @param dateString - ISO 8601 형식의 날짜 문자열
 * @returns yyyy.mm.dd HH:mm 형식의 문자열 (예: "2025.07.22 16:42")
 */
export const formatDateTime = (dateString: string): string => {
  try {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return dateString;
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}.${month}.${day} ${hours}:${minutes}`;
  } catch {
    return dateString;
  }
};
