/** 프로젝트 후원하기 요청 */
export interface MyPledgeCreateRequest {
  /**
   * 프로젝트 ID
   * @format int64
   * @example 2
   */
  projectId: number;
  /**
   * 리워드 ID
   * @format int64
   * @example 1
   */
  rewardId: number;
}

/** 프로젝트 후원하기 응답 */
export interface MyPledgeCreateResponse {
  /**
   * 후원 ID
   * @format int64
   * @example 1
   */
  pledgeId?: number;
}
