import { FulfillmentStatus, PledgeStatus } from "../../types";
import { CursorRequest } from "@api/_common/types";

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
