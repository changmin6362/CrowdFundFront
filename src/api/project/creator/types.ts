import { ProjectStatus } from "../types";

/** 프로젝트 생성 요청 */
export interface CreatorProjectCreateRequest {
  /**
   * 프로젝트 카테고리 ID
   * @format int32
   * @example 1
   */
  categoryId: number;
  /**
   * 프로젝트 제목
   * @example "프로젝트 제목 예시"
   */
  title: string;
  /**
   * 프로젝트 본문 콘텐츠 블록 데이터 (JSON)
   * @example {"time":1717200000000,"blocks":[{"id":"b1","type":"header","data":{"text":"프로젝트 소개","level":2}},{"id":"b2","type":"paragraph","data":{"text":"친환경 소재로 만든 방수 미니멀 백팩입니다. 일상과 여행 모두에 완벽하게 어울립니다."}},{"id":"b3","type":"image","data":{"url":"https://crowdfund.com","caption":"백팩 착용 정면 사진"}}],"version":"2.28.2"}
   */
  contentBlocks: object;
  /**
   * 목표 금액
   * @example 1000000
   */
  goalAmount: number;
  /**
   * 프로젝트 종료일
   * @format date-time
   * @example "2024-01-01T00:00:00"
   */
  endAt: string;
}

/** 프로젝트 생성 응답 */
export interface CreatorProjectCreateResponse {
  /**
   * 생성된 프로젝트 ID
   * @format int64
   * @example 1
   */
  createdProjectId?: number;
}

/** 프로젝트 제목과 본문 수정 요청 */
export interface CreatorProjectUpdateRequest {
  /**
   * 프로젝트 제목
   * @example "프로젝트 제목 예시"
   */
  title: string;
  /**
   * 프로젝트 콘텐트 블럭 데이터
   * @example {"time":1717200000000,"blocks":[{"id":"b1","type":"header","data":{"text":"프로젝트 소개","level":2}},{"id":"b2","type":"paragraph","data":{"text":"친환경 소재로 만든 방수 미니멀 백팩입니다. 일상과 여행 모두에 완벽하게 어울립니다."}},{"id":"b3","type":"image","data":{"url":"https://crowdfund.com","caption":"백팩 착용 정면 사진"}}],"version":"2.28.2"}
   */
  contentBlocks: object;
}

/** 내 프로젝트 목록 조회 응답 */
export interface CreatorProjectsFetchResponse {
  /** 프로젝트 목록 */
  projects?: ProjectInfo[];
}

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

/** 후원자들의 배송지 목록 조회 응답 */
export interface CreatorShippingInfosExtractResponse {
  /** 배송 정보 목록 */
  shippingInfos?: ShippingInfo[];
}

/** 후원자 배송지 정보 */
export interface ShippingInfo {
  /**
   * 배송지 ID
   * @format int64
   * @example 1
   */
  addressId?: number;
  /**
   * 유저 ID
   * @format int64
   * @example 1
   */
  userId?: number;
  /**
   * 수령인 이름
   * @example "김공자"
   */
  recipientName?: string;
  /**
   * 수령인 전화번호
   * @example "010-1234-5678"
   */
  phone?: string;
  /**
   * 우편번호
   * @example 12345
   */
  postalCode?: string;
  /**
   * 주소(본번)
   * @example "서울시 중구"
   */
  addressMain?: string;
  /**
   * 주소(상세)
   * @example "서울시 중구 서소문로 123"
   */
  addressDetail?: string;
}