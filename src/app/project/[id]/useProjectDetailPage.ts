'use client';

import { useProjectDetail } from '@api/project/user/detail/useProjectDetail';
import { useCommentFetch } from '@api/comment/fetch/useCommentFetch';
import { useCommentCreate } from '@api/comment/create/useCommentCreate';

export const useProjectDetailPage = (projectId: number) => {

  const { 
    response: projectResponse, 
    isLoading: isProjectLoading 
  } = useProjectDetail(projectId);

  const { 
    comments, 
    onLoadMore, 
    response: commentFetchResponse,
    isLoading: isCommentLoading,
    handleRefresh: refreshComments
  } = useCommentFetch(projectId);

  const {
    request: commentRequest,
    setRequest: setCommentRequest,
    onSubmit: onCommentSubmit,
    isLoading: isCommentCreating,
    response: commentCreateResponse
  } = useCommentCreate(projectId, refreshComments);

  const project = projectResponse?.data?.projectDetail;
  const rewards = project?.rewards || [];

  return {
    project,
    rewards,
    comments,
    onLoadMore,
    commentFetchResponse,
    isProjectLoading,
    isCommentLoading,
    commentRequest,
    setCommentRequest,
    onCommentSubmit,
    isCommentCreating,
    commentCreateResponse
  };
};
