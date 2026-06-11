import { useState, useEffect } from "react";
import { ApiResult } from "@api/_common/types";
import { useApiHandler } from "@api/_common/useApiHandler";
import { PLEDGE_ENDPOINTS } from "@api/pledge/constants";
import { MyPledgeCreateRequest, MyPledgeCreateResponse } from "@api/pledge/my/create/myPledgeCreateRequest";
import { PledgeAddressReplaceResponse } from "@api/pledge-address/replace/pledgeAddressReplaceResponse";
import { PaymentCreateResponse } from "@api/payment/create/paymentCreateResponse";

export const useMyPledgeCreate = (initialData?: { projectId: number; rewardId: number }) => {
  const { isLoading, error, handleApiCall } = useApiHandler();
  const [response, setResponse] = useState<ApiResult<MyPledgeCreateResponse> | null>(null);

  const [request, setRequest] = useState<MyPledgeCreateRequest>({
    projectId: initialData?.projectId || 0,
    rewardId: initialData?.rewardId || 0,
  });

  // initialData가 변경될 때 request 동기화
  useEffect(() => {
    if (initialData) {
      setRequest(initialData);
    }
  }, [initialData]);

  const createPledge = async (data: MyPledgeCreateRequest): Promise<ApiResult<MyPledgeCreateResponse>> => {
    const res = await handleApiCall<MyPledgeCreateResponse>({
      url: PLEDGE_ENDPOINTS.MY.CREATE,
      method: 'POST',
      data,
    });
    setResponse(res);
    return res;
  };

  const onPledgeAndPayment = async (
    params: {
      selectedAddressId: number;
      onSubmitReplace: (pledgeId: number, addressId: number) => Promise<ApiResult<PledgeAddressReplaceResponse>>;
      onSubmitPayment: (pledgeId: number) => Promise<ApiResult<PaymentCreateResponse>>;
      onSuccess: () => void;
    }
  ) => {
    const { selectedAddressId, onSubmitReplace, onSubmitPayment, onSuccess } = params;

    if (!request.rewardId) {
      alert("리워드를 선택해주세요.");
      return;
    }
    if (!selectedAddressId) {
      alert("배송지를 선택해주세요.");
      return;
    }

    // 1. 후원 생성
    const pledgeRes = await createPledge(request);

    if (!pledgeRes.data?.pledgeId) {
      alert(pledgeRes.message || "후원 생성에 실패했습니다.");
      return;
    }

    const pledgeId = pledgeRes.data.pledgeId;

    // 2. 배송지 설정
    const replaceRes = await onSubmitReplace(pledgeId, selectedAddressId);
    if (!replaceRes.data) {
      alert(replaceRes.message || "배송지 설정에 실패했습니다.");
      return;
    }

    // 3. 결제 실행
    const paymentRes = await onSubmitPayment(pledgeId);

    if (paymentRes.data) {
      alert("후원 및 결제가 완료되었습니다!");
      onSuccess();
    } else {
      alert(paymentRes.message || "결제 요청에 실패했습니다.");
    }
  };

  const onSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    return await createPledge(request);
  };

  return {
    request,
    setRequest,
    onSubmit,
    onPledgeAndPayment,
    isLoading,
    error,
    response,
    createPledge,
  };
};
