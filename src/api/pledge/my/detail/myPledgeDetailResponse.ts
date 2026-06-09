import { FulfillmentStatus, PledgeStatus } from "../../types";
import { PaymentMethod } from "@api/payment/types";

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
