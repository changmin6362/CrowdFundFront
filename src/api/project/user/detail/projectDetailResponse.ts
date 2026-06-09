import { ProjectStatus } from "@api/project/types";

/** 프로젝트 상세 조회 응답 */
export interface ProjectDetailResponse {
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
