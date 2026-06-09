import { useState } from "react";
import { ApiResult } from "@api/_common/types";
import { useApiHandler } from "@api/_common/useApiHandler";
import { REWARD_ENDPOINTS } from "@api/reward/constants";
import { RewardUpdateRequest } from "@api/reward/creator/update/rewardUpdateRequest";
import { RewardUpdateResponse } from "@api/reward/creator/update/rewardUpdateResponse";

export const useRewardUpdate = () => {
  const { isLoading, error, handleApiCall } = useApiHandler();
  const [response, setResponse] = useState<ApiResult<RewardUpdateResponse> | null>(null);

  const [request, setRequest] = useState<RewardUpdateRequest>({
    title: "",
    description: "",
    price: 0,
  });

  const updateReward = async (
    rewardId: number,
    data: RewardUpdateRequest
  ): Promise<ApiResult<RewardUpdateResponse>> => {
    return handleApiCall<RewardUpdateResponse>({
      url: REWARD_ENDPOINTS.CREATOR.UPDATE(rewardId),
      method: 'PATCH',
      data,
    });
  };

  const onSubmit = async (rewardId: number) => {
    try {
      const res = await updateReward(rewardId, request);
      setResponse(res);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setResponse({ message, data: null });
    }
  };

  return {
    request,
    setRequest,
    onSubmit,
    isLoading,
    error,
    response,
  };
};
