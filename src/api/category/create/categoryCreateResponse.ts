import { CategoryTreeNode } from "../types";

/** 카테고리 생성 응답 */
export interface CategoryCreateResponse {
  /** 카테고리 트리 */
  categoryTree?: CategoryTreeNode[];
}
