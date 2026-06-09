import { ApiResult, CursorRequest } from "@api/_common/types";
import { useApiHandler } from "@api/_common/useApiHandler";
import { PROJECT_ENDPOINTS } from "@api/project/constants";
import { ProjectStatus } from "@api/project/types";
import {
  CreatorProjectCreateRequest,
  CreatorProjectCreateResponse,
  CreatorProjectUpdateRequest,
  CreatorProjectsFetchResponse,
  CreatorShippingInfosExtractResponse
} from "@api/project/creator/types";
import {
  UserProjectDetailResponse,
  UserProjectFetchResponse
} from "@api/project/user/types";

export const useProject = () => {
  const { isLoading, error, handleApiCall } = useApiHandler();

  /**
   * [User] 프로젝트 목록 조회 (커서 기반 페이지네이션)
   */
  const fetchProjects = async (
    query?: CursorRequest & {
      statuses?: ProjectStatus[];
      categoryId?: number;
      limit?: number;
    }
  ): Promise<ApiResult<UserProjectFetchResponse>> => {
    return handleApiCall<UserProjectFetchResponse>({
      url: PROJECT_ENDPOINTS.USER.FETCH,
      method: 'GET',
      params: query,
    });
  };

  /**
   * [User] 프로젝트 상세 조회
   */
  const fetchProjectDetail = async (projectId: number): Promise<ApiResult<UserProjectDetailResponse>> => {
    return handleApiCall<UserProjectDetailResponse>({
      url: PROJECT_ENDPOINTS.USER.DETAIL(projectId),
      method: 'GET',
    });
  };

  /**
   * [Creator] 프로젝트 생성
   */
  const createProject = async (data: CreatorProjectCreateRequest): Promise<ApiResult<CreatorProjectCreateResponse>> => {
    return handleApiCall<CreatorProjectCreateResponse>({
      url: PROJECT_ENDPOINTS.CREATOR.CREATE,
      method: 'POST',
      data,
    });
  };

  /**
   * [Creator] 프로젝트 제목과 본문 수정
   */
  const updateProject = async (projectId: number, data: CreatorProjectUpdateRequest): Promise<ApiResult> => {
    return handleApiCall<void>({
      url: PROJECT_ENDPOINTS.CREATOR.UPDATE(projectId),
      method: 'PATCH',
      data,
    });
  };

  /**
   * [Creator] 프로젝트 삭제
   */
  const deleteProject = async (projectId: number): Promise<ApiResult> => {
    return handleApiCall<void>({
      url: PROJECT_ENDPOINTS.CREATOR.DELETE(projectId),
      method: 'DELETE',
    });
  };

  /**
   * [Creator] 프로젝트 취소
   */
  const cancelProject = async (projectId: number): Promise<ApiResult> => {
    return handleApiCall<void>({
      url: PROJECT_ENDPOINTS.CREATOR.CANCEL(projectId),
      method: 'PATCH',
    });
  };

  /**
   * [Creator] 내 프로젝트 조회
   */
  const fetchMyProjects = async (): Promise<ApiResult<CreatorProjectsFetchResponse>> => {
    return handleApiCall<CreatorProjectsFetchResponse>({
      url: PROJECT_ENDPOINTS.CREATOR.FETCH_ME,
      method: 'GET',
    });
  };

  /**
   * [Creator] 후원자들의 배송지 목록 조회
   */
  const fetchShippingInfos = async (projectId: number): Promise<ApiResult<CreatorShippingInfosExtractResponse>> => {
    return handleApiCall<CreatorShippingInfosExtractResponse>({
      url: PROJECT_ENDPOINTS.CREATOR.SHIPPING_INFOS(projectId),
      method: 'GET',
    });
  };

  return {
    fetchProjects,
    fetchProjectDetail,
    createProject,
    updateProject,
    deleteProject,
    cancelProject,
    fetchMyProjects,
    fetchShippingInfos,
    isLoading,
    error,
  };
};
