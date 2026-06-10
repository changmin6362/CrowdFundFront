'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useRewardFetch } from '@api/reward/user/fetch/useRewardFetch';
import { useRewardCreate } from '@api/reward/creator/create/useRewardCreate';
import { useRewardUpdate } from '@api/reward/creator/update/useRewardUpdate';
import { useRewardUpdateStock } from '@api/reward/creator/update-stock/useRewardUpdateStock';
import { useRewardDelete } from '@api/reward/creator/delete/useRewardDelete';
import { ROUTES } from '@/constants/routes';

export default function RewardManagementPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.id ? Number(params.id) : 0;

  const { response: fetchResponse, isLoading: isFetchLoading, handleRefresh } = useRewardFetch(projectId);
  const rewards = fetchResponse?.data?.rewards || [];

  const { 
    request: createRequest, 
    isAdding,
    setIsAdding,
    handleInputChange: handleCreateInputChange,
    onFormSubmit: onCreateSubmit, 
    isLoading: isCreateLoading 
  } = useRewardCreate();

  const {
    request: updateRequest,
    editingRewardId,
    setEditingRewardId,
    startEdit,
    handleInputChange: handleUpdateInputChange,
    onFormSubmit: onUpdateSubmit,
    isLoading: isUpdateLoading
  } = useRewardUpdate();

  const {
    request: stockRequest,
    setRequest: setStockRequest,
    stockEditingId,
    setStockEditingId,
    startStockEdit,
    onFormSubmit: onStockSubmit,
    isLoading: isStockLoading
  } = useRewardUpdateStock();

  const { deleteReward, isLoading: isDeleteLoading } = useRewardDelete();

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">리워드 관리</h1>
          <p className="text-gray-500 text-sm mt-1">프로젝트의 리워드를 구성하고 관리하세요.</p>
        </div>
        <button
          onClick={() => router.push(ROUTES.CREATOR.EDIT_PROJECT(projectId))}
          className="text-blue-600 hover:underline text-sm"
        >
          프로젝트 수정으로 돌아가기
        </button>
      </div>

      {/* 리워드 추가 섹션 */}
      <div className="mb-10">
        {!isAdding ? (
          <button
            onClick={() => setIsAdding(true)}
            className="w-full py-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-500 hover:text-blue-500 transition flex items-center justify-center font-medium"
          >
            + 새 리워드 추가하기
          </button>
        ) : (
          <div className="bg-white p-6 border rounded-lg shadow-sm">
            <h2 className="text-lg font-bold mb-4">새 리워드 추가</h2>
            <form onSubmit={(e) => onCreateSubmit(e, projectId, handleRefresh)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">리워드 제목</label>
                <input
                  type="text"
                  name="title"
                  value={createRequest.title}
                  onChange={handleCreateInputChange}
                  className="w-full p-2 border rounded outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="예: 얼리버드 혜택 A"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">리워드 설명</label>
                <textarea
                  name="description"
                  value={createRequest.description}
                  onChange={handleCreateInputChange}
                  className="w-full p-2 border rounded outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="리워드 구성을 설명해 주세요."
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">금액 (원)</label>
                  <input
                    type="number"
                    name="price"
                    value={createRequest.price}
                    onChange={handleCreateInputChange}
                    className="w-full p-2 border rounded outline-none focus:ring-2 focus:ring-blue-500"
                    min="1000"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">초기 재고 (개)</label>
                  <input
                    type="number"
                    name="stock"
                    value={createRequest.stock}
                    onChange={handleCreateInputChange}
                    className="w-full p-2 border rounded outline-none focus:ring-2 focus:ring-blue-500"
                    min="1"
                    required
                  />
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  disabled={isCreateLoading}
                  className="flex-1 bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700 disabled:bg-gray-400"
                >
                  {isCreateLoading ? '저장 중...' : '리워드 저장'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="px-4 py-2 border rounded font-medium hover:bg-gray-50"
                >
                  취소
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* 리워드 목록 */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold">등록된 리워드 ({rewards.length})</h2>
        {isFetchLoading ? (
          <div className="py-10 text-center text-gray-500">리워드 목록을 불러오는 중...</div>
        ) : rewards.length === 0 ? (
          <div className="py-10 text-center border rounded-lg bg-gray-50 text-gray-500">
            아직 등록된 리워드가 없습니다.
          </div>
        ) : (
          rewards.map((reward) => (
            <div key={reward.rewardId} className="bg-white border rounded-lg shadow-sm overflow-hidden">
              {editingRewardId === reward.rewardId ? (
                /* 수정 폼 */
                <form 
                  onSubmit={(e) => reward.rewardId && onUpdateSubmit(e, reward.rewardId, handleRefresh)} 
                  className="p-6 space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">리워드 제목</label>
                    <input
                      type="text"
                      name="title"
                      value={updateRequest.title}
                      onChange={handleUpdateInputChange}
                      className="w-full p-2 border rounded outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">리워드 설명</label>
                    <textarea
                      name="description"
                      value={updateRequest.description}
                      onChange={handleUpdateInputChange}
                      className="w-full p-2 border rounded outline-none focus:ring-2 focus:ring-blue-500"
                      rows={3}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">금액 (원)</label>
                    <input
                      type="number"
                      name="price"
                      value={updateRequest.price}
                      onChange={handleUpdateInputChange}
                      className="w-full p-2 border rounded outline-none focus:ring-2 focus:ring-blue-500"
                      min="1000"
                      required
                    />
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button
                      type="submit"
                      disabled={isUpdateLoading}
                      className="flex-1 bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700 disabled:bg-gray-400"
                    >
                      {isUpdateLoading ? '수정 중...' : '수정 완료'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingRewardId(null)}
                      className="px-4 py-2 border rounded font-medium hover:bg-gray-50"
                    >
                      취소
                    </button>
                  </div>
                </form>
              ) : (
                /* 리워드 카드 상세 */
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-gray-900">{reward.title}</h3>
                        <span className="bg-blue-50 text-blue-600 text-xs px-2 py-0.5 rounded-full font-bold">
                          {reward.price?.toLocaleString()}원
                        </span>
                      </div>
                      <p className="text-gray-600 mt-2 text-sm whitespace-pre-wrap">{reward.description}</p>
                      
                      <div className="mt-4 flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500">남은 수량:</span>
                          {stockEditingId === reward.rewardId ? (
                            <form 
                              onSubmit={(e) => reward.rewardId && onStockSubmit(e, reward.rewardId, handleRefresh)} 
                              className="flex items-center gap-2"
                            >
                              <input
                                type="number"
                                value={stockRequest.stock}
                                onChange={(e) => setStockRequest({ stock: Number(e.target.value) })}
                                className="w-20 p-1 border rounded text-center outline-none"
                                min="0"
                              />
                              <button type="submit" className="text-blue-600 font-bold" disabled={isStockLoading}>
                                확인
                              </button>
                              <button type="button" onClick={() => setStockEditingId(null)} className="text-gray-400">
                                취소
                              </button>
                            </form>
                          ) : (
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-gray-900">{reward.stock}개</span>
                              <button
                                onClick={() => startStockEdit(reward)}
                                className="text-blue-500 hover:underline text-xs"
                              >
                                변경
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => startEdit(reward)}
                        className="p-2 text-gray-400 hover:text-blue-500 transition"
                        title="수정"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => reward.rewardId && deleteReward(reward.rewardId, handleRefresh)}
                        className="p-2 text-gray-400 hover:text-red-500 transition"
                        disabled={isDeleteLoading}
                        title="삭제"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
