import { useState, useCallback } from "react";
import { ApiResult } from "@api/_common/types";
import { useApiHandler } from "@api/_common/useApiHandler";
import { PLEDGE_ENDPOINTS } from "@api/pledge/constants";
import { CreatorPledgeFulfillRequest } from "@api/pledge/creator/fulfill/creatorPledgeFulfillRequest";
import { CreatorPledgeFulfillResponse } from "@api/pledge/creator/fulfill/creatorPledgeFulfillResponse";

export const useCreatorPledgeFulfill = (options?: { onSuccess?: () => void }) => {
  const { isLoading, error, handleApiCall } = useApiHandler();
  const [response, setResponse] = useState<ApiResult<CreatorPledgeFulfillResponse> | null>(null);

  const fulfillPledge = useCallback(async (
    pledgeId: number,
    data: CreatorPledgeFulfillRequest
  ): Promise<ApiResult<CreatorPledgeFulfillResponse>> => {
    const res = await handleApiCall<CreatorPledgeFulfillResponse>({
      url: PLEDGE_ENDPOINTS.CREATOR.FULFILL(pledgeId),
      method: 'PATCH',
      data,
    });
    setResponse(res);
    return res;
  }, [handleApiCall]);

  const onFulfill = useCallback(async (pledgeId: number) => {
    if (!confirm('배송을 시작(이행 완료) 처리하시겠습니까?')) return;

    const res = await fulfillPledge(pledgeId, { fulfillmentStatus: 'FULFILLED' });
    if (res.status >= 200 && res.status < 300) {
      alert('성공적으로 업데이트되었습니다.');
      options?.onSuccess?.();
    } else {
      alert(res.message || '업데이트에 실패했습니다.');
    }
  }, [fulfillPledge, options]);

  return {
    fulfillPledge,
    onFulfill,
    isLoading,
    error,
    response,
    setResponse,
  };
};
