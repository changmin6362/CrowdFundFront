/** 프로젝트의 리워드 목록 조회 응답 */
export interface UserRewardsFetchResponse {
  rewards: RewardFetchInfo[];
}

/** 리워드 조회 정보 (사용자용) */
export interface RewardFetchInfo {
  rewardId: number;
  projectId: number;
  title: string;
  description: string;
  price: number;
  stock: number;
  createdAt: string; // ISO Date String
}