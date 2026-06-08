/**
 * 카테고리 정보
 */
export interface CategoryInfo {
  categoryId: number;
  parentId: number | null;
  name: string;
  depth: number;
  sortOrder: number;
  isActive: boolean;
}

/**
 * 카테고리 트리 노드 (재귀 구조)
 */
export interface CategoryTreeNode {
  categoryId: number;
  name: string;
  depth: number;
  sortOrder: number;
  children: CategoryTreeNode[];
}

/**
 * 카테고리 정렬 정보 아이템
 */
export interface CategorySortItem {
  categoryId: number;
  sortOrder: number;
}