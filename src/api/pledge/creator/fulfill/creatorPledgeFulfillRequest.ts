import { FulfillmentStatus } from "../../types";

/** 보상 이행 상태 변경 요청 */
export interface CreatorPledgeFulfillRequest {
  /**
   * 보상 이행 상태
   * @example "FULFILLED"
   */
  fulfillmentStatus: FulfillmentStatus;
}
