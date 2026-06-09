import { ApiResult } from "@api/_common/types";
import { useApiHandler } from "@api/_common/useApiHandler";
import { PAYMENT_ENDPOINTS } from "@api/payment/constants";
import {
  PaymentCreateRequest,
  PaymentCreateResponse,
  PaymentDetailResponse,
  PaymentHistoryResponse
} from "@api/payment/types";

export const usePayment = () => {
  const { isLoading, error, handleApiCall } = useApiHandler();

  /**
   * 결제 생성
   */
  const createPayment = async (data: PaymentCreateRequest): Promise<ApiResult<PaymentCreateResponse>> => {
    return handleApiCall<PaymentCreateResponse>({
      url: PAYMENT_ENDPOINTS.CREATE,
      method: 'POST',
      data,
    });
  };

  /**
   * 결제 내역 조회
   */
  const fetchPaymentHistory = async (paymentId: number): Promise<ApiResult<PaymentHistoryResponse>> => {
    return handleApiCall<PaymentHistoryResponse>({
      url: PAYMENT_ENDPOINTS.HISTORY(paymentId),
      method: 'GET',
    });
  };

  /**
   * 후원 ID로 결제 상세 정보 조회
   */
  const fetchPaymentDetailByPledge = async (pledgeId: number): Promise<ApiResult<PaymentDetailResponse>> => {
    return handleApiCall<PaymentDetailResponse>({
      url: PAYMENT_ENDPOINTS.DETAIL_BY_PLEDGE(pledgeId),
      method: 'GET',
    });
  };

  /**
   * 결제 환불
   */
  const refundPayment = async (paymentId: number): Promise<ApiResult<void>> => {
    return handleApiCall<void>({
      url: PAYMENT_ENDPOINTS.REFUND(paymentId),
      method: 'DELETE',
    });
  };

  return {
    createPayment,
    fetchPaymentHistory,
    fetchPaymentDetailByPledge,
    refundPayment,
    isLoading,
    error,
  };
};
