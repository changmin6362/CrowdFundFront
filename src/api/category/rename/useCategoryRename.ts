import { useState } from "react";
import { ApiResult } from "@api/_common/types";
import { useApiHandler } from "@api/_common/useApiHandler";
import { CATEGORY_ENDPOINTS } from "@api/category/constants";
import { CategoryRenameRequest } from "./categoryRenameRequest";

export const useCategoryRename = () => {
  const { isLoading, error, handleApiCall } = useApiHandler();
  const [response, setResponse] = useState<ApiResult<void> | null>(null);

  const [request, setRequest] = useState<CategoryRenameRequest>({
    name: "",
  });

  const renameCategory = async (id: number, data: CategoryRenameRequest): Promise<ApiResult<void>> => {
    const res = await handleApiCall<void>({
      url: CATEGORY_ENDPOINTS.ADMIN.RENAME(id),
      method: "PATCH",
      data,
    });
    setResponse(res);
    return res;
  };

  const onSubmit = async (id: number, e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await renameCategory(id, request);
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
    renameCategory,
    isLoading,
    error,
    response,
  };
};
