'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useProjectUpdate } from '@api/project/creator/update/useProjectUpdate';
import { ROUTES } from '@/constants/routes';

export default function ProjectUpdatePage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.id ? Number(params.id) : 0;

  const {
    request,
    handleInputChange,
    onSubmit,
    isLoading: isUpdateLoading,
    projectDetail
  } = useProjectUpdate(projectId);

  if (!projectDetail && !isUpdateLoading) {
    return <div className="p-8 text-center text-red-500">프로젝트를 찾을 수 없거나 불러오는 중입니다.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">프로젝트 수정</h1>
        <p className="text-gray-500 text-sm mt-1">제목과 상세 내용만 수정 가능합니다.</p>
      </div>
      
      <form onSubmit={onSubmit} className="space-y-6 bg-white p-8 border rounded-lg shadow-sm">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">카테고리 (수정 불가)</label>
          <input
            type="text"
            value={projectDetail?.categoryName || ''}
            className="w-full p-2 border rounded bg-gray-50 text-gray-500 outline-none"
            readOnly
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">프로젝트 제목</label>
          <input
            type="text"
            name="title"
            value={request.title}
            onChange={handleInputChange}
            placeholder="제목을 입력하세요"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">목표 금액 (수정 불가)</label>
          <input
            type="text"
            value={projectDetail?.goalAmount?.toLocaleString() + '원'}
            className="w-full p-2 border rounded bg-gray-50 text-gray-500 outline-none"
            readOnly
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">프로젝트 소개</label>
          <textarea
            name="contentBlocks"
            rows={10}
            /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
            value={(request.contentBlocks as any)?.blocks?.[0]?.data?.text ?? ''}
            onChange={handleInputChange}
            placeholder="프로젝트 소개를 입력하세요"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div className="pt-4 flex gap-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-3 rounded font-bold hover:bg-blue-700 transition disabled:bg-gray-400"
            disabled={isUpdateLoading}
          >
            {isUpdateLoading ? '수정 중...' : '프로젝트 수정하기'}
          </button>
          <button
            type="button"
            onClick={() => router.push(ROUTES.CREATOR.REWARDS(projectId))}
            className="flex-1 bg-white border border-blue-600 text-blue-600 py-3 rounded font-bold hover:bg-blue-50 transition"
          >
            리워드 관리하기
          </button>
        </div>
      </form>
    </div>
  );
}
