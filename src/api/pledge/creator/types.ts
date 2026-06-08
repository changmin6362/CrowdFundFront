import { FulfillmentStatus } from "../types";

/** 보상 이행 상태 변경 요청 */
export interface CreatorPledgeFulfillRequest {
  /** 변경할 보상 이행 상태 */
  fulfillmentStatus: FulfillmentStatus;
}

/** 보상 이행 상태 변경 응답 */
export interface CreatorPledgeFulfillResponse {
  /** 변경된 보상 이행 정보 */
  fulfillment: FulfillmentInfo;
}

export interface FulfillmentInfo {
  /** 후원 ID */
  pledgeId: number;
  /** 보상 이행 상태 */
  fulfillmentStatus: FulfillmentStatus;
  /** 보상 이행 일시 */
  fulfilledAt: string;
}