import { useState } from "react";
import { ApiResult } from "@api/_common/types";
import { useApiHandler } from "@api/_common/useApiHandler";
import { COMMENT_ENDPOINTS } from "@api/comment/constants";
import { CommentDeleteResponse } from "./commentDeleteResponse";

export const useCommentDelete = () => {
  const { isLoading, error, handleApiCall } = useApiHandler();
  const [response, setResponse] = useState<ApiResult<CommentDeleteResponse> | null>(null);

  const deleteMyComment = async (
    commentId: number
  ): Promise<ApiResult<CommentDeleteResponse>> => {
    const res = await handleApiCall<CommentDeleteResponse>({
      url: COMMENT_ENDPOINTS.MY.DELETE(commentId),
      method: "DELETE",
    });
    setResponse(res);
    return res;
  };

  return {
    deleteMyComment,
    isLoading,
    error,
    response,
  };
};
