import { useState } from "react";
import { ApiResult } from "@api/_common/types";
import { useApiHandler } from "@api/_common/useApiHandler";
import { REWARD_ENDPOINTS } from "@api/reward/constants";
import { RewardCreateRequest } from "@api/reward/creator/create/rewardCreateRequest";
import { RewardCreateResponse } from "@api/reward/creator/create/rewardCreateResponse";

export const useRewardCreate = () => {
  const { isLoading, error, handleApiCall } = useApiHandler();
  const [response, setResponse] = useState<ApiResult<RewardCreateResponse> | null>(null);

  const [request, setRequest] = useState<RewardCreateRequest>({
    title: "",
    description: "",
    price: 0,
    stock: 0,
  });

  const createReward = async (
    projectId: number,
    data: RewardCreateRequest
  ): Promise<ApiResult<RewardCreateResponse>> => {
    return handleApiCall<RewardCreateResponse>({
      url: REWARD_ENDPOINTS.CREATOR.CREATE(projectId),
      method: 'POST',
      data,
    });
  };

  const onSubmit = async (projectId: number) => {
    try {
      const res = await createReward(projectId, request);
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
