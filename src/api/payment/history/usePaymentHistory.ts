import { useState, useCallback } from "react";
import { ApiResult } from "@api/_common/types";
import { useApiHandler } from "@api/_common/useApiHandler";
import { PAYMENT_ENDPOINTS } from "@api/payment/constants";
import { PaymentHistoryResponse } from "@api/payment/history/paymentHistoryResponse";

export const usePaymentHistory = (initialPaymentId?: number) => {
  const { isLoading, error, handleApiCall } = useApiHandler();
  const [response, setResponse] = useState<ApiResult<PaymentHistoryResponse> | null>(null);

  const fetchPaymentHistory = useCallback(async (paymentId?: number): Promise<ApiResult<PaymentHistoryResponse>> => {
    const targetId = paymentId || initialPaymentId;
    if (!targetId) return { message: "paymentId가 없습니다.", data: null };
    
    const res = await handleApiCall<PaymentHistoryResponse>({
      url: PAYMENT_ENDPOINTS.HISTORY(targetId),
      method: 'GET',
    });
    setResponse(res);
    return res;
  }, [handleApiCall, initialPaymentId]);

  return {
    fetchPaymentHistory,
    response,
    isLoading,
    error,
  };
};
