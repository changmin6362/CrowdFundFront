import { CursorRequest } from "@api/_common/types";

/** 내 댓글 정보 */
export interface MyCommentInfo {
  /**
   * 댓글 ID
   * @format int64
   * @example 1
   */
  commentId?: number;
  /**
   * 프로젝트 ID
   * @format int64
   * @example 1
   */
  projectId?: number;
  /**
   * 프로젝트 제목
   * @example "프로젝트 제목 예시"
   */
  projectTitle?: string;
  /**
   * 댓글 내용
   * @example "프로젝트의 댓글 예시"
   */
  content?: string;
  /**
   * 댓글 생성일시
   * @format date-time
   * @example "2023-09-15T12:00:00"
   */
  createdAt?: string;
}

/** 내 댓글 목록 조회 응답 */
export interface MyCommentFetchResponse {
  /** 내 댓글 목록 */
  myComments?: MyCommentInfo[];
  /**
   * 다음 페이지 존재 여부
   * @example true
   */
  hasNext?: boolean;
  /** 다음 페이지 커서 정보 */
  nextCursor?: CursorRequest;
}
