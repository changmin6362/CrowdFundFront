import { CategorySortItem, CategoryTreeNode } from '../types';

/**
 * 카테고리 생성 요청
 */
export interface AdminCategoryCreateRequest {
  parentId: number | null;
  name: string;
}

/**
 * 카테고리 생성 응답
 */
export interface AdminCategoryCreateResponse {
  categoryTree: CategoryTreeNode[];
}

/**
 * 카테고리 이름 변경 요청
 */
export interface AdminCategoryRenameRequest {
  name: string;
}

/**
 * 카테고리 부모 변경 요청
 */
export interface AdminCategoryMoveRequest {
  parentId: number | null;
}

/**
 * 카테고리 정렬 순서 변경 요청
 */
export interface AdminCategoryReorderRequest {
  categories: CategorySortItem[];
}

/**
 * 카테고리 활성 여부 변경 요청
 */
export interface AdminCategoryActiveRequest {
  isActive: boolean;
}