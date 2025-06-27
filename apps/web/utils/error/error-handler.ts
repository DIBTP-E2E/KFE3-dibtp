export interface ErrorResult {
  success: false;
  error: string;
  code?: string;
}

// 실패 상태와 오류 메세지 반환
export const handleError = (error: unknown, context?: string): ErrorResult => {
  console.error(`${context ? `[${context}] ` : ''}오류:`, error);

  if (error instanceof Error) {
    return {
      success: false,
      error: error.message,
    };
  }

  return {
    success: false,
    error: context ? `${context} 중 오류가 발생했습니다.` : '알 수 없는 오류가 발생했습니다.',
  };
};

// 단순 메세지와 함께 성공 상태 반환
export const createSuccessResult = (message: string) => ({
  success: true as const,
  message,
});
