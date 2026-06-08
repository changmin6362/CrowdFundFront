import { CategoryTreeNode } from '../types';

/**
 * 카테고리 트리 조회 응답
 */
export interface UserFetchCategoryResponse {
  categoryTree: CategoryTreeNode[];
}