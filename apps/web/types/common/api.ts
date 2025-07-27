// API 응답 기본 타입
export type ApiResponse<T> =
  | {
      data: T;
      error: null;
    }
  | {
      data: null;
      error: {
        message: string;
        code?: string;
      };
    };
