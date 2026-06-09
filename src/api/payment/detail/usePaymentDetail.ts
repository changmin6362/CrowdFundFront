import { ApiResult } from "@api/_common/types";
import { useApiHandler } from "@api/_common/useApiHandler";
import { PAYMENT_ENDPOINTS } from "@api/payment/constants";
import { PaymentDetailResponse } from "@api/payment/detail/paymentDetailResponse";

export const usePaymentDetail = () => {
  const { isLoading, error, handleApiCall } = useApiHandler();

  const fetchPaymentDetailByPledge = async (pledgeId: number): Promise<ApiResult<PaymentDetailResponse>> => {
    return handleApiCall<PaymentDetailResponse>({
      url: PAYMENT_ENDPOINTS.DETAIL_BY_PLEDGE(pledgeId),
      method: 'GET',
    });
  };

  return {
    fetchPaymentDetailByPledge,
    isLoading,
    error,
  };
};
