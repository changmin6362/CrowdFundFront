import { RewardInfo } from "@api/reward/types";

/** 리워드 수정(정보/재고) 응답 */
export interface RewardUpdateStockResponse {
  /** 수정된 리워드 정보 */
  updatedReward?: RewardInfo;
}
