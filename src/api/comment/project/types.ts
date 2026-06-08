import { CommentInfo } from '../types';
import { CursorRequest } from '@api/_common/types';

/**
 * 프로젝트 댓글 작성 요청
 */
export interface ProjectCommentCreateRequest {
  content: string;
}

/**
 * 프로젝트 댓글 작성 응답
 */
export interface ProjectCommentCreateResponse {
  createdComment: CommentInfo;
}

/**
 * 프로젝트 댓글 목록 조회 응답
 */
export interface ProjectCommentsFetchResponse {
  comments: CommentInfo[];
  hasNext: boolean;
  nextCursor: CursorRequest;
}