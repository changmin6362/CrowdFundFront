/** 카테고리 이동(부모 변경) 요청 */
export interface CategoryMoveRequest {
  /**
   * 부모 카테고리 ID (최상위로 이동 시 null)
   * @format int32
   * @example 1
   */
  parentId?: number | null;
}
