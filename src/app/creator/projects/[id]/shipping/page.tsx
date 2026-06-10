'use client';

import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import { useProjectShippingFetch } from '@api/project/creator/shipping/useProjectShippingFetch';
import { useCreatorPledgeFulfill } from '@api/pledge/creator/fulfill/useCreatorPledgeFulfill';
import { useAdminPledgeFetch } from '@api/pledge/admin/fetch/useAdminPledgeFetch';

export default function ProjectShippingPage() {
  const params = useParams();
  const projectId = Number(params.id);

  // 배송지 정보 조회
  const { response: shippingResponse, isLoading: isShippingLoading } = useProjectShippingFetch(projectId);
  
  // 후원 목록 조회 (관리자용을 프로젝트 필터링으로 활용)
  const adminPledgeProps = useMemo(() => ({ projectId, limit: 100 }), [projectId]);
  const { pledges, isLoading: isPledgeLoading, handleRefresh: refreshPledges } = useAdminPledgeFetch(adminPledgeProps);

  // 이행 처리 핸들러
  const { onFulfill, isLoading: isFulfilling } = useCreatorPledgeFulfill({
    onSuccess: () => refreshPledges()
  });

  const shippingInfos = shippingResponse?.data?.shippingInfos || [];
  const isLoading = isShippingLoading || isPledgeLoading;

  const getPledgeStatus = (userId: number | undefined) => {
    if (!userId) return null;
    return pledges.find(p => p.userId === userId);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">프로젝트 배송 및 이행 관리</h1>

      {isLoading && <p>로딩 중...</p>}

      {!isLoading && shippingInfos.length === 0 && (
        <div className="bg-white p-10 text-center border rounded">
          <p className="text-gray-500">후원자 배송지 정보가 없습니다.</p>
        </div>
      )}

      {!isLoading && shippingInfos.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="px-4 py-2 text-left">후원자</th>
                <th className="px-4 py-2 text-left">연락처</th>
                <th className="px-4 py-2 text-left">주소</th>
                <th className="px-4 py-2 text-left">후원 상태</th>
                <th className="px-4 py-2 text-left">이행 상태</th>
                <th className="px-4 py-2 text-center">작업</th>
              </tr>
            </thead>
            <tbody>
              {shippingInfos.map((info) => {
                const pledge = getPledgeStatus(info.userId);
                return (
                  <tr key={info.addressId} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{info.recipientName}</td>
                    <td className="px-4 py-2">{info.phone}</td>
                    <td className="px-4 py-2">
                      ({info.postalCode}) {info.addressMain} {info.addressDetail}
                    </td>
                    <td className="px-4 py-2">
                      {pledge ? (
                        <span className={`px-2 py-1 rounded text-xs ${
                          pledge.status === 'PAID' ? 'bg-green-100 text-green-800' :
                          pledge.status === 'REFUNDED' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {pledge.status}
                        </span>
                      ) : '-'}
                    </td>
                    <td className="px-4 py-2">
                      {pledge ? (
                        <span className={`px-2 py-1 rounded text-xs ${
                          pledge.fulfillmentStatus === 'FULFILLED' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {pledge.fulfillmentStatus}
                        </span>
                      ) : '-'}
                    </td>
                    <td className="px-4 py-2 text-center">
                      {pledge && pledge.fulfillmentStatus === 'READY' && pledge.status === 'PAID' && (
                        <button
                          onClick={() => pledge.pledgeId && onFulfill(pledge.pledgeId)}
                          disabled={isFulfilling}
                          className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 disabled:bg-gray-400"
                        >
                          배송 시작
                        </button>
                      )}
                      {pledge?.fulfillmentStatus === 'FULFILLED' && (
                        <span className="text-green-600 text-sm font-medium">이행 완료</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
