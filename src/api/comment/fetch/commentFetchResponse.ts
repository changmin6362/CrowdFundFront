import { CommentInfo } from "../types";
import { CursorRequest } from "@api/_common/types";

/** 프로젝트 댓글 목록 조회 응답 */
export interface CommentFetchResponse {
  /** 프로젝트 댓글 목록 */
  comments?: CommentInfo[];
  /**
   * 다음 페이지 존재 여부
   * @example true
   */
  hasNext?: boolean;
  /** 다음 페이지 커서 정보 */
  nextCursor?: CursorRequest;
}
