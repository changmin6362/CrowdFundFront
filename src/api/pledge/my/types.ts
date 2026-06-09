import { FulfillmentStatus, PledgeStatus } from "../types";
import { CursorRequest } from "@api/_common/types";
import { PaymentMethod } from "@api/payment/types";

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

/** 내 후원 상세 조회 응답 */
export interface MyPledgeDetailResponse {
  /** 후원 상세 정보 */
  myPledgeDetail?: MyPledgeDetail;
}

/** 내 후원 상세 */
export interface MyPledgeDetail {
  /**
   * 후원 ID
   * @format int64
   * @example 1
   */
  pledgeId?: number;
  /**
   * 생성 일시
   * @example "2023-09-15T12:00:00"
   */
  createdAt?: string;
  /** 후원 상태 */
  status?: PledgeStatus;
  /** 보상 이행 상태 */
  fulfillmentStatus?: FulfillmentStatus;
  /**
   * 프로젝트 제목
   * @example "새로운 프로젝트"
   */
  projectTitle?: string;
  /**
   * 후원 금액
   * @example 10000
   */
  amount?: number;
  /** 결제 수단 */
  paymentMethod?: PaymentMethod;
  /**
   * 리워드 이름
   * @example "1등급 후원자 상품"
   */
  rewardName?: string;
  /** 후원 배송 주소 정보 */
  shippingAddress?: ShippingAddress;
}

/** 후원 배송 주소 정보 */
export interface ShippingAddress {
  /**
   * 후원의 배송 주소 ID
   * @format int64
   * @example 1
   */
  pledgeAddressId?: number;
  /**
   * 수령인 이름
   * @example "김공자"
   */
  recipientName?: string;
  /**
   * 수령인 전화번호
   * @example "010-1234-5678"
   */
  recipientPhone?: string;
  /**
   * 기본 주소
   * @example "서울시 중구"
   */
  addressMain?: string;
  /**
   * 상세 주소
   * @example "신당동 123-45"
   */
  addressDetail?: string;
  /**
   * 우편 번호
   * @example "06060"
   */
  postalCode?: string;
  /**
   * 생성 일시
   * @example "2023-09-15T12:00:00"
   */
  createdAt?: string;
  /**
   * 수정 일시
   * @example "2023-09-15T12:00:00"
   */
  updatedAt?: string;
}

/** 후원 취소 응답 */
export interface MyPledgesDeleteResponse {
  /**
   * 삭제된 후원 ID
   * @format int64
   * @example 1
   */
  deletedPledgeId?: number;
}

/** 내가 후원한 프로젝트 목록 조회 응답 */
export interface MyPledgesFetchResponse {
  /** 내가 후원한 프로젝트 목록 */
  pledges?: MyPledgeInfo[];
  /**
   * 다음 페이지 존재 여부
   * @example true
   */
  hasNext?: boolean;
  /** 다음 페이지 커서 정보 */
  nextCursor?: CursorRequest;
}

/** 내가 후원한 프로젝트 정보 */
export interface MyPledgeInfo {
  /**
   * 후원 ID
   * @format int64
   * @example 1
   */
  pledgeId?: number;
  /**
   * 프로젝트 ID
   * @format int64
   * @example 2
   */
  projectId?: number;
  /**
   * 프로젝트 제목
   * @example "프로젝트 제목 예시"
   */
  projectTitle?: string;
  /**
   * 보상 ID
   * @format int64
   * @example 1
   */
  rewardId?: number;
  /**
   * 보상명
   * @example "리워드 제목 예시"
   */
  rewardTitle?: string;
  /**
   * 후원 금액
   * @example 35000
   */
  amount?: number;
  /** 후원 상태 */
  status?: PledgeStatus;
  /** 보상 이행 상태 */
  fulfillmentStatus?: FulfillmentStatus;
  /**
   * 후원 일시
   * @format date-time
   * @example "2023-08-01T12:00:00"
   */
  pledgedAt?: string;
}