import { ApiResult } from "@api/_common/types";
import { useApiHandler } from "@api/_common/useApiHandler";
import { PLEDGE_ADDRESS_ENDPOINTS } from "@api/pledge-address/constants";
import {
  PledgeAddressReplaceRequest,
  PledgeAddressReplaceResponse
} from "@api/pledge-address/types";

export const usePledgeAddress = () => {
  const { isLoading, error, handleApiCall } = useApiHandler();

  /**
   * 참여한 후원의 배송 정보 교체
   */
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

  return {
    replacePledgeAddress,
    isLoading,
    error,
  };
};
