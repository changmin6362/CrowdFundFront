/** 리워드 정보 (사용자용) */
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
