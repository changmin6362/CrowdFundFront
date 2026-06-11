import { useState } from "react";
import { ApiResult } from "@api/_common/types";
import { useApiHandler } from "@api/_common/useApiHandler";
import { PAYMENT_ENDPOINTS } from "@api/payment/constants";
import { PaymentCreateRequest } from "@api/payment/create/paymentCreateRequest";
import { PaymentCreateResponse } from "@api/payment/create/paymentCreateResponse";

export const usePaymentCreate = () => {
  const { isLoading, error, handleApiCall } = useApiHandler();
  const [response, setResponse] = useState<ApiResult<PaymentCreateResponse> | null>(null);

  const [request, setRequest] = useState<PaymentCreateRequest>({
    pledgeId: 0,
    paymentMethod: 'UNKNOWN',
    amount: 0,
  });

  const createPayment = async (data: PaymentCreateRequest): Promise<ApiResult<PaymentCreateResponse>> => {
    return handleApiCall<PaymentCreateResponse>({
      url: PAYMENT_ENDPOINTS.CREATE,
      method: 'POST',
      data,
    });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await createPayment(request);
      setResponse(res);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setResponse({ message, data: null, status: 500 });
    }
  };

  return {
    request,
    setRequest,
    onSubmit,
    isLoading,
    error,
    response,
    createPayment,
  };
};
