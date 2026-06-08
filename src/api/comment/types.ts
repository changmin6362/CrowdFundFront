/**
 * 일반 댓글 정보
 */
export interface CommentInfo {
  commentId: number;
  writerName: string;
  content: string;
  /** 댓글 생성일시 (ISO String) */
  createdAt: string;
  /** 댓글 수정 가능 여부 */
  isEditable: boolean;
}

/**
 * 내 댓글 정보 (프로젝트 정보 포함)
 */
export interface MyCommentInfo {
  commentId: number;
  projectId: number;
  projectTitle: string;
  content: string;
  /** 댓글 생성일시 (ISO String) */
  createdAt: string;
}