import { FulfillmentStatus } from "../types";

/** 보상 이행 상태 변경 요청 */
export interface CreatorPledgeFulfillRequest {
  fulfillmentStatus: FulfillmentStatus;
}

/** 보상 이행 상태 변경 응답 */
export interface CreatorPledgeFulfillResponse {
  fulfillment: FulfillmentInfo;
}

export interface FulfillmentInfo {
  pledgeId: number;
  fulfillmentStatus: FulfillmentStatus;
  fulfilledAt: string; // ISO Date String
}