import { MyCommentInfo, CommentInfo } from '../types';
import { CursorRequest } from '@api/_common/types';

/**
 * 내 댓글 목록 조회 응답
 */
export interface MyCommentsResponse {
  myComments: MyCommentInfo[];
  hasNext: boolean;
  nextCursor: CursorRequest;
}

/**
 * 댓글 수정 요청
 */
export interface ProjectCommentUpdateRequest {
  content: string;
}

/**
 * 댓글 수정 응답
 */
export interface ProjectCommentUpdateResponse {
  patchedComment: CommentInfo;
}

/**
 * 댓글 삭제 응답
 */
export interface ProjectCommentDeleteResponse {
  deletedCommentId: number;
}