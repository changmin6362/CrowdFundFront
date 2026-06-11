import { useCallback } from "react";
import { ApiResult } from "@api/_common/types";
import { useApiHandler } from "@api/_common/useApiHandler";
import { PLEDGE_ENDPOINTS } from "@api/pledge/constants";
import { MyPledgesDeleteResponse } from "@api/pledge/my/cancel/myPledgesDeleteResponse";

export const useMyPledgeCancel = () => {
  const { isLoading, error, handleApiCall } = useApiHandler();

  const cancelPledge = useCallback(async (
    pledgeId: number
  ): Promise<ApiResult<MyPledgesDeleteResponse>> => {
    return handleApiCall<MyPledgesDeleteResponse>({
      url: PLEDGE_ENDPOINTS.MY.CANCEL(pledgeId),
      method: 'DELETE',
    });
  }, [handleApiCall]);

  const onCancel = useCallback(async (pledgeId: number, onSuccess?: () => void) => {
    if (!confirm('후원을 취소하시겠습니까?')) return;
    const res = await cancelPledge(pledgeId);
    if (res.status >= 200 && res.status < 300) {
      alert('후원이 취소되었습니다.');
      onSuccess?.();
    } else {
      alert(res.message || '취소 실패');
    }
  }, [cancelPledge]);

  return {
    cancelPledge,
    onCancel,
    isLoading,
    error,
  };
};
