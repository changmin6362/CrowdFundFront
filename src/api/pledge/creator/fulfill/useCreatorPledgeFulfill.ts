import { useState } from "react";
import { ApiResult } from "@api/_common/types";
import { useApiHandler } from "@api/_common/useApiHandler";
import { PLEDGE_ENDPOINTS } from "@api/pledge/constants";
import { CreatorPledgeFulfillRequest } from "@api/pledge/creator/fulfill/creatorPledgeFulfillRequest";
import { CreatorPledgeFulfillResponse } from "@api/pledge/creator/fulfill/creatorPledgeFulfillResponse";

export const useCreatorPledgeFulfill = () => {
  const { isLoading, error, handleApiCall } = useApiHandler();
  const [response, setResponse] = useState<ApiResult<CreatorPledgeFulfillResponse> | null>(null);

  const fulfillPledge = async (
    pledgeId: number,
    data: CreatorPledgeFulfillRequest
  ): Promise<ApiResult<CreatorPledgeFulfillResponse>> => {
    return handleApiCall<CreatorPledgeFulfillResponse>({
      url: PLEDGE_ENDPOINTS.CREATOR.FULFILL(pledgeId),
      method: 'PATCH',
      data,
    });
  };

  return {
    fulfillPledge,
    isLoading,
    error,
    response,
    setResponse,
  };
};
