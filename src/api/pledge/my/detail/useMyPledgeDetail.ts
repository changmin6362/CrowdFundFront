import { ApiResult } from "@api/_common/types";
import { useApiHandler } from "@api/_common/useApiHandler";
import { PLEDGE_ENDPOINTS } from "@api/pledge/constants";
import { MyPledgeDetailResponse } from "@api/pledge/my/detail/myPledgeDetailResponse";

export const useMyPledgeDetail = () => {
  const { isLoading, error, handleApiCall } = useApiHandler();

  const fetchMyPledgeDetail = async (
    pledgeId: number
  ): Promise<ApiResult<MyPledgeDetailResponse>> => {
    return handleApiCall<MyPledgeDetailResponse>({
      url: PLEDGE_ENDPOINTS.MY.DETAIL(pledgeId),
      method: 'GET',
    });
  };

  return {
    fetchMyPledgeDetail,
    isLoading,
    error,
  };
};
