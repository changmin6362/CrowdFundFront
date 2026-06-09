/** 카테고리 생성 요청 */
export interface CategoryCreateRequest {
  /**
   * 부모 카테고리 ID (최상위 카테고리인 경우 null)
   * @format int32
   * @example null
   */
  parentId?: number;
  /**
   * 카테고리 이름
   * @minLength 2
   * @maxLength 20
   * @example "전자제품"
   */
  name: string;
}
