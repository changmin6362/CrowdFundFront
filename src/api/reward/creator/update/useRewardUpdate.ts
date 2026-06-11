import { useState } from "react";
import { ApiResult } from "@api/_common/types";
import { useApiHandler } from "@api/_common/useApiHandler";
import { REWARD_ENDPOINTS } from "@api/reward/constants";
import { RewardUpdateRequest } from "@api/reward/creator/update/rewardUpdateRequest";
import { RewardUpdateResponse } from "@api/reward/creator/update/rewardUpdateResponse";
import { RewardFetchInfo } from "@api/reward/types";

export const useRewardUpdate = () => {
  const { isLoading, error, handleApiCall } = useApiHandler();
  const [response, setResponse] = useState<ApiResult<RewardUpdateResponse> | null>(null);

  const [request, setRequest] = useState<RewardUpdateRequest>({
    title: "",
    description: "",
    price: 0,
  });

  const [editingRewardId, setEditingRewardId] = useState<number | null>(null);

  const startEdit = (reward: RewardFetchInfo) => {
    setEditingRewardId(reward.rewardId || null);
    setRequest({
      title: reward.title || '',
      description: reward.description || '',
      price: reward.price || 0,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setRequest(prev => ({
      ...prev,
      [name]: name === 'price' ? Number(value) : value,
    }));
  };

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

  const onSubmit = async (rewardId: number, onSuccess?: () => void) => {
    try {
      const res = await updateReward(rewardId, request);
      setResponse(res);
      if (res.data) {
        setEditingRewardId(null);
        onSuccess?.();
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setResponse({ message, data: null, status: 500 });
    }
  };

  const onFormSubmit = async (e: React.FormEvent, rewardId: number, onSuccess?: () => void) => {
    e.preventDefault();
    await onSubmit(rewardId, onSuccess);
  };

  return {
    request,
    setRequest,
    editingRewardId,
    setEditingRewardId,
    startEdit,
    handleInputChange,
    onSubmit,
    onFormSubmit,
    isLoading,
    error,
    response,
  };
};
