/** 리워드 생성 요청 */
export interface CreatorRewardCreateRequest {
  title: string;
  description: string;
  price: number;
  stock: number;
}

/** 리워드 생성 응답 */
export interface CreatorRewardCreateResponse {
  createdReward: RewardInfo;
}

/** 리워드 정보 수정 요청 */
export interface CreatorRewardUpdateRequest {
  title: string;
  description: string;
  price: number;
}

/** 리워드 재고 수정 요청 */
export interface CreatorRewardUpdateStockRequest {
  stock: number;
}

/** 리워드 수정(정보/재고) 응답 */
export interface CreatorRewardUpdateResponse {
  updatedReward: RewardInfo;
}

/** 리워드 삭제 응답 */
export interface CreatorRewardDeleteResponse {
  deletedRewardId: number;
}

/** 리워드 기본 정보 (창작자용) */
export interface RewardInfo {
  rewardId: number;
  projectId: number;
  title: string;
  description: string;
  price: number;
  stock: number;
  createdAt: string; // ISO Date String
}