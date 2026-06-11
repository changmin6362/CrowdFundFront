/** 댓글 삭제 응답 */
export interface CommentDeleteResponse {
  /**
   * 삭제된 댓글 ID
   * @format int64
   * @example 1
   */
  deletedCommentId?: number;
}
