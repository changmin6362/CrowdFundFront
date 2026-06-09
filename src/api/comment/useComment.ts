import { ApiResult, CursorRequest } from "@api/_common/types";
import { useApiHandler } from "@api/_common/useApiHandler";
import { COMMENT_ENDPOINTS } from "@api/comment/constants";
import {
  ProjectCommentCreateRequest,
  ProjectCommentCreateResponse,
  ProjectCommentsFetchResponse
} from "@api/comment/project/types";
import {
  MyCommentsResponse,
  ProjectCommentDeleteResponse,
  ProjectCommentUpdateRequest,
  ProjectCommentUpdateResponse
} from "@api/comment/my/types";

export const useComment = () => {
  const { isLoading, error, handleApiCall } = useApiHandler();

  /**
   * [Project] 프로젝트 댓글 목록 조회
   */
  const fetchProjectComments = async (
    projectId: number,
    query?: CursorRequest & { limit?: number }
  ): Promise<ApiResult<ProjectCommentsFetchResponse>> => {
    return handleApiCall<ProjectCommentsFetchResponse>({
      url: COMMENT_ENDPOINTS.PROJECT.FETCH(projectId),
      method: 'GET',
      params: query,
    });
  };

  /**
   * [Project] 프로젝트 댓글 작성
   */
  const createComment = async (
    projectId: number,
    data: ProjectCommentCreateRequest
  ): Promise<ApiResult<ProjectCommentCreateResponse>> => {
    return handleApiCall<ProjectCommentCreateResponse>({
      url: COMMENT_ENDPOINTS.PROJECT.CREATE(projectId),
      method: 'POST',
      data,
    });
  };

  /**
   * [My] 내 댓글 목록 조회
   */
  const fetchMyComments = async (
    query?: CursorRequest & { limit?: number }
  ): Promise<ApiResult<MyCommentsResponse>> => {
    return handleApiCall<MyCommentsResponse>({
      url: COMMENT_ENDPOINTS.MY.FETCH,
      method: 'GET',
      params: query,
    });
  };

  /**
   * [My] 내 댓글 수정
   */
  const updateMyComment = async (
    commentId: number,
    data: ProjectCommentUpdateRequest
  ): Promise<ApiResult<ProjectCommentUpdateResponse>> => {
    return handleApiCall<ProjectCommentUpdateResponse>({
      url: COMMENT_ENDPOINTS.MY.UPDATE(commentId),
      method: 'PATCH',
      data,
    });
  };

  /**
   * [My] 내 댓글 삭제
   */
  const deleteMyComment = async (
    commentId: number
  ): Promise<ApiResult<ProjectCommentDeleteResponse>> => {
    return handleApiCall<ProjectCommentDeleteResponse>({
      url: COMMENT_ENDPOINTS.MY.DELETE(commentId),
      method: 'DELETE',
    });
  };

  return {
    fetchProjectComments,
    createComment,
    fetchMyComments,
    updateMyComment,
    deleteMyComment,
    isLoading,
    error,
  };
};
