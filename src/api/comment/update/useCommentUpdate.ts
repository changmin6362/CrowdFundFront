import { useState } from "react";
import { ApiResult } from "@api/_common/types";
import { useApiHandler } from "@api/_common/useApiHandler";
import { COMMENT_ENDPOINTS } from "@api/comment/constants";
import { CommentUpdateRequest } from "./commentUpdateRequest";
import { CommentUpdateResponse } from "./commentUpdateResponse";

export const useCommentUpdate = () => {
  const { isLoading, error, handleApiCall } = useApiHandler();
  const [response, setResponse] = useState<ApiResult<CommentUpdateResponse> | null>(null);

  const [request, setRequest] = useState<CommentUpdateRequest>({
    content: "",
  });

  const updateMyComment = async (
    commentId: number,
    data: CommentUpdateRequest
  ): Promise<ApiResult<CommentUpdateResponse>> => {
    const res = await handleApiCall<CommentUpdateResponse>({
      url: COMMENT_ENDPOINTS.MY.UPDATE(commentId),
      method: "PATCH",
      data,
    });
    setResponse(res);
    return res;
  };

  const onSubmit = async (commentId: number, e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await updateMyComment(commentId, request);
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
    updateMyComment,
    isLoading,
    error,
    response,
  };
};
