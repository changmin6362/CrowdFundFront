import { useState } from "react";
import { ApiResult } from "@api/_common/types";
import { useApiHandler } from "@api/_common/useApiHandler";
import { CATEGORY_ENDPOINTS } from "@api/category/constants";

export const useCategoryDelete = () => {
  const { isLoading, error, handleApiCall } = useApiHandler();
  const [response, setResponse] = useState<ApiResult | null>(null);

  const deleteCategory = async (id: number): Promise<ApiResult> => {
    const res = await handleApiCall<void>({
      url: CATEGORY_ENDPOINTS.ADMIN.DELETE(id),
      method: "DELETE",
    });
    setResponse(res);
    return res;
  };

  const onDelete = async (id: number, onSuccess?: () => void) => {
    if (confirm("정말로 이 카테고리를 삭제하시겠습니까? 하위 카테고리도 모두 삭제될 수 있습니다.")) {
      try {
        await deleteCategory(id);
        alert("카테고리가 삭제되었습니다.");
        if (onSuccess) onSuccess();
      } catch (err) {
        alert(`삭제 실패: ${err instanceof Error ? err.message : '알 수 없는 오류'}`);
      }
    }
  };

  return {
    onDelete,
    deleteCategory,
    isLoading,
    error,
    response,
  };
};
