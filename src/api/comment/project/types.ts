import { CommentInfo } from '../types';
import { CursorRequest } from '@api/_common/types';

/**
 * 프로젝트 댓글 작성 요청
 */
export interface ProjectCommentCreateRequest {
  /** 댓글 내용 */
  content: string;
}

/**
 * 프로젝트 댓글 작성 응답
 */
export interface ProjectCommentCreateResponse {
  /** 생성한 댓글 정보 */
  createdComment: CommentInfo;
}

/**
 * 프로젝트 댓글 목록 조회 응답
 */
export interface ProjectCommentsFetchResponse {
  /** 프로젝트 댓글 목록 */
  comments: CommentInfo[];
  /** 다음 페이지 존재 여부 */
  hasNext: boolean;
  /** 다음 페이지 조회를 위한 커서 정보 */
  nextCursor: CursorRequest;
}