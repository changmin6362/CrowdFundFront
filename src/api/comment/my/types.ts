import { CommentInfo } from '../types';
import { CursorRequest } from '@api/_common/types';

/**
 * 내 댓글 목록 조회 응답
 */
export interface MyCommentsResponse {
  /** 내 댓글 목록 */
  myComments: MyCommentInfo[];
  /** 다음 페이지 존재 여부 */
  hasNext: boolean;
  /** 다음 페이지 커서 정보 */
  nextCursor: CursorRequest;
}

/**
 * 내 댓글 정보
 */
export interface MyCommentInfo {
  /** 댓글 ID */
  commentId: number;
  /** 프로젝트 ID */
  projectId: number;
  /** 프로젝트 제목 */
  projectTitle: string;
  /** 댓글 내용 */
  content: string;
  /** 생성일시 (ISO String) */
  createdAt: string;
}

/**
 * 댓글 수정 요청
 */
export interface ProjectCommentUpdateRequest {
  /** 수정할 댓글 내용 */
  content: string;
}

/**
 * 댓글 수정 응답
 */
export interface ProjectCommentUpdateResponse {
  /** 수정한 댓글 내용 */
  patchedComment: CommentInfo;
}

/**
 * 댓글 삭제 응답
 */
export interface ProjectCommentDeleteResponse {
  /** 삭제한 댓글 ID */
  deletedCommentId: number;
}