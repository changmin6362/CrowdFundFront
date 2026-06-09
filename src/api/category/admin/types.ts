import { CategoryTreeNode } from '../types';

/** 카테고리 생성 요청 */
export interface AdminCategoryCreateRequest {
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

/** 카테고리 생성 응답 */
export interface AdminCategoryCreateResponse {
  /** 카테고리 트리 */
  categoryTree?: CategoryTreeNode[];
}

/** 카테고리 이름 변경 요청 */
export interface AdminCategoryRenameRequest {
  /**
   * 변경할 카테고리 이름
   * @example "게임기"
   */
  name: string;
}

/** 카테고리 이동(부모 변경) 요청 */
export interface AdminCategoryMoveRequest {
  /**
   * 부모 카테고리 ID (최상위로 이동 시 null)
   * @format int32
   * @example 1
   */
  parentId?: number;
}

/** 카테고리 정렬 순서 변경 요청 */
export interface AdminCategoryReorderRequest {
  /** 변경할 카테고리 목록 */
  categories: CategorySortItem[];
}

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

/**
 * 카테고리 활성 여부 변경 요청
 */
export interface AdminCategoryActiveRequest {
  /**
   * 카테고리 활성 상태
   * @example true
   */
  isActive: boolean;
}