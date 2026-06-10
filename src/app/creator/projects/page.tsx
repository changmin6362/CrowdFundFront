'use client';

import React from 'react';
import Link from 'next/link';
import { useProjectMyFetch } from '@api/project/creator/fetch/useProjectMyFetch';
import { useProjectDelete } from '@api/project/creator/delete/useProjectDelete';
import { ROUTES } from '@/constants/routes';

export default function MyProjectsPage() {
  const { 
    projects, 
    isLoading: isFetchLoading, 
    handleRefresh,
    error: fetchError
  } = useProjectMyFetch();

  const { onDelete, isLoading: isDeleteLoading } = useProjectDelete(handleRefresh);

  const isLoading = isFetchLoading || isDeleteLoading;

  if (fetchError && projects.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-red-500 mb-4">{fetchError}</p>
        <button 
          onClick={() => handleRefresh()}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          다시 시도
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">내가 만든 프로젝트</h1>
        <Link 
          href={ROUTES.CREATOR.CREATE_PROJECT}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          새 프로젝트 만들기
        </Link>
      </div>

      {isLoading && projects.length === 0 ? (
        <div className="text-center py-20">로딩 중...</div>
      ) : projects.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed rounded-lg">
          <p className="text-gray-500 mb-4">아직 만든 프로젝트가 없습니다.</p>
          <Link 
            href={ROUTES.CREATOR.CREATE_PROJECT}
            className="text-blue-600 hover:underline"
          >
            첫 프로젝트를 등록해보세요!
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.projectId} className="border rounded-lg overflow-hidden shadow-sm bg-white">
              <div className="bg-gray-200 aspect-video flex items-center justify-center relative">
                <span className="text-gray-400">이미지 없음</span>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-medium px-2 py-1 rounded bg-gray-100 text-gray-600">
                    프로젝트 #{project.projectId}
                  </span>
                  <span className={`text-xs font-medium px-2 py-1 rounded ${
                    project.status === 'ONGOING' ? 'bg-green-100 text-green-700' : 
                    project.status === 'COMPLETED' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {project.status === 'ONGOING' ? '진행중' : 
                     project.status === 'COMPLETED' ? '성공' : 
                     project.status === 'CANCELED' ? '취소' : project.status}
                  </span>
                </div>
                <h3 className="font-bold text-lg mb-2 truncate">{project.title}</h3>
                <div className="space-y-1 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">목표 금액</span>
                    <span className="font-medium">{project.goalAmount?.toLocaleString()}원</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">모인 금액</span>
                    <span className="font-medium text-blue-600">{project.currentAmount?.toLocaleString()}원</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link 
                    href={project.projectId !== undefined ? ROUTES.CREATOR.EDIT_PROJECT(project.projectId) : '#'}
                    className="flex-1 text-center py-2 border rounded text-sm hover:bg-gray-50"
                  >
                    수정
                  </Link>
                  <button 
                    onClick={() => {
                      if (project.projectId !== undefined) {
                        onDelete(project.projectId);
                      }
                    }}
                    className="flex-1 py-2 border border-red-200 text-red-600 rounded text-sm hover:bg-red-50"
                    disabled={isLoading || project.projectId === undefined}
                  >
                    삭제
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
