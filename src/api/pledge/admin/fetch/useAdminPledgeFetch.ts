import { ApiResult, CursorRequest } from "@api/_common/types";
import { useApiHandler } from "@api/_common/useApiHandler";
import { PLEDGE_ENDPOINTS } from "@api/pledge/constants";
import { FulfillmentStatus, PledgeStatus } from "@api/pledge/types";
import { AdminPledgesFetchResponse } from "@api/pledge/admin/fetch/adminPledgesFetchResponse";

export const useAdminPledgeFetch = () => {
  const { isLoading, error, handleApiCall } = useApiHandler();

  const fetchAdminPledges = async (
    query?: CursorRequest & {
      fulfillmentStatus?: FulfillmentStatus;
      pledgeStatus?: PledgeStatus;
      limit?: number;
    }
  ): Promise<ApiResult<AdminPledgesFetchResponse>> => {
    return handleApiCall<AdminPledgesFetchResponse>({
      url: PLEDGE_ENDPOINTS.ADMIN.FETCH,
      method: 'GET',
      params: query,
    });
  };

  return {
    fetchAdminPledges,
    isLoading,
    error,
  };
};
