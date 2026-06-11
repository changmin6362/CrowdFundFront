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
    addressId: number
  ): Promise<ApiResult<PledgeAddressReplaceResponse>> => {
    const res = await handleApiCall<PledgeAddressReplaceResponse>({
      url: PLEDGE_ADDRESS_ENDPOINTS.REPLACE(pledgeId),
      method: 'PUT',
      data: {
        addressId,
      },
    });
    setResponse(res);
    return res;
  };

  const onSubmit = async (pledgeId: number, addressId: number) => {
    return await replacePledgeAddress(pledgeId, addressId);
  };

  return {
    request,
    setRequest,
    onSubmit,
    isLoading,
    error,
    response,
    replacePledgeAddress,
  };
};
