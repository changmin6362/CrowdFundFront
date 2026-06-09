import { ApiResult, CursorRequest } from "@api/_common/types";
import { useApiHandler } from "@api/_common/useApiHandler";
import { PLEDGE_ENDPOINTS } from "@api/pledge/constants";
import {
  MyPledgeCreateRequest,
  MyPledgeCreateResponse,
  MyPledgeDetailResponse,
  MyPledgesDeleteResponse,
  MyPledgesFetchResponse
} from "@api/pledge/my/types";
import {
  CreatorPledgeFulfillRequest,
  CreatorPledgeFulfillResponse
} from "@api/pledge/creator/types";
import {
  AdminPledgeDetailResponse,
  AdminPledgesFetchResponse
} from "@api/pledge/admin/types";
import { FulfillmentStatus, PledgeStatus } from "@api/pledge/types";

export const usePledge = () => {
  const { isLoading, error, handleApiCall } = useApiHandler();

  /**
   * [My] 내가 후원한 프로젝트 목록 조회
   */
  const fetchMyPledges = async (
    query?: CursorRequest & {
      fulfillmentStatus?: FulfillmentStatus;
      pledgeStatus?: PledgeStatus;
      limit?: number;
    }
  ): Promise<ApiResult<MyPledgesFetchResponse>> => {
    return handleApiCall<MyPledgesFetchResponse>({
      url: PLEDGE_ENDPOINTS.MY.FETCH,
      method: 'GET',
      params: query,
    });
  };

  /**
   * [My] 프로젝트 후원하기
   */
  const createPledge = async (
    data: MyPledgeCreateRequest
  ): Promise<ApiResult<MyPledgeCreateResponse>> => {
    return handleApiCall<MyPledgeCreateResponse>({
      url: PLEDGE_ENDPOINTS.MY.CREATE,
      method: 'POST',
      data,
    });
  };

  /**
   * [My] 후원 상세 조회
   */
  const fetchMyPledgeDetail = async (
    pledgeId: number
  ): Promise<ApiResult<MyPledgeDetailResponse>> => {
    return handleApiCall<MyPledgeDetailResponse>({
      url: PLEDGE_ENDPOINTS.MY.DETAIL(pledgeId),
      method: 'GET',
    });
  };

  /**
   * [My] 후원 취소
   */
  const cancelPledge = async (
    pledgeId: number
  ): Promise<ApiResult<MyPledgesDeleteResponse>> => {
    return handleApiCall<MyPledgesDeleteResponse>({
      url: PLEDGE_ENDPOINTS.MY.CANCEL(pledgeId),
      method: 'DELETE',
    });
  };

  /**
   * [Creator] 보상 이행 상태 변경
   */
  const fulfillPledge = async (
    pledgeId: number,
    data: CreatorPledgeFulfillRequest
  ): Promise<ApiResult<CreatorPledgeFulfillResponse>> => {
    return handleApiCall<CreatorPledgeFulfillResponse>({
      url: PLEDGE_ENDPOINTS.CREATOR.FULFILL(pledgeId),
      method: 'PATCH',
      data,
    });
  };

  /**
   * [Admin] 전체 후원 목록 조회
   */
  const fetchAdminPledges = async (
    query?: CursorRequest & {
      fulfillmentStatus?: FulfillmentStatus;
      pledgeStatus?: PledgeStatus;
      limit?: number;
    }
  ): Promise<ApiResult<AdminPledgesFetchResponse>> => {
    return handleApiCall<AdminPledgesFetchResponse>({
      url: PLEDGE_ENDPOINTS.ADMIN.FETCH,
      method: 'GET',
      params: query,
    });
  };

  /**
   * [Admin] 후원 상세 조회
   */
  const fetchAdminPledgeDetail = async (
    pledgeId: number
  ): Promise<ApiResult<AdminPledgeDetailResponse>> => {
    return handleApiCall<AdminPledgeDetailResponse>({
      url: PLEDGE_ENDPOINTS.ADMIN.DETAIL(pledgeId),
      method: 'GET',
    });
  };

  return {
    fetchMyPledges,
    createPledge,
    fetchMyPledgeDetail,
    cancelPledge,
    fulfillPledge,
    fetchAdminPledges,
    fetchAdminPledgeDetail,
    isLoading,
    error,
  };
};
