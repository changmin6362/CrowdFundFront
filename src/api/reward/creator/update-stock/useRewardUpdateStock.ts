import { useState } from "react";
import { ApiResult } from "@api/_common/types";
import { useApiHandler } from "@api/_common/useApiHandler";
import { REWARD_ENDPOINTS } from "@api/reward/constants";
import { RewardUpdateStockRequest } from "@api/reward/creator/update-stock/rewardUpdateStockRequest";
import { RewardUpdateStockResponse } from "@api/reward/creator/update-stock/rewardUpdateStockResponse";
import { RewardFetchInfo } from "@api/reward/types";

export const useRewardUpdateStock = () => {
  const { isLoading, error, handleApiCall } = useApiHandler();
  const [response, setResponse] = useState<ApiResult<RewardUpdateStockResponse> | null>(null);

  const [request, setRequest] = useState<RewardUpdateStockRequest>({
    stock: 0,
  });

  const [stockEditingId, setStockEditingId] = useState<number | null>(null);

  const startStockEdit = (reward: RewardFetchInfo) => {
    setStockEditingId(reward.rewardId || null);
    setRequest({ stock: reward.stock || 0 });
  };

  const updateRewardStock = async (
    rewardId: number,
    data: RewardUpdateStockRequest
  ): Promise<ApiResult<RewardUpdateStockResponse>> => {
    return handleApiCall<RewardUpdateStockResponse>({
      url: REWARD_ENDPOINTS.CREATOR.UPDATE_STOCK(rewardId),
      method: 'PATCH',
      data,
    });
  };

  const onSubmit = async (rewardId: number, onSuccess?: () => void) => {
    try {
      const res = await updateRewardStock(rewardId, request);
      setResponse(res);
      if (res.data) {
        setStockEditingId(null);
        onSuccess?.();
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setResponse({ message, data: null });
    }
  };

  const onFormSubmit = async (e: React.FormEvent, rewardId: number, onSuccess?: () => void) => {
    e.preventDefault();
    await onSubmit(rewardId, onSuccess);
  };

  return {
    request,
    setRequest,
    stockEditingId,
    setStockEditingId,
    startStockEdit,
    onSubmit,
    onFormSubmit,
    isLoading,
    error,
    response,
  };
};
