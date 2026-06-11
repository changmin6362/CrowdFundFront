import { useState, useCallback } from "react";
import { ApiResult } from "@api/_common/types";
import { useApiHandler } from "@api/_common/useApiHandler";
import { PLEDGE_ENDPOINTS } from "@api/pledge/constants";
import { MyPledgeDetailResponse } from "@api/pledge/my/detail/myPledgeDetailResponse";

export const useMyPledgeDetail = (initialPledgeId: number) => {
  const { isLoading, error, handleApiCall } = useApiHandler();
  const [response, setResponse] = useState<ApiResult<MyPledgeDetailResponse> | null>(null);

  const fetchMyPledgeDetail = useCallback(async (pledgeId?: number): Promise<ApiResult<MyPledgeDetailResponse>> => {
    const targetId = pledgeId || initialPledgeId;
    const res = await handleApiCall<MyPledgeDetailResponse>({
      url: PLEDGE_ENDPOINTS.MY.DETAIL(targetId),
      method: 'GET',
    });
    setResponse(res);
    return res;
  }, [handleApiCall, initialPledgeId]);

  return {
    fetchMyPledgeDetail,
    response,
    isLoading,
    error,
  };
};
