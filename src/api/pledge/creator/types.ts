import { FulfillmentStatus } from "../types";

/** 보상 이행 상태 변경 요청 */
export interface CreatorPledgeFulfillRequest {
  /**
   * 보상 이행 상태
   * @example "FULFILLED"
   */
  fulfillmentStatus: FulfillmentStatus;
}

/** 보상 이행 상태 변경 응답 */
export interface CreatorPledgeFulfillResponse {
  /** 변경된 보상 이행 상태 정보 */
  fulfillment?: FulfillmentInfo;
}

/** 보상 이행 정보 */
export interface FulfillmentInfo {
  /**
   * 보상 ID
   * @format int64
   * @example 1
   */
  pledgeId?: number;
  /** 보상 이행 상태 */
  fulfillmentStatus: FulfillmentStatus;
  /**
   * 보상 이행 일시
   * @format date-time
   * @example "2023-09-20T12:34:56"
   */
  fulfilledAt?: string;
}