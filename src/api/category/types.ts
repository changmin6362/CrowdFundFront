/**
 * 카테고리 트리 노드 (재귀 구조)
 */
export interface CategoryTreeNode {
  /** 카테고리 ID */
  categoryId: number;
  /** 카테고리명 */
  name: string;
  /** 카테고리의 깊이 (0부터 시작)*/
  depth: number;
  /** 정렬 순서 */
  sortOrder: number;
  /** 하위 카테고리 목록 */
  children: CategoryTreeNode[];
}