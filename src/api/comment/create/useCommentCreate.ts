import { useState } from "react";
import { ApiResult } from "@api/_common/types";
import { useApiHandler } from "@api/_common/useApiHandler";
import { COMMENT_ENDPOINTS } from "@api/comment/constants";
import { CommentCreateRequest } from "./commentCreateRequest";
import { CommentCreateResponse } from "./commentCreateResponse";

export const useCommentCreate = (projectId: number, onSuccess?: () => void) => {
  const { isLoading, error, handleApiCall } = useApiHandler();
  const [response, setResponse] = useState<ApiResult<CommentCreateResponse> | null>(null);

  const [request, setRequest] = useState<CommentCreateRequest>({
    content: "",
  });

  const createComment = async (
    id: number,
    data: CommentCreateRequest
  ): Promise<ApiResult<CommentCreateResponse>> => {
    const res = await handleApiCall<CommentCreateResponse>({
      url: COMMENT_ENDPOINTS.PROJECT.CREATE(id),
      method: "POST",
      data,
    });
    setResponse(res);
    return res;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await createComment(projectId, request);
      setResponse(res);
      if (res.data) {
        setRequest({ content: "" });
        onSuccess?.();
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setResponse({ message, data: null, status: 500 });
    }
  };

  return {
    request,
    setRequest,
    onSubmit,
    createComment,
    isLoading,
    error,
    response,
  };
};
