import { FulfillmentStatus, PledgeStatus } from "../../types";
import { CursorRequest } from "@api/_common/types";

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
