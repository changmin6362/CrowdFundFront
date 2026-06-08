import { CategoryTreeNode } from '../types';

/**
 * 카테고리 생성 요청
 */
export interface AdminCategoryCreateRequest {
  /** 상위 카테고리 ID (null인 경우 최상위 카테고리) */
  parentId: number | null;
  /** 카테고리명 */
  name: string;
}

/**
 * 카테고리 생성 응답
 */
export interface AdminCategoryCreateResponse {
  /** 카테고리 트리 */
  categoryTree: CategoryTreeNode[];
}

/**
 * 카테고리 이름 변경 요청
 */
export interface AdminCategoryRenameRequest {
  /** 카테고리명 */
  name: string;
}

/**
 * 카테고리 부모 변경 요청
 */
export interface AdminCategoryMoveRequest {
  /** 상위 카테고리 ID (null인 경우 최상위 카테고리) */
  parentId: number | null;
}

/**
 * 카테고리 정렬 순서 변경 요청
 */
export interface AdminCategoryReorderRequest {
  /** 카테고리 정렬 순서 변경 목록 */
  categories: CategorySortItem[];
}

/**
 * 카테고리 정렬 정보 아이템
 */
export interface CategorySortItem {
  /** 카테고리 ID */
  categoryId: number;
  /** 정렬 순서 */
  sortOrder: number;
}

/**
 * 카테고리 활성 여부 변경 요청
 */
export interface AdminCategoryActiveRequest {
  /** 카테고리 활성화 여부 */
  isActive: boolean;
}