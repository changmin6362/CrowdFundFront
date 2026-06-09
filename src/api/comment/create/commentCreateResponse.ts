import { CommentInfo } from "../types";

/** 프로젝트 댓글 작성 응답 */
export interface CommentCreateResponse {
  /** 생성된 댓글 정보 */
  createdComment?: CommentInfo;
}
