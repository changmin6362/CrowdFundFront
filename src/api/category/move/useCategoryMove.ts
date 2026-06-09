import { useState } from "react";
import { ApiResult } from "@api/_common/types";
import { useApiHandler } from "@api/_common/useApiHandler";
import { CATEGORY_ENDPOINTS } from "@api/category/constants";
import { CategoryMoveRequest } from "./categoryMoveRequest";

export const useCategoryMove = () => {
  const { isLoading, error, handleApiCall } = useApiHandler();
  const [response, setResponse] = useState<ApiResult<void> | null>(null);

  const [request, setRequest] = useState<CategoryMoveRequest>({
    parentId: undefined,
  });

  const moveCategory = async (id: number, data: CategoryMoveRequest): Promise<ApiResult<void>> => {
    const res = await handleApiCall<void>({
      url: CATEGORY_ENDPOINTS.ADMIN.MOVE(id),
      method: "PATCH",
      data,
    });
    setResponse(res);
    return res;
  };

  const onSubmit = async (id: number, e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await moveCategory(id, request);
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
    moveCategory,
    isLoading,
    error,
    response,
  };
};
