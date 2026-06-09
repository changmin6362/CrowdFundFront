import { useState } from "react";
import { ApiResult, CursorRequest } from "@api/_common/types";
import { useApiHandler } from "@api/_common/useApiHandler";
import { COMMENT_ENDPOINTS } from "@api/comment/constants";
import { CommentFetchResponse } from "./commentFetchResponse";

export const useCommentFetch = () => {
  const { isLoading, error, handleApiCall } = useApiHandler();
  const [response, setResponse] = useState<ApiResult<CommentFetchResponse> | null>(null);

  const fetchProjectComments = async (
    projectId: number,
    query?: CursorRequest & { limit?: number }
  ): Promise<ApiResult<CommentFetchResponse>> => {
    const res = await handleApiCall<CommentFetchResponse>({
      url: COMMENT_ENDPOINTS.PROJECT.FETCH(projectId),
      method: "GET",
      params: query,
    });
    setResponse(res);
    return res;
  };

  return {
    fetchProjectComments,
    isLoading,
    error,
    response,
  };
};
