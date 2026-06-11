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

  const [isAdding, setIsAdding] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setRequest(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? Number(value) : value,
    }));
  };

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

  const onSubmit = async (projectId: number, onSuccess?: () => void) => {
    try {
      const res = await createReward(projectId, request);
      setResponse(res);
      if (res.data) {
        setRequest({ title: "", description: "", price: 0, stock: 0 });
        setIsAdding(false);
        onSuccess?.();
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setResponse({ message, data: null, status: 500 });
    }
  };

  const onFormSubmit = async (e: React.FormEvent, projectId: number, onSuccess?: () => void) => {
    e.preventDefault();
    await onSubmit(projectId, onSuccess);
  };

  return {
    request,
    setRequest,
    isAdding,
    setIsAdding,
    handleInputChange,
    onSubmit,
    onFormSubmit,
    isLoading,
    error,
    response,
  };
};
