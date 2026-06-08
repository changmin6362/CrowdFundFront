import { FulfillmentStatus, PledgeStatus } from "../types";
import { CursorRequest } from "@api/_common/types";

/** 관리자용 후원 목록 조회 응답 */
export interface AdminPledgesFetchResponse {
  pledges: PledgeSummary[];
  hasNext: boolean;
  nextCursor: CursorRequest;
}

export interface PledgeSummary {
  pledgeId: number;
  userId: number;
  userName: string;
  projectId: number;
  projectTitle: string;
  rewardId: number;
  amount: number;
  status: PledgeStatus;
  fulfillmentStatus: FulfillmentStatus;
  createdAt: string;
}

/** 관리자용 후원 상세 조회 응답 */
export interface AdminPledgeDetailResponse {
  adminPledgeDetail: AdminPledgeDetail;
}

export interface AdminPledgeDetail {
  pledgeId: number;
  createdAt: string;
  status: PledgeStatus;
  fulfillmentStatus: FulfillmentStatus;
  user: AdminUserDetail;
  payment: AdminPaymentDetail;
  project: AdminProjectDetail;
}

export interface AdminUserDetail {
  userId: number;
  name: string;
  nickname: string;
  email: string;
  phone: string;
}

export interface AdminPaymentDetail {
  amount: number;
  paymentMethod: string;
}

export interface AdminProjectDetail {
  projectId: number;
  projectTitle: string;
}
