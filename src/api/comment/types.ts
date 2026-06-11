/** 일반 댓글 정보 */
export interface CommentInfo {
  /**
   * 댓글 ID
   * @format int64
   * @example 1
   */
  commentId?: number;
  /**
   * 작성자 이름
   * @example "작성자 이름 예시"
   */
  writerName?: string;
  /**
   * 댓글 내용
   * @example "댓글 내용 예시"
   */
  content?: string;
  /**
   * 댓글 생성일시
   * @format date-time
   * @example "2023-09-01T12:00:00"
   */
  createdAt?: string;
  /**
   * 댓글 수정 가능 여부
   * @example true
   */
  isEditable?: boolean;
}