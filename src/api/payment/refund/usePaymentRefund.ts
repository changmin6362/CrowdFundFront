import { useCallback } from "react";
import { ApiResult } from "@api/_common/types";
import { useApiHandler } from "@api/_common/useApiHandler";
import { PAYMENT_ENDPOINTS } from "@api/payment/constants";

export const usePaymentRefund = () => {
  const { isLoading, error, handleApiCall } = useApiHandler();

  const refundPayment = useCallback(async (paymentId: number): Promise<ApiResult> => {
    return handleApiCall<void>({
      url: PAYMENT_ENDPOINTS.REFUND(paymentId),
      method: 'DELETE',
    });
  }, [handleApiCall]);

  return {
    refundPayment,
    isLoading,
    error,
  };
};
