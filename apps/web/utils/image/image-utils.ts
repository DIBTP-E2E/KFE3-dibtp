// 파일 경로 생성 유틸리티
export const generateImagePath = (userId: string, fileName: string) => {
  const timestamp = Date.now();
  const extension = fileName.split('.').pop();
  return `products/${userId}/${timestamp}.${extension}`;
};
