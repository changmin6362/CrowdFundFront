/**
 * 공통 응답 구조
 */
export interface ApiResult<T = void> {
  /** 응답 메시지 */
  message: string;
  /** 응답 데이터 (데이터가 없을 경우 null) */
  data: T | null;
  /** HTTP 상태 코드 */
  status: number;
}

/**
 * 복합 커서 기반 페이지네이션 요청, 응답 구조
 */
export type CursorRequest =
  | {
      /** 커서의 날짜 키 (ISO String) */
      createdAt: string;
      /** 커서의 ID 키 */
      id: number;
    }
  | {
      /** 커서의 날짜 키 (ISO String) */
      createdAt: null;
      /** 커서의 ID 키 */
      id: null;
    };