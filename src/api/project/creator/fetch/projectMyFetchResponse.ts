import { ProjectInfo } from "@api/project/types";
import { CursorRequest } from "@api/_common/types";

/** 내 프로젝트 목록 조회 응답 */
export interface ProjectMyFetchResponse {
  /** 프로젝트 목록 */
  projects?: ProjectInfo[];
  /** 다음 페이지 존재 여부 */
  hasNext?: boolean;
  /** 다음 페이지 커서 정보 */
  nextCursor?: CursorRequest;
}

