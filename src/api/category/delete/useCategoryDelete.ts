import { useState } from "react";
import { ApiResult } from "@api/_common/types";
import { useApiHandler } from "@api/_common/useApiHandler";
import { CATEGORY_ENDPOINTS } from "@api/category/constants";

export const useCategoryDelete = () => {
  const { isLoading, error, handleApiCall } = useApiHandler();
  const [response, setResponse] = useState<ApiResult<void> | null>(null);

  const deleteCategory = async (id: number): Promise<ApiResult<void>> => {
    const res = await handleApiCall<void>({
      url: CATEGORY_ENDPOINTS.ADMIN.DELETE(id),
      method: "DELETE",
    });
    setResponse(res);
    return res;
  };

  return {
    deleteCategory,
    isLoading,
    error,
    response,
  };
};
