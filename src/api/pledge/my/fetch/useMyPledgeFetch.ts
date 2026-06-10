import { useState, useEffect, useCallback, useMemo } from "react";
import { ApiResult, CursorRequest } from "@api/_common/types";
import { useApiHandler } from "@api/_common/useApiHandler";
import { PLEDGE_ENDPOINTS } from "@api/pledge/constants";
import { FulfillmentStatus, PledgeStatus } from "@api/pledge/types";
import { MyPledgesFetchResponse } from "@api/pledge/my/fetch/myPledgesFetchResponse";

export const useMyPledgeFetch = (query?: CursorRequest & {
  fulfillmentStatus?: FulfillmentStatus;
  pledgeStatus?: PledgeStatus;
  limit?: number;
}) => {
  const { isLoading, error, handleApiCall } = useApiHandler();
  const [response, setResponse] = useState<ApiResult<MyPledgesFetchResponse> | null>(null);

  // query 객체의 각 프로퍼티를 의존성으로 하여 query 객체를 메모이제이션
  const memoizedQuery = useMemo(() => query, [
    query?.cursor,
    query?.fulfillmentStatus,
    query?.pledgeStatus,
    query?.limit
  ]);

  const fetchMyPledges = useCallback(async (): Promise<ApiResult<MyPledgesFetchResponse>> => {
    const res = await handleApiCall<MyPledgesFetchResponse>({
      url: PLEDGE_ENDPOINTS.MY.FETCH,
      method: 'GET',
      params: memoizedQuery,
    });
    setResponse(res);
    return res;
  }, [handleApiCall, memoizedQuery]);

  useEffect(() => {
    fetchMyPledges();
  }, [fetchMyPledges]);

  return {
    fetchMyPledges,
    response,
    isLoading,
    error,
  };
};
