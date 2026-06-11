/** 카테고리 이름 변경 요청 */
export interface CategoryRenameRequest {
  /**
   * 변경할 카테고리 이름
   * @example "게임기"
   */
  name: string;
}
