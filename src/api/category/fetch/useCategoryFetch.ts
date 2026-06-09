import { useState } from "react";
import { ApiResult } from "@api/_common/types";
import { useApiHandler } from "@api/_common/useApiHandler";
import { CATEGORY_ENDPOINTS } from "@api/category/constants";
import { CategoryFetchResponse } from "./categoryFetchResponse";

export const useCategoryFetch = () => {
  const { isLoading, error, handleApiCall } = useApiHandler();
  const [response, setResponse] = useState<ApiResult<CategoryFetchResponse> | null>(null);

  const fetchCategories = async (): Promise<ApiResult<CategoryFetchResponse>> => {
    const res = await handleApiCall<CategoryFetchResponse>({
      url: CATEGORY_ENDPOINTS.USER.FETCH,
      method: "GET",
    });
    setResponse(res);
    return res;
  };

  return {
    fetchCategories,
    isLoading,
    error,
    response,
  };
};
