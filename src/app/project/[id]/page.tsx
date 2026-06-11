'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { ROUTES } from "@/constants/routes";
import Link from 'next/link';
import { useProjectDetail } from '@api/project/user/detail/useProjectDetail';
import { useCommentFetch } from '@api/comment/fetch/useCommentFetch';
import { useCommentCreate } from '@api/comment/create/useCommentCreate';

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = params.id ? Number(params.id) : 0;

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

  if (isProjectLoading) return <div className="p-8 text-center">프로젝트 정보를 불러오는 중...</div>;
  if (!project) return <div className="p-8 text-center text-red-500">프로젝트를 찾을 수 없습니다.</div>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* 프로젝트 헤더 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-200 aspect-video rounded-lg flex items-center justify-center">
            <span className="text-gray-500">프로젝트 이미지 영역</span>
          </div>
          <div className="flex flex-col justify-center">
            <div className="mb-4">
              <span className="text-sm text-gray-500">모인 금액</span>
              <p className="text-2xl font-bold text-blue-600">
                {project.currentAmount?.toLocaleString()}원 
                <span className="text-sm font-normal text-gray-500 ml-2">
                  ({Math.round(((project.currentAmount || 0) / (project.goalAmount || 1)) * 100)}%)
                </span>
              </p>
            </div>
            <div className="mb-4">
              <span className="text-sm text-gray-500">남은 시간</span>
              <p className="text-xl font-semibold">
                {project.endAt ? new Date(project.endAt).toLocaleDateString() : '-'} 마감
              </p>
            </div>
            <div className="mb-6">
              <span className="text-sm text-gray-500">목표 금액</span>
              <p className="text-lg">{project.goalAmount?.toLocaleString()}원</p>
            </div>
          </div>
        </div>
      </div>

      {/* 오른쪽: 리워드 목록 */}
      <div className="lg:col-span-1" id="reward-section">
        <h2 className="text-xl font-bold mb-4 pb-2 border-b">리워드 선택</h2>
        <div className="space-y-4">
          {rewards.map((reward) => (
            <Link
              key={reward.rewardId}
              href={`${ROUTES.PROJECT.PLEDGE(projectId)}?rewardId=${reward.rewardId}`}
              className="block p-4 border rounded-lg hover:border-blue-500 cursor-pointer transition bg-white shadow-sm"
            >
              <p className="text-blue-600 font-bold mb-1">{reward.price?.toLocaleString()}원</p>
              <h3 className="font-semibold mb-2">{reward.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{reward.description}</p>
              <div className="flex justify-between text-xs text-gray-400">
                <span>남은 수량: {reward.stock}개</span>
              </div>
            </Link>
          ))}
          {rewards.length === 0 && (
            <p className="text-center text-gray-400 py-4">등록된 리워드가 없습니다.</p>
          ) }
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 왼쪽: 상세 설명 및 댓글 */}
        <div className="lg:col-span-2">
          <section className="mb-12">
            <h2 className="text-xl font-bold mb-4 pb-2 border-b">프로젝트 소개</h2>
            <div className="prose max-w-none">
              <div className="text-gray-700 whitespace-pre-wrap">
                {project.contentBlocks ? JSON.stringify(project.contentBlocks, null, 2) : (
                  <p>{project.title} 프로젝트에 오신 것을 환영합니다. 이 프로젝트는 여러분의 소중한 후원으로 완성됩니다.</p>
                )}
              </div>
            </div>
          </section>

          {/* 댓글 섹션 */}
          <section>
            <h2 className="text-xl font-bold mb-4 pb-2 border-b">커뮤니티 ({comments.length})</h2>
            
            {/* 댓글 작성 폼 */}
            <form onSubmit={onCommentSubmit} className="mb-8 bg-gray-50 p-4 rounded-lg">
              <textarea
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                rows={3}
                placeholder="댓글을 남겨주세요."
                value={commentRequest.content}
                onChange={(e) => setCommentRequest({ content: e.target.value })}
                disabled={isCommentCreating}
              />
              <div className="flex justify-between items-center mt-2">
                <p className={`text-sm ${commentCreateResponse?.data ? 'text-green-600' : 'text-red-500'}`}>
                  {commentCreateResponse?.message}
                </p>
                <button
                  type="submit"
                  className="bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-black disabled:bg-gray-400"
                  disabled={isCommentCreating || !commentRequest.content.trim()}
                >
                  {isCommentCreating ? '등록 중...' : '댓글 등록'}
                </button>
              </div>
            </form>

            {/* 댓글 목록 */}
            <div className="space-y-4">
              {comments.map((comment, index) => (
                <div key={index} className="p-4 border-b">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-semibold text-gray-800">사용자</span>
                    <span className="text-xs text-gray-400">
                      {comment.createdAt ? new Date(comment.createdAt).toLocaleString() : '-'}
                    </span>
                  </div>
                  <p className="text-gray-700">{comment.content}</p>
                </div>
              ))}
              
              {commentFetchResponse?.data?.hasNext && (
                <button
                  onClick={onLoadMore}
                  className="w-full py-3 text-gray-500 hover:text-gray-800 transition border rounded-md mt-4"
                  disabled={isCommentLoading}
                >
                  {isCommentLoading ? '불러오는 중...' : '댓글 더 보기'}
                </button>
              )}
              
              {!isCommentLoading && comments.length === 0 && (
                <p className="text-center text-gray-400 py-8">아직 작성된 댓글이 없습니다.</p>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
