import { useState } from "react";
import { ApiResult } from "@api/_common/types";
import { useApiHandler } from "@api/_common/useApiHandler";
import { CATEGORY_ENDPOINTS } from "@api/category/constants";
import { CategoryActiveRequest } from "./categoryActiveRequest";

export const useCategoryActive = () => {
  const { isLoading, error, handleApiCall } = useApiHandler();
  const [response, setResponse] = useState<ApiResult | null>(null);

  const [request, setRequest] = useState<CategoryActiveRequest>({
    isActive: true,
  });

  const toggleCategoryActive = async (id: number, data: CategoryActiveRequest): Promise<ApiResult> => {
    const res = await handleApiCall<void>({
      url: CATEGORY_ENDPOINTS.ADMIN.ACTIVE(id),
      method: "PATCH",
      data,
    });
    setResponse(res);
    return res;
  };

  const onSubmit = async (id: number, data: CategoryActiveRequest, onSuccess?: () => void) => {
    try {
      await toggleCategoryActive(id, data);
      if (onSuccess) onSuccess();
    } catch (err: unknown) {
      console.error(err);
    }
  };

  const onToggle = async (id: number, currentActive: boolean, onSuccess?: () => void) => {
    await onSubmit(id, { isActive: !currentActive }, () => {
      alert("카테고리 활성 상태가 변경되었습니다.");
      if (onSuccess) onSuccess();
    });
  };

  return {
    request,
    setRequest,
    onSubmit,
    onToggle,
    toggleCategoryActive,
    isLoading,
    error,
    response,
  };
};
