import { ProjectInfo } from "@api/project/types";

/** 내 프로젝트 목록 조회 응답 */
export interface ProjectMyFetchResponse {
  /** 프로젝트 목록 */
  projects?: ProjectInfo[];
}

