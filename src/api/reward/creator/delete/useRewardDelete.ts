import { useState } from "react";
import { ApiResult } from "@api/_common/types";
import { useApiHandler } from "@api/_common/useApiHandler";
import { REWARD_ENDPOINTS } from "@api/reward/constants";
import { RewardDeleteResponse } from "@api/reward/creator/delete/rewardDeleteResponse";

export const useRewardDelete = () => {
  const { isLoading, error, handleApiCall } = useApiHandler();
  const [response, setResponse] = useState<ApiResult<RewardDeleteResponse> | null>(null);

  const deleteReward = async (
    rewardId: number,
    onSuccess?: () => void
  ): Promise<ApiResult<RewardDeleteResponse>> => {
    if (!confirm('정말로 이 리워드를 삭제하시겠습니까?')) {
      return { message: '취소됨', data: null };
    }
    const res = await handleApiCall<RewardDeleteResponse>({
      url: REWARD_ENDPOINTS.CREATOR.DELETE(rewardId),
      method: 'DELETE',
    });
    setResponse(res);
    if (res.data) {
      onSuccess?.();
    }
    return res;
  };

  return {
    deleteReward,
    isLoading,
    error,
    response,
  };
};
