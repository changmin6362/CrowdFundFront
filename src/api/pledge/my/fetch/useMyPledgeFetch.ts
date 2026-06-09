import { ApiResult, CursorRequest } from "@api/_common/types";
import { useApiHandler } from "@api/_common/useApiHandler";
import { PLEDGE_ENDPOINTS } from "@api/pledge/constants";
import { FulfillmentStatus, PledgeStatus } from "@api/pledge/types";
import { MyPledgesFetchResponse } from "@api/pledge/my/fetch/myPledgesFetchResponse";

export const useMyPledgeFetch = () => {
  const { isLoading, error, handleApiCall } = useApiHandler();

  const fetchMyPledges = async (
    query?: CursorRequest & {
      fulfillmentStatus?: FulfillmentStatus;
      pledgeStatus?: PledgeStatus;
      limit?: number;
    }
  ): Promise<ApiResult<MyPledgesFetchResponse>> => {
    return handleApiCall<MyPledgesFetchResponse>({
      url: PLEDGE_ENDPOINTS.MY.FETCH,
      method: 'GET',
      params: query,
    });
  };

  return {
    fetchMyPledges,
    isLoading,
    error,
  };
};
