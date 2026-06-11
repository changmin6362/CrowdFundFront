import { RewardFetchInfo } from "@api/reward/types";

/** 프로젝트의 리워드 목록 조회 응답 */
export interface RewardFetchResponse {
  /** 리워드 목록 */
  rewards?: RewardFetchInfo[];
}
