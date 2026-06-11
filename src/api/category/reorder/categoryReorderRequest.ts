/** 카테고리 정렬 정보 */
export interface CategorySortItem {
  /**
   * 카테고리 ID
   * @format int32
   * @example 1
   */
  categoryId: number;
  /**
   * 변경할 정렬 순서
   * @format int32
   * @example 25
   */
  sortOrder: number;
}

/** 카테고리 정렬 순서 변경 요청 */
export interface CategoryReorderRequest {
  /** 변경할 카테고리 목록 */
  categories: CategorySortItem[];
}
