import { useState, useEffect, useCallback } from "react";
import { ApiResult } from "@api/_common/types";
import { useApiHandler } from "@api/_common/useApiHandler";
import { PLEDGE_ENDPOINTS } from "@api/pledge/constants";
import { MyPledgeDetailResponse } from "@api/pledge/my/detail/myPledgeDetailResponse";

export const useMyPledgeDetail = (pledgeId: number) => {
  const { isLoading, error, handleApiCall } = useApiHandler();
  const [response, setResponse] = useState<ApiResult<MyPledgeDetailResponse> | null>(null);

  const fetchMyPledgeDetail = useCallback(async (): Promise<ApiResult<MyPledgeDetailResponse>> => {
    const res = await handleApiCall<MyPledgeDetailResponse>({
      url: PLEDGE_ENDPOINTS.MY.DETAIL(pledgeId),
      method: 'GET',
    });
    setResponse(res);
    return res;
  }, [handleApiCall, pledgeId]);

  useEffect(() => {
    if (pledgeId) {
      fetchMyPledgeDetail();
    }
  }, [fetchMyPledgeDetail, pledgeId]);

  return {
    fetchMyPledgeDetail,
    response,
    isLoading,
    error,
  };
};
