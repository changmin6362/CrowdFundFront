/** 리워드 생성 요청 */
export interface RewardCreateRequest {
  /**
   * 리워드 제목
   * @example "1단계 후원 보상"
   */
  title: string;
  /**
   * 보상 설명
   * @example "프로젝트의 1단계 후원 보상입니다."
   */
  description: string;
  /**
   * 리워드 가격
   * @min 1
   * @example 10000
   */
  price: number;
  /**
   * 재고 수량
   * @format int32
   * @min 1
   * @example 10
   */
  stock: number;
}
