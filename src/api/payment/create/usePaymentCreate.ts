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

  const createPayment = async (pledgeId: number, data?: Partial<PaymentCreateRequest>): Promise<ApiResult<PaymentCreateResponse>> => {
    const res = await handleApiCall<PaymentCreateResponse>({
      url: PAYMENT_ENDPOINTS.CREATE,
      method: 'POST',
      data: {
        ...request,
        pledgeId,
        ...data,
      },
    });
    setResponse(res);
    return res;
  };

  const onSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    return await createPayment(request.pledgeId);
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
