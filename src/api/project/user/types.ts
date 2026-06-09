import { ProjectStatus } from "../types";
import { CursorRequest } from "@api/_common/types";

/** 프로젝트 목록 조회 응답 (페이지네이션) */
export interface UserProjectFetchResponse {
  /** 유저가 참여한 프로젝트 목록 */
  projects?: ProjectElement[];
  /**
   * 다음 페이지 존재 여부
   * @example true
   */
  hasNext?: boolean;
  /** 다음 페이지 커서 정보 */
  nextCursor?: CursorRequest;
}

/** 프로젝트 정보 */
export interface ProjectElement {
  /**
   * 프로젝트 ID
   * @format int64
   * @example 1
   */
  projectId?: number;
  /**
   * 프로젝트 생성자 ID
   * @format int64
   * @example 1
   */
  creatorId?: number;
  /**
   * 프로젝트 카테고리 ID
   * @format int32
   * @example 1
   */
  categoryId?: number;
  /**
   * 프로젝트 제목
   * @example "프로젝트 제목 예시"
   */
  title?: string;
  /**
   * 프로젝트 목표 금액
   * @example 1000000
   */
  goalAmount?: number;
  /**
   * 프로젝트 현재 금액
   * @example 500000
   */
  currentAmount?: number;
  /**
   * 프로젝트 종료 시간
   * @format date-time
   * @example "2023-12-31T23:59:59"
   */
  endAt?: string;
  /** 프로젝트 상태 */
  status?: ProjectStatus;
  /**
   * 프로젝트 생성 시간
   * @format date-time
   * @example "2023-08-01T12:00:00"
   */
  createdAt?: string;
}

/** 프로젝트 상세 조회 응답 */
export interface UserProjectDetailResponse {
  /** 프로젝트 상세 정보 */
  projectDetail?: ProjectDetail;
}

/** 프로젝트 상세 정보 */
export interface ProjectDetail {
  /**
   * 프로젝트 ID
   * @format int64
   * @example 1
   */
  projectId?: number;
  /**
   * 카테고리 이름
   * @example "디자인"
   */
  categoryName?: string;
  /**
   * 프로젝트 생성자 닉네임
   * @example "김공자"
   */
  creatorNickname?: string;
  /**
   * 프로젝트 제목
   * @example "프로젝트 제목 예시"
   */
  title?: string;
  /**
   * 프로젝트 내용
   * @example "프로젝트 내용 예시"
   */
  contentBlocks?: object;
  /**
   * 목표 금액
   * @example 1000000
   */
  goalAmount?: number;
  /**
   * 현재 금액
   * @example 500000
   */
  currentAmount?: number;
  /**
   * 마감 일시
   * @format date-time
   * @example "2023-08-01T12:00:00"
   */
  endAt?: string;
  /** 프로젝트 상태 */
  status?: ProjectStatus;
  /** 리워드 정보 목록 */
  rewards?: RewardInfo[];
}

/** 리워드 정보 */
export interface RewardInfo {
  /**
   * 리워드 ID
   * @format int64
   * @example 1
   */
  rewardId?: number;
  /**
   * 프로젝트 ID
   * @format int64
   * @example 1
   */
  projectId?: number;
  /**
   * 리워드 제목
   * @example "리워드 제목 예시"
   */
  title?: string;
  /**
   * 리워드 설명
   * @example "리워드 설명 예시"
   */
  description?: string;
  /**
   * 리워드 가격
   * @example 10000
   */
  price?: number;
  /**
   * 리워드 재고
   * @format int32
   * @example 10
   */
  stock?: number;
  /**
   * 리워드 생성일시
   * @format date-time
   * @example "2023-08-01T12:00:00"
   */
  createdAt?: string;
}