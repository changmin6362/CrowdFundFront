/** 댓글 수정 요청 */
export interface CommentUpdateRequest {
  /**
   * 수정할 댓글 내용
   * @example "수정할 댓글 내용을 입력해주세요."
   */
  content: string;
}
