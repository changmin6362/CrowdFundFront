import { FulfillmentStatus, PledgeStatus } from "../types";
import { CursorRequest } from "@api/_common/types";
import { PaymentMethod } from "@api/payment/types";

/** 관리자용 후원 목록 조회 응답 */
export interface AdminPledgesFetchResponse {
  /** 후원 요약 목록 */
  pledges?: PledgeSummary[];
  /**
   * 다음 페이지 존재 여부
   * @example true
   */
  hasNext?: boolean;
  /** 다음 페이지 커서 정보 */
  nextCursor?: CursorRequest;
}

/** 후원 요약 */
export interface PledgeSummary {
  /**
   * 후원 ID
   * @format int64
   * @example 1
   */
  pledgeId?: number;
  /**
   * 후원한 사용자 ID
   * @format int64
   * @example 1
   */
  userId?: number;
  /**
   * 후원한 사용자 명
   * @example "김공자"
   */
  userName?: string;
  /**
   * 프로젝트 ID
   * @format int64
   * @example 1
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
   * 후원 금액
   * @example 35000
   */
  amount?: number;
  /** 후원 상태 */
  status?: PledgeStatus;
  /** 보상 이행 상태 */
  fulfillmentStatus?: FulfillmentStatus;
  /**
   * 생성 일시
   * @example "2023-08-01T12:00:00"
   */
  createdAt?: string;
}

/** 관리자용 후원 상세 조회 응답 */
export interface AdminPledgeDetailResponse {
  /** 관리자용 후원 상세 정보 */
  adminPledgeDetail?: AdminPledgeDetail;
}

/** 후원 상세 */
export interface AdminPledgeDetail {
  /**
   * 후원 ID
   * @format int64
   * @example 1
   */
  pledgeId?: number;
  /**
   * 생성 일시
   * @example "2023-08-01T12:00:00"
   */
  createdAt?: string;
  /** 후원 상태 */
  status?: PledgeStatus;
  /** 보상 이행 상태 */
  fulfillmentStatus?: FulfillmentStatus;
  /** 사용자 상세 정보 */
  user?: AdminUserDetail;
  /** 결제 상세 정보 */
  payment?: AdminPaymentDetail;
  /** 프로젝트 상세 정보 */
  project?: AdminProjectDetail;
}

/** 사용자 상세 */
export interface AdminUserDetail {
  /**
   * 유저 ID
   * @format int64
   * @example 1
   */
  userId?: number;
  /**
   * 유저 이름
   * @example "김공자"
   */
  name?: string;
  /**
   * 유저 닉네임
   * @example "닉네임 예시"
   */
  nickname?: string;
  /**
   * 유저 이메일
   * @example "example@example.com"
   */
  email?: string;
  /**
   * 유저 전화번호
   * @example "010-1234-5678"
   */
  phone?: string;
}
/** 결제 상세 */
export interface AdminPaymentDetail {
  /**
   * 후원 금액
   * @example 10000
   */
  amount?: number;
  /**
   * 결제 방법
   * @example "카드"
   */
  paymentMethod?: PaymentMethod;
}

/** 프로젝트 상세 */
export interface AdminProjectDetail {
  /**
   * 프로젝트 ID
   * @format int64
   * @example 1
   */
  projectId?: number;
  /**
   * 프로젝트 제목
   * @example "프로젝트 제목 예시"
   */
  projectTitle?: string;
}
