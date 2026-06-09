import { useState } from "react";
import { ApiResult } from "@api/_common/types";
import { useApiHandler } from "@api/_common/useApiHandler";
import { PLEDGE_ADDRESS_ENDPOINTS } from "@api/pledge-address/constants";
import { PledgeAddressReplaceRequest } from "@api/pledge-address/replace/pledgeAddressReplaceRequest";
import { PledgeAddressReplaceResponse } from "@api/pledge-address/replace/pledgeAddressReplaceResponse";

export const usePledgeAddressReplace = () => {
  const { isLoading, error, handleApiCall } = useApiHandler();
  const [response, setResponse] = useState<ApiResult<PledgeAddressReplaceResponse> | null>(null);

  const [request, setRequest] = useState<PledgeAddressReplaceRequest>({
    addressId: 0,
  });

  const replacePledgeAddress = async (
    pledgeId: number,
    data: PledgeAddressReplaceRequest
  ): Promise<ApiResult<PledgeAddressReplaceResponse>> => {
    return handleApiCall<PledgeAddressReplaceResponse>({
      url: PLEDGE_ADDRESS_ENDPOINTS.REPLACE(pledgeId),
      method: 'PUT',
      data,
    });
  };

  const onSubmit = async (pledgeId: number) => {
    try {
      const res = await replacePledgeAddress(pledgeId, request);
      setResponse(res);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setResponse({ message, data: null });
    }
  };

  return {
    request,
    setRequest,
    onSubmit,
    isLoading,
    error,
    response,
  };
};
