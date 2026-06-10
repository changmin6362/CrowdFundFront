import { useState, useCallback, useEffect } from "react";
import { ApiResult, CursorRequest } from "@api/_common/types";
import { useApiHandler } from "@api/_common/useApiHandler";
import { PLEDGE_ENDPOINTS } from "@api/pledge/constants";
import { FulfillmentStatus, PledgeStatus } from "@api/pledge/types";
import { AdminPledgesFetchResponse, PledgeSummary } from "@api/pledge/admin/fetch/adminPledgesFetchResponse";

interface UseAdminPledgeFetchProps {
  fulfillmentStatus?: FulfillmentStatus;
  pledgeStatus?: PledgeStatus;
  projectId?: number;
  limit?: number;
}

export const useAdminPledgeFetch = (props?: UseAdminPledgeFetchProps) => {
  const fulfillmentStatus = props?.fulfillmentStatus;
  const pledgeStatus = props?.pledgeStatus;
  const projectId = props?.projectId;
  const limit = props?.limit;

  const { isLoading, error, handleApiCall } = useApiHandler();
  const [response, setResponse] = useState<ApiResult<AdminPledgesFetchResponse> | null>(null);
  const [pledges, setPledges] = useState<PledgeSummary[]>([]);

  const fetchAdminPledges = useCallback(async (
    query?: CursorRequest & UseAdminPledgeFetchProps,
    isAppend: boolean = false
  ): Promise<ApiResult<AdminPledgesFetchResponse>> => {
    const res = await handleApiCall<AdminPledgesFetchResponse>({
      url: PLEDGE_ENDPOINTS.ADMIN.FETCH,
      method: 'GET',
      params: query,
    });
    setResponse(res);
    if (res.status >= 200 && res.status < 300 && res.data?.pledges) {
      setPledges(prev => isAppend ? [...prev, ...res.data!.pledges!] : res.data!.pledges!);
    } else if (!isAppend) {
      setPledges([]);
    }
    return res;
  }, [handleApiCall]);

  useEffect(() => {
    fetchAdminPledges({ fulfillmentStatus, pledgeStatus, projectId, limit, id: null, createdAt: null });
  }, [fetchAdminPledges, fulfillmentStatus, pledgeStatus, projectId, limit]);

  const onLoadMore = useCallback(() => {
    if (response?.data?.hasNext && response?.data?.nextCursor) {
      fetchAdminPledges({
        fulfillmentStatus,
        pledgeStatus,
        projectId,
        limit,
        ...response.data.nextCursor
      }, true);
    }
  }, [fetchAdminPledges, fulfillmentStatus, pledgeStatus, projectId, limit, response?.data?.hasNext, response?.data?.nextCursor]);

  const handleRefresh = useCallback(() => {
    return fetchAdminPledges({ fulfillmentStatus, pledgeStatus, projectId, limit, id: null, createdAt: null });
  }, [fetchAdminPledges, fulfillmentStatus, pledgeStatus, projectId, limit]);

  return {
    response,
    pledges,
    isLoading,
    error,
    onLoadMore,
    handleRefresh,
  };
};
