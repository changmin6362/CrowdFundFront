import { useState } from "react";
import { ApiResult, CursorRequest } from "@api/_common/types";
import { useApiHandler } from "@api/_common/useApiHandler";
import { COMMENT_ENDPOINTS } from "@api/comment/constants";
import { MyCommentFetchResponse } from "./myCommentFetchResponse";

export const useMyCommentFetch = () => {
  const { isLoading, error, handleApiCall } = useApiHandler();
  const [response, setResponse] = useState<ApiResult<MyCommentFetchResponse> | null>(null);

  const fetchMyComments = async (
    query?: CursorRequest & { limit?: number }
  ): Promise<ApiResult<MyCommentFetchResponse>> => {
    const res = await handleApiCall<MyCommentFetchResponse>({
      url: COMMENT_ENDPOINTS.MY.FETCH,
      method: "GET",
      params: query,
    });
    setResponse(res);
    return res;
  };

  return {
    fetchMyComments,
    isLoading,
    error,
    response,
  };
};
