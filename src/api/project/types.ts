/** 프로젝트 상태 */
export type ProjectStatus = 'ONGOING' | 'COMPLETED' | 'CANCELED';

/** 내 프로젝트 정보 */
export interface ProjectInfo {
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
  title?: string;
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
   * 마감일
   * @format date-time
   * @example "2023-12-31T23:59:59"
   */
  endAt?: string;
  /** 프로젝트 상태 */
  status?: ProjectStatus;
}