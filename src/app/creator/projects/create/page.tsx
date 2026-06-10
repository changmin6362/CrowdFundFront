'use client';

import React from 'react';
import { useProjectCreate } from '@api/project/creator/create/useProjectCreate';

export default function ProjectCreatePage() {
  const {
    request,
    handleInputChange,
    onSubmit,
    isLoading,
    isCategoryLoading,
    categories,
  } = useProjectCreate();

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-2xl font-bold mb-8">새 프로젝트 등록</h1>
      
      <form onSubmit={onSubmit} className="space-y-6 bg-white p-8 border rounded-lg shadow-sm">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">카테고리</label>
          <select
            name="categoryId"
            value={request.categoryId || ''}
            onChange={handleInputChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
            required
            disabled={isCategoryLoading}
          >
            <option value="">카테고리를 선택하세요</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">프로젝트 제목</label>
          <input
            type="text"
            name="title"
            value={request.title}
            onChange={handleInputChange}
            placeholder="사람들의 마음을 사로잡을 제목을 입력하세요"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">목표 금액 (원)</label>
          <input
            type="number"
            name="goalAmount"
            value={request.goalAmount || ''}
            onChange={handleInputChange}
            placeholder="최소 1,000,000원 이상"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
            required
            min={1000000}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">프로젝트 종료일</label>
          <input
            type="datetime-local"
            name="endAt"
            value={request.endAt}
            onChange={handleInputChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">프로젝트 소개 (간략히)</label>
          <textarea
            name="contentBlocks"
            rows={5}
            value={(request.contentBlocks as any)?.blocks?.[0]?.data?.text ?? ''}
            placeholder="프로젝트에 대해 설명해주세요. (추후 에디터 적용 예정)"
            onChange={handleInputChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded font-bold hover:bg-blue-700 transition disabled:bg-gray-400"
            disabled={isLoading}
          >
            {isLoading ? '등록 중...' : '프로젝트 등록하기'}
          </button>
        </div>
      </form>
    </div>
  );
}
