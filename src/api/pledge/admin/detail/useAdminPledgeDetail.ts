import { useState, useCallback } from "react";
import { ApiResult } from "@api/_common/types";
import { useApiHandler } from "@api/_common/useApiHandler";
import { PLEDGE_ENDPOINTS } from "@api/pledge/constants";
import { AdminPledgeDetailResponse } from "@api/pledge/admin/detail/adminPledgeDetailResponse";

export const useAdminPledgeDetail = (initialPledgeId: number) => {
  const { isLoading, error, handleApiCall } = useApiHandler();
  const [response, setResponse] = useState<ApiResult<AdminPledgeDetailResponse> | null>(null);

  const fetchAdminPledgeDetail = useCallback(async (pledgeId?: number): Promise<ApiResult<AdminPledgeDetailResponse>> => {
    const targetId = pledgeId || initialPledgeId;
    const res = await handleApiCall<AdminPledgeDetailResponse>({
      url: PLEDGE_ENDPOINTS.ADMIN.DETAIL(targetId),
      method: 'GET',
    });
    setResponse(res);
    return res;
  }, [handleApiCall, initialPledgeId]);

  return {
    fetchAdminPledgeDetail,
    response,
    isLoading,
    error,
  };
};
