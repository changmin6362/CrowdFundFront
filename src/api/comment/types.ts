/**
 * 일반 댓글 정보
 */
export interface CommentInfo {
  /** 댓글 ID */
  commentId: number;
  /** 작성자 이름 */
  writerName: string;
  /** 댓글 내용 */
  content: string;
  /** 생성일시 (ISO String) */
  createdAt: string;
  /** 수정 가능 여부 */
  isEditable: boolean;
}