'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { useAdminPledgeDetail } from '@api/pledge/admin/detail/useAdminPledgeDetail';
import { AdminPledgeDetail } from '@api/pledge/admin/detail/adminPledgeDetailResponse';
import { ROUTES } from '@/constants/routes';
import Link from 'next/link';

export default function AdminPledgeDetailPage() {
  const params = useParams();
  const pledgeId = params?.id ? Number(params.id) : 0;
  
  const { 
    fetchAdminPledgeDetail, 
    response, 
    isLoading 
  } = useAdminPledgeDetail(pledgeId);
  
  const detail = response?.data?.adminPledgeDetail;

  const loadDetail = useCallback(async () => {
    if (!pledgeId) return;
    try {
      await fetchAdminPledgeDetail();
    } catch (err) {
      console.error('Failed to fetch pledge detail:', err);
    }
  }, [fetchAdminPledgeDetail, pledgeId]);

  useEffect(() => {
    loadDetail();
  }, [loadDetail]);

  if (isLoading) return <div className="p-10 text-center text-gray-500">정보를 불러오는 중...</div>;
  if (!detail) return <div className="p-10 text-center text-red-500">후원 정보를 찾을 수 없습니다.</div>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">후원 상세 관리 (관리자)</h1>
        <Link href={ROUTES.ADMIN.PLEDGES} className="text-sm text-blue-600 hover:underline">
          목록으로 돌아가기
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 기본 정보 */}
        <section className="bg-white border rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-bold mb-4 pb-2 border-b">후원 기본 정보</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-500 text-sm">후원 ID</span>
              <span className="font-medium">#{detail.pledgeId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 text-sm">상태</span>
              <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                detail.status === 'PAID' ? 'bg-green-100 text-green-700' : 
                detail.status === 'REFUNDED' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
              }`}>
                {detail.status}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 text-sm">보상 이행</span>
              <span className="font-medium text-sm">{detail.fulfillmentStatus}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 text-sm">후원 일시</span>
              <span className="font-medium text-sm">{detail.createdAt ? new Date(detail.createdAt).toLocaleString() : '-'}</span>
            </div>
          </div>
        </section>

        {/* 후원자 정보 */}
        <section className="bg-white border rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-bold mb-4 pb-2 border-b">후원자 정보</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-500 text-sm">이름/닉네임</span>
              <span className="font-medium">{detail.user?.name} ({detail.user?.nickname})</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 text-sm">이메일</span>
              <span className="font-medium text-sm">{detail.user?.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 text-sm">연락처</span>
              <span className="font-medium text-sm">{detail.user?.phone || '-'}</span>
            </div>
          </div>
        </section>

        {/* 프로젝트 정보 */}
        <section className="bg-white border rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-bold mb-4 pb-2 border-b">프로젝트 정보</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-500 text-sm">프로젝트 명</span>
              <span className="font-medium text-sm truncate ml-4" title={detail.project?.projectTitle}>
                {detail.project?.projectTitle}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 text-sm">프로젝트 ID</span>
              <span className="font-medium">#{detail.project?.projectId}</span>
            </div>
          </div>
        </section>

        {/* 결제 정보 */}
        <section className="bg-white border rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-bold mb-4 pb-2 border-b">결제 정보</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-500 text-sm">후원 금액</span>
              <span className="font-bold text-blue-600">{detail.payment?.amount?.toLocaleString()}원</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 text-sm">결제 수단</span>
              <span className="font-medium">{detail.payment?.paymentMethod}</span>
            </div>
          </div>
        </section>
      </div>
      
      <div className="mt-8 flex gap-4">
        {/* 필요시 관리자 기능(취소 강제, 상태 변경 등) 버튼 추가 가능 */}
        <button 
          onClick={() => alert('추후 지원 예정 기능입니다.')}
          className="flex-1 bg-gray-100 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-200 transition"
        >
          관리 메모 추가
        </button>
      </div>
    </div>
  );
}
