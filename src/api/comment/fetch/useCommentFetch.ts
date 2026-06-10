import { useEffect, useState, useCallback } from "react";
import { ApiResult, CursorRequest } from "@api/_common/types";
import { useApiHandler } from "@api/_common/useApiHandler";
import { COMMENT_ENDPOINTS } from "@api/comment/constants";
import { CommentFetchResponse } from "./commentFetchResponse";
import { CommentInfo } from "../types";

export const useCommentFetch = (projectId: number) => {
  const { isLoading, error, handleApiCall } = useApiHandler();
  const [response, setResponse] = useState<ApiResult<CommentFetchResponse> | null>(null);
  const [comments, setComments] = useState<CommentInfo[]>([]);

  const fetchProjectComments = useCallback(async (
    id: number,
    query?: CursorRequest & { limit?: number },
    isAppend: boolean = false
  ): Promise<ApiResult<CommentFetchResponse>> => {
    try {
      const res = await handleApiCall<CommentFetchResponse>({
        url: COMMENT_ENDPOINTS.PROJECT.FETCH(id),
        method: "GET",
        params: query,
      });
      setResponse(res);
      if (res.data?.comments) {
        setComments(prev => isAppend ? [...prev, ...res.data!.comments!] : res.data!.comments!);
      } else if (!isAppend) {
        setComments([]);
      }
      return res;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      const errorRes = { message, data: null };
      setResponse(errorRes);
      if (!isAppend) setComments([]);
      return errorRes;
    }
  }, [handleApiCall]);

  useEffect(() => {
    if (projectId) {
      fetchProjectComments(projectId);
    }
  }, [projectId, fetchProjectComments]);

  const onLoadMore = () => {
    if (response?.data?.hasNext && response?.data?.nextCursor) {
      fetchProjectComments(projectId, response.data.nextCursor, true);
    }
  };

  return {
    isLoading,
    error,
    response,
    comments,
    onLoadMore,
    handleRefresh: () => fetchProjectComments(projectId),
  };
};
