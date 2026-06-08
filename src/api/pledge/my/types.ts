import { FulfillmentStatus, PledgeStatus } from "../types";
import { CursorRequest } from "@api/_common/types";

/** 프로젝트 후원하기 요청 */
export interface MyPledgeCreateRequest {
  projectId: number;
  rewardId: number;
}

/** 프로젝트 후원하기 응답 */
export interface MyPledgeCreateResponse {
  pledgeId: number;
}

/** 내 후원 목록 조회 응답 */
export interface MyPledgesFetchResponse {
  pledges: MyPledgeInfo[];
  hasNext: boolean;
  nextCursor: CursorRequest;
}

export interface MyPledgeInfo {
  pledgeId: number;
  projectId: number;
  projectTitle: string;
  rewardId: number;
  rewardTitle: string;
  amount: number;
  status: PledgeStatus;
  fulfillmentStatus: FulfillmentStatus;
  pledgedAt: string; // ISO Date String
}

/** 내 후원 상세 조회 응답 */
export interface MyPledgeDetailResponse {
  myPledgeDetail: MyPledgeDetail;
}

export interface MyPledgeDetail {
  pledgeId: number;
  createdAt: string;
  status: PledgeStatus;
  fulfillmentStatus: FulfillmentStatus;
  projectTitle: string;
  amount: number;
  paymentMethod: string;
  rewardName: string;
  rewardPrice: number;
  shippingAddress: ShippingAddress;
}

export interface ShippingAddress {
  // 상세 구조는 프로젝트의 ShippingAddress 클래스 정의에 따름
  receiverName: string;
  receiverPhone: string;
  zipCode: string;
  baseAddress: string;
  detailAddress: string;
}

/** 후원 취소 응답 */
export interface MyPledgesDeleteResponse {
  deletedPledgeId: number;
}