import { useState } from "react";
import { ApiResult } from "@api/_common/types";
import { useApiHandler } from "@api/_common/useApiHandler";
import { USER_ADDRESS_ENDPOINTS } from "@api/user-address/constants";

export const useUserAddressDelete = () => {
  const { isLoading, error, handleApiCall } = useApiHandler();
  const [response, setResponse] = useState<ApiResult | null>(null);

  const deleteAddress = async (id: number): Promise<ApiResult> => {
    const res = await handleApiCall<void>({
      url: USER_ADDRESS_ENDPOINTS.DELETE(id),
      method: 'DELETE',
    });
    setResponse(res);
    return res;
  };

  const onDelete = async (id: number, onSuccess?: () => void) => {
    if (confirm("정말로 이 배송지를 삭제하시겠습니까?")) {
      try {
        await deleteAddress(id);
        alert("배송지가 삭제되었습니다.");
        if (onSuccess) onSuccess();
      } catch (err) {
        alert(`삭제 실패: ${err instanceof Error ? err.message : '알 수 없는 오류'}`);
      }
    }
  };

  return {
    onDelete,
    deleteAddress,
    isLoading,
    error,
    response,
  };
};
