/** 리워드 정보 수정 요청 */
export interface RewardUpdateRequest {
  /**
   * 리워드 제목
   * @example "리워드 제목 예시"
   */
  title: string;
  /**
   * 리워드 내용
   * @example "리워드 내용 예시"
   */
  description: string;
  /**
   * 리워드 가격
   * @min 0
   * @example 10000
   */
  price: number;
}
