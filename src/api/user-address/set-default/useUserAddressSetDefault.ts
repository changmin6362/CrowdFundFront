import { useState } from "react";
import { ApiResult } from "@api/_common/types";
import { useApiHandler } from "@api/_common/useApiHandler";
import { USER_ADDRESS_ENDPOINTS } from "@api/user-address/constants";
import { UserAddressSetDefaultResponse } from "@api/user-address/set-default/userAddressSetDefaultResponse";

export const useUserAddressSetDefault = () => {
  const { isLoading, error, handleApiCall } = useApiHandler();
  const [response, setResponse] = useState<ApiResult<UserAddressSetDefaultResponse> | null>(null);

  const setDefaultAddress = async (id: number): Promise<ApiResult<UserAddressSetDefaultResponse>> => {
    const res = await handleApiCall<UserAddressSetDefaultResponse>({
      url: USER_ADDRESS_ENDPOINTS.SET_DEFAULT(id),
      method: 'PATCH',
    });
    setResponse(res);
    return res;
  };

  const onSetDefault = async (id: number, onSuccess?: () => void) => {
    try {
      await setDefaultAddress(id);
      alert("기본 배송지로 설정되었습니다.");
      if (onSuccess) onSuccess();
    } catch (err) {
      alert(`설정 실패: ${err instanceof Error ? err.message : '알 수 없는 오류'}`);
    }
  };

  return {
    onSetDefault,
    setDefaultAddress,
    isLoading,
    error,
    response,
  };
};
