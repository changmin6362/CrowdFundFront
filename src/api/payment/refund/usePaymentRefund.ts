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

  const onRefund = useCallback(async (paymentId: number, onSuccess?: () => void) => {
    if (!confirm('환불을 요청하시겠습니까?')) return;
    const res = await refundPayment(paymentId);
    if (res.status >= 200 && res.status < 300) {
      alert('환불 요청이 완료되었습니다.');
      onSuccess?.();
    } else {
      alert(res.message || '환불 실패');
    }
  }, [refundPayment]);

  return {
    refundPayment,
    onRefund,
    isLoading,
    error,
  };
};
