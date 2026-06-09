import { ApiResult } from "@api/_common/types";
import { useApiHandler } from "@api/_common/useApiHandler";
import { PLEDGE_ENDPOINTS } from "@api/pledge/constants";
import { AdminPledgeDetailResponse } from "@api/pledge/admin/detail/adminPledgeDetailResponse";

export const useAdminPledgeDetail = () => {
  const { isLoading, error, handleApiCall } = useApiHandler();

  const fetchAdminPledgeDetail = async (
    pledgeId: number
  ): Promise<ApiResult<AdminPledgeDetailResponse>> => {
    return handleApiCall<AdminPledgeDetailResponse>({
      url: PLEDGE_ENDPOINTS.ADMIN.DETAIL(pledgeId),
      method: 'GET',
    });
  };

  return {
    fetchAdminPledgeDetail,
    isLoading,
    error,
  };
};
