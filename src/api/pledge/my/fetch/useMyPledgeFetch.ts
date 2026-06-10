import { useState, useCallback, useEffect } from "react";
import { ApiResult, CursorRequest } from "@api/_common/types";
import { useApiHandler } from "@api/_common/useApiHandler";
import { PLEDGE_ENDPOINTS } from "@api/pledge/constants";
import { FulfillmentStatus, PledgeStatus } from "@api/pledge/types";
import { MyPledgesFetchResponse, MyPledgeInfo } from "@api/pledge/my/fetch/myPledgesFetchResponse";

interface UseMyPledgeFetchProps {
  fulfillmentStatus?: FulfillmentStatus;
  pledgeStatus?: PledgeStatus;
  limit?: number;
}

export const useMyPledgeFetch = (props?: UseMyPledgeFetchProps) => {
  const { fulfillmentStatus, pledgeStatus, limit } = props || {};

  const { isLoading, error, handleApiCall } = useApiHandler();
  const [response, setResponse] = useState<ApiResult<MyPledgesFetchResponse> | null>(null);
  const [pledges, setPledges] = useState<MyPledgeInfo[]>([]);

  const fetchMyPledges = useCallback(async (
    query?: CursorRequest & UseMyPledgeFetchProps,
    isAppend: boolean = false
  ): Promise<ApiResult<MyPledgesFetchResponse>> => {
    try {
      const res = await handleApiCall<MyPledgesFetchResponse>({
        url: PLEDGE_ENDPOINTS.MY.FETCH,
        method: 'GET',
        params: query,
      });
      setResponse(res);
      if (res.data?.pledges) {
        setPledges(prev => isAppend ? [...prev, ...res.data!.pledges!] : res.data!.pledges!);
      } else if (!isAppend) {
        setPledges([]);
      }
      return res;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      const errorRes = { message, data: null };
      setResponse(errorRes);
      if (!isAppend) setPledges([]);
      return errorRes;
    }
  }, [handleApiCall]);

  // 첫 진입 및 필터 변경 시 자동 호출
  useEffect(() => {
    fetchMyPledges({ fulfillmentStatus, pledgeStatus, limit, id: null, createdAt: null });
  }, [fetchMyPledges, fulfillmentStatus, pledgeStatus, limit]);

  // 다음 페이지 가져오기
  const onLoadMore = () => {
    if (response?.data?.hasNext && response?.data?.nextCursor) {
      fetchMyPledges({
        fulfillmentStatus,
        pledgeStatus,
        limit,
        ...response.data.nextCursor // 여기서는 실제 커서 데이터(id, createdAt 등)가 주입됨
      }, true);
    }
  };

  return {
    isLoading,
    error,
    response,
    pledges,
    onLoadMore,
    handleRefresh: () => fetchMyPledges({ fulfillmentStatus, pledgeStatus, limit, id: null, createdAt: null }),
  };
};
