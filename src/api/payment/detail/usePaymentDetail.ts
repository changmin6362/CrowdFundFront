import { useState, useCallback } from "react";
import { ApiResult } from "@api/_common/types";
import { useApiHandler } from "@api/_common/useApiHandler";
import { PAYMENT_ENDPOINTS } from "@api/payment/constants";
import { PaymentDetailResponse } from "@api/payment/detail/paymentDetailResponse";

export const usePaymentDetail = (initialPledgeId?: number) => {
  const { isLoading, error, handleApiCall } = useApiHandler();
  const [response, setResponse] = useState<ApiResult<PaymentDetailResponse> | null>(null);

  const fetchPaymentDetailByPledge = useCallback(async (pledgeId?: number): Promise<ApiResult<PaymentDetailResponse>> => {
    const targetId = pledgeId || initialPledgeId;
    if (!targetId) throw new Error("pledgeId가 필요합니다.");

    const res = await handleApiCall<PaymentDetailResponse>({
      url: PAYMENT_ENDPOINTS.DETAIL_BY_PLEDGE(targetId),
      method: 'GET',
    });
    setResponse(res);
    return res;
  }, [handleApiCall, initialPledgeId]);

  return {
    fetchPaymentDetailByPledge,
    response,
    isLoading,
    error,
  };
};
