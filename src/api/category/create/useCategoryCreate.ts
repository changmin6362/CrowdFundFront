import { useState } from "react";
import { ApiResult } from "@api/_common/types";
import { useApiHandler } from "@api/_common/useApiHandler";
import { CATEGORY_ENDPOINTS } from "@api/category/constants";
import { CategoryCreateRequest } from "./categoryCreateRequest";
import { CategoryCreateResponse } from "./categoryCreateResponse";

export const useCategoryCreate = () => {
  const { isLoading, error, handleApiCall } = useApiHandler();
  const [response, setResponse] = useState<ApiResult<CategoryCreateResponse> | null>(null);

  const [request, setRequest] = useState<CategoryCreateRequest>({
    name: "",
  });

  const createCategory = async (data: CategoryCreateRequest): Promise<ApiResult<CategoryCreateResponse>> => {
    const res = await handleApiCall<CategoryCreateResponse>({
      url: CATEGORY_ENDPOINTS.ADMIN.CREATE,
      method: "POST",
      data,
    });
    setResponse(res);
    return res;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await createCategory(request);
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
    createCategory,
    isLoading,
    error,
    response,
  };
};
