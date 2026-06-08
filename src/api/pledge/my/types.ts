import { FulfillmentStatus, PledgeStatus } from "../types";
import { CursorRequest } from "@api/_common/types";

/** 프로젝트 후원하기 요청 */
export interface MyPledgeCreateRequest {
  /** 프로젝트 ID */
  projectId: number;
  /** 보상 ID */
  rewardId: number;
}

/** 프로젝트 후원하기 응답 */
export interface MyPledgeCreateResponse {
  /** 후원 ID */
  pledgeId: number;
}

/** 내 후원 상세 조회 응답 */
export interface MyPledgeDetailResponse {
  /** 후원 상세 정보 */
  myPledgeDetail: MyPledgeDetail;
}

export interface MyPledgeDetail {
  /** 후원 ID */
  pledgeId: number;
  /** 후원 일시 */
  createdAt: string;
  /** 후원 상태 */
  status: PledgeStatus;
  /** 보상 이행 상태 */
  fulfillmentStatus: FulfillmentStatus;
  /** 프로젝트 제목 */
  projectTitle: string;
  /** 후원 금액 */
  amount: number;
  /** 결제 수단 */
  paymentMethod: string;
  /** 보상명 */
  rewardName: string;
  /** 후원의 배송 주소 정보 */
  shippingAddress: ShippingAddress;
}

export interface ShippingAddress {
  /** 후원의 배송 주소 ID */
  pledgeAddressId: number;
  /** 수령인 이름 */
  recipientName: string;
  /** 수령인 전화번호 */
  recipientPhone: string;
  /** 기본 주소 */
  addressMain: string;
  /** 상세 주소 */
  addressDetail: string;
  /** 우편 번호 */
  postalCode: string;
  /** 생성 일시 */
  createdAt: string;
  /** 수정 일시 */
  updatedAt: string;
}

/** 후원 취소 응답 */
export interface MyPledgesDeleteResponse {
  deletedPledgeId: number;
}

/** 내가 후원한 프로젝트 목록 조회 응답 */
export interface MyPledgesFetchResponse {
  /** 내가 후원한 프로젝트 목록 */
  pledges: MyPledgeInfo[];
  /** 다음 페이지 존재 여부 */
  hasNext: boolean;
  /** 다음 페이지 조회를 위한 커서 정보 */
  nextCursor: CursorRequest;
}

export interface MyPledgeInfo {
  /** 후원 ID */
  pledgeId: number;
  /** 프로젝트 ID */
  projectId: number;
  /** 프로젝트 제목 */
  projectTitle: string;
  /** 보상 ID */
  rewardId: number;
  /** 보상명 */
  rewardTitle: string;
  /** 후원 금액 */
  amount: number;
  /** 후원 상태 */
  status: PledgeStatus;
  /** 보상 이행 상태 */
  fulfillmentStatus: FulfillmentStatus;
  /** 후원 일시 */
  pledgedAt: string;
}