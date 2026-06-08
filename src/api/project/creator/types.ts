import { ProjectStatus } from "../types";

/** 프로젝트 생성 요청 */
export interface CreatorProjectCreateRequest {
  categoryId: number;
  title: string;
  /** Editor.js 포맷의 JSON 객체 */
  contentBlocks: any;
  goalAmount: number;
  endAt: string; // ISO Date String
}

/** 프로젝트 생성 응답 */
export interface CreatorProjectCreateResponse {
  createdProjectId: number;
}

/** 프로젝트 제목과 본문 수정 요청 */
export interface CreatorProjectUpdateRequest {
  title: string;
  contentBlocks: any;
}

/** 내 프로젝트 목록 조회 응답 */
export interface CreatorProjectsFetchResponse {
  projects: CreatorProjectInfo[];
}

export interface CreatorProjectInfo {
  projectId: number;
  title: string;
  goalAmount: number;
  currentAmount: number;
  endAt: string;
  status: ProjectStatus;
}

/** 후원자들의 배송지 목록 조회 응답 */
export interface CreatorShippingInfosExtractResponse {
  shippingInfos: ShippingInfo[];
}

export interface ShippingInfo {
  addressId: number;
  userId: number;
  recipientName: string;
  phone: string;
  postalCode: string;
  addressMain: string;
  addressDetail: string;
}