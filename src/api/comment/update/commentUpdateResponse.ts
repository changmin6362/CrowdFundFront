import { CommentInfo } from "../types";

/** 댓글 수정 응답 */
export interface CommentUpdateResponse {
  /** 수정된 댓글 정보 */
  patchedComment?: CommentInfo;
}
