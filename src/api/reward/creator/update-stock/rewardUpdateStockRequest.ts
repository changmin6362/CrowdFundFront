/** 리워드 재고 수정 요청 */
export interface RewardUpdateStockRequest {
  /**
   * 리워드 재고
   * @format int32
   * @min 1
   * @example 10
   */
  stock: number;
}
