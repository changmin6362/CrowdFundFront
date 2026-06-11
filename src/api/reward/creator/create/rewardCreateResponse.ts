import { RewardInfo } from "@api/reward/types";

/** 리워드 생성 응답 */
export interface RewardCreateResponse {
  /** 생성된 리워드 정보 */
  createdReward?: RewardInfo;
}
