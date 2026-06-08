import { FulfillmentStatus, PledgeStatus } from "../types";
import { CursorRequest } from "@api/_common/types";

/** 관리자용 후원 목록 조회 응답 */
export interface AdminPledgesFetchResponse {
  /** 후원 목록 */
  pledges: PledgeSummary[];
  /** 다음 페이지 존재 여부 */
  hasNext: boolean;
  /** 다음 페이지 커서 정보 */
  nextCursor: CursorRequest;
}

export interface PledgeSummary {
  /** 후원 ID */
  pledgeId: number;
  /** 후원한 사용자 ID */
  userId: number;
  /** 후원한 사용자명 */
  userName: string;
  /** 프로젝트 ID */
  projectId: number;
  /** 프로젝트 제목 */
  projectTitle: string;
  /** 보상 ID */
  rewardId: number;
  /** 후원 금액 */
  amount: number;
  /** 후원 상태 */
  status: PledgeStatus;
  /** 보상 이행 상태 */
  fulfillmentStatus: FulfillmentStatus;
  /** 생성 일시 */
  createdAt: string;
}

/** 관리자용 후원 상세 조회 응답 */
export interface AdminPledgeDetailResponse {
  /** 후원 상세 정보 */
  adminPledgeDetail: AdminPledgeDetail;
}

export interface AdminPledgeDetail {
  /** 후원 ID */
  pledgeId: number;
  /** 생성 일시 */
  createdAt: string;
  /** 후원 상태 */
  status: PledgeStatus;
  /** 보상 이행 상태 */
  fulfillmentStatus: FulfillmentStatus;
  /** 사용자 상세 정보 */
  user: AdminUserDetail;
  /** 결제 상세 정보 */
  payment: AdminPaymentDetail;
  /** 프로젝트 상세 정보 */
  project: AdminProjectDetail;
}

export interface AdminUserDetail {
  /** 사용자 ID */
  userId: number;
  /** 사용자명 */
  name: string;
  /** 사용자 닉네임 */
  nickname: string;
  /** 사용자 이메일 */
  email: string;
  /** 사용자 전화번호 */
  phone: string;
}

export interface AdminPaymentDetail {
  /** 결제 금액 */
  amount: number;
  /** 결제 수단 */
  paymentMethod: string;
}

export interface AdminProjectDetail {
  /** 프로젝트 ID */
  projectId: number;
  /** 프로젝트명 */
  projectTitle: string;
}
