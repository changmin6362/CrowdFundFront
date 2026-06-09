/** 프로젝트의 리워드 목록 조회 응답 */
export interface UserRewardsFetchResponse {
  /** 리워드 목록 */
  rewards?: RewardFetchInfo[];
}

/** 리워드 조회 정보 (사용자용) */
export interface RewardFetchInfo {
  /**
   * 리워드 ID
   * @format int64
   * @example 1
   */
  rewardId?: number;
  /**
   * 프로젝트 ID
   * @format int64
   * @example 1
   */
  projectId?: number;
  /**
   * 리워드 제목
   * @example "리워드 제목 예시"
   */
  title?: string;
  /**
   * 리워드 설명
   * @example "리워드 설명 예시"
   */
  description?: string;
  /**
   * 리워드 가격
   * @example 10000
   */
  price?: number;
  /**
   * 리워드 재고
   * @format int32
   * @example 10
   */
  stock?: number;
  /**
   * 리워드 생성일시
   * @format date-time
   * @example "2023-08-01T12:00:00"
   */
  createdAt?: string;
}