import { useEffect, useState, useCallback } from "react";
import { ApiResult } from "@api/_common/types";
import { useApiHandler } from "@api/_common/useApiHandler";
import { REWARD_ENDPOINTS } from "@api/reward/constants";
import { RewardFetchResponse } from "@api/reward/user/fetch/rewardFetchResponse";

export const useRewardFetch = (projectId: number) => {
  const { isLoading, error, handleApiCall } = useApiHandler();
  const [response, setResponse] = useState<ApiResult<RewardFetchResponse> | null>(null);

  const fetchRewards = useCallback(async (id: number): Promise<ApiResult<RewardFetchResponse>> => {
    const res = await handleApiCall<RewardFetchResponse>({
      url: REWARD_ENDPOINTS.USER.FETCH(id),
      method: 'GET',
    });
    setResponse(res);
    return res;
  }, [handleApiCall]);

  useEffect(() => {
    if (projectId) {
      fetchRewards(projectId);
    }
  }, [projectId, fetchRewards]);

  return {
    isLoading,
    error,
    response,
    handleRefresh: () => fetchRewards(projectId),
  };
};
