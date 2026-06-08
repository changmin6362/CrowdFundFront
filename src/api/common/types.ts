/**
 * 공통 응답 구조
 */
export interface Types<T = void> {
  /** 응답 메시지 */
  message: string;
  /** 응답 데이터 (데이터가 없을 경우 null) */
  data: T | null;
}