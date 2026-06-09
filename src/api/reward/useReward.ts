import { ApiResult } from "@api/_common/types";
import { useApiHandler } from "@api/_common/useApiHandler";
import { REWARD_ENDPOINTS } from "@api/reward/constants";
import { UserRewardsFetchResponse } from "@api/reward/user/types";
import {
  CreatorRewardCreateRequest,
  CreatorRewardCreateResponse,
  CreatorRewardDeleteResponse,
  CreatorRewardUpdateRequest,
  CreatorRewardUpdateResponse,
  CreatorRewardUpdateStockRequest
} from "@api/reward/creator/types";

export const useReward = () => {
  const { isLoading, error, handleApiCall } = useApiHandler();

  /**
   * [User] 프로젝트 리워드 목록 조회
   */
  const fetchRewards = async (projectId: number): Promise<ApiResult<UserRewardsFetchResponse>> => {
    return handleApiCall<UserRewardsFetchResponse>({
      url: REWARD_ENDPOINTS.USER.FETCH(projectId),
      method: 'GET',
    });
  };

  /**
   * [Creator] 프로젝트에 리워드 등록
   */
  const createReward = async (
    projectId: number,
    data: CreatorRewardCreateRequest
  ): Promise<ApiResult<CreatorRewardCreateResponse>> => {
    return handleApiCall<CreatorRewardCreateResponse>({
      url: REWARD_ENDPOINTS.CREATOR.CREATE(projectId),
      method: 'POST',
      data,
    });
  };

  /**
   * [Creator] 리워드 정보 수정
   */
  const updateReward = async (
    rewardId: number,
    data: CreatorRewardUpdateRequest
  ): Promise<ApiResult<CreatorRewardUpdateResponse>> => {
    return handleApiCall<CreatorRewardUpdateResponse>({
      url: REWARD_ENDPOINTS.CREATOR.UPDATE(rewardId),
      method: 'PATCH',
      data,
    });
  };

  /**
   * [Creator] 리워드 재고 수정
   */
  const updateRewardStock = async (
    rewardId: number,
    data: CreatorRewardUpdateStockRequest
  ): Promise<ApiResult<CreatorRewardUpdateResponse>> => {
    return handleApiCall<CreatorRewardUpdateResponse>({
      url: REWARD_ENDPOINTS.CREATOR.UPDATE_STOCK(rewardId),
      method: 'PATCH',
      data,
    });
  };

  /**
   * [Creator] 리워드 삭제
   */
  const deleteReward = async (
    rewardId: number
  ): Promise<ApiResult<CreatorRewardDeleteResponse>> => {
    return handleApiCall<CreatorRewardDeleteResponse>({
      url: REWARD_ENDPOINTS.CREATOR.DELETE(rewardId),
      method: 'DELETE',
    });
  };

  return {
    fetchRewards,
    createReward,
    updateReward,
    updateRewardStock,
    deleteReward,
    isLoading,
    error,
  };
};
