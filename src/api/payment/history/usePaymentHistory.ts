import { ApiResult } from "@api/_common/types";
import { useApiHandler } from "@api/_common/useApiHandler";
import { PAYMENT_ENDPOINTS } from "@api/payment/constants";
import { PaymentHistoryResponse } from "@api/payment/history/paymentHistoryResponse";

export const usePaymentHistory = () => {
  const { isLoading, error, handleApiCall } = useApiHandler();

  const fetchPaymentHistory = async (paymentId: number): Promise<ApiResult<PaymentHistoryResponse>> => {
    return handleApiCall<PaymentHistoryResponse>({
      url: PAYMENT_ENDPOINTS.HISTORY(paymentId),
      method: 'GET',
    });
  };

  return {
    fetchPaymentHistory,
    isLoading,
    error,
  };
};
