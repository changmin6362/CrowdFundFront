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

  return {
    cancelPledge,
    isLoading,
    error,
  };
};
