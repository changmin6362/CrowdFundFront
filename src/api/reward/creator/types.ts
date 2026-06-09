/** 리워드 생성 요청 */
export interface CreatorRewardCreateRequest {
  /**
   * 리워드 제목
   * @example "1단계 후원 보상"
   */
  title: string;
  /**
   * 보상 설명
   * @example "프로젝트의 1단계 후원 보상입니다."
   */
  description: string;
  /**
   * 리워드 가격
   * @min 1
   * @example 10000
   */
  price: number;
  /**
   * 재고 수량
   * @format int32
   * @min 1
   * @example 10
   */
  stock: number;
}

/** 리워드 생성 응답 */
export interface CreatorRewardCreateResponse {
  /** 생성된 리워드 정보 */
  createdReward?: RewardInfo;
}

/** 리워드 정보 수정 요청 */
export interface CreatorRewardUpdateRequest {
  /**
   * 리워드 제목
   * @example "리워드 제목 예시"
   */
  title: string;
  /**
   * 리워드 내용
   * @example "리워드 내용 예시"
   */
  description: string;
  /**
   * 리워드 가격
   * @min 0
   * @example 10000
   */
  price: number;
}

/** 리워드 재고 수정 요청 */
export interface CreatorRewardUpdateStockRequest {
  /**
   * 리워드 재고
   * @format int32
   * @min 1
   * @example 10
   */
  stock: number;
}

/** 리워드 수정(정보/재고) 응답 */
export interface CreatorRewardUpdateResponse {
  /** 수정된 리워드 정보 */
  updatedReward?: RewardInfo;
}

/** 리워드 삭제 응답 */
export interface CreatorRewardDeleteResponse {
  /**
   * 삭제된 리워드 ID
   * @format int64
   * @example 1
   */
  deletedRewardId?: number;
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