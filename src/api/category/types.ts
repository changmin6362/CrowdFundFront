/** 카테고리 트리 노드 (재귀 구조) */
export interface CategoryTreeNode {
  /**
   * 카테고리 ID
   * @format int32
   * @example 1
   */
  categoryId?: number;
  /**
   * 카테고리 이름
   * @example "게임"
   */
  name?: string;
  /**
   * 카테고리 깊이
   * @format int32
   * @example 0
   */
  depth?: number;
  /**
   * 카테고리 순서
   * @format int32
   * @example 10
   */
  sortOrder?: number;
  /**
   * 하위 카테고리 목록
   * @example "[하위 카테고리 객체 배열 (CategoryTreeNode 구조 반복)]"
   */
  children?: CategoryTreeNode[];
}