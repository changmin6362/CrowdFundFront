import { ProjectStatus } from "../types";
import { CursorRequest } from "@api/_common/types";

/** 프로젝트 목록 조회 응답 (페이지네이션) */
export interface UserProjectFetchResponse {
  projects: ProjectElement[];
  hasNext: boolean;
  nextCursor: CursorRequest;
}

export interface ProjectElement {
  projectId: number;
  creatorId: number;
  categoryId: number;
  title: string;
  goalAmount: number;
  currentAmount: number;
  endAt: string;
  status: ProjectStatus;
  createdAt: string;
}

/** 프로젝트 상세 조회 응답 */
export interface UserProjectDetailResponse {
  projectDetail: ProjectDetail;
}

export interface ProjectDetail {
  projectId: number;
  categoryName: string;
  creatorNickname: string;
  title: string;
  /** JSON String (Editor.js) */
  contentBlocks: string;
  goalAmount: number;
  currentAmount: number;
  endAt: string;
  status: ProjectStatus;
  rewards: RewardInfo[];
}

export interface RewardInfo {
  rewardId: number;
  projectId: number;
  title: string;
  description: string;
  price: number;
  stock: number;
  createdAt: string;
}