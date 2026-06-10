'use client';

import React, { useCallback } from 'react';
import { useParams } from 'next/navigation';
import { useMyPledgeDetail } from '@api/pledge/my/detail/useMyPledgeDetail';
import { usePaymentHistory } from '@api/payment/history/usePaymentHistory';
import { useMyPledgeCancel } from '@api/pledge/my/cancel/useMyPledgeCancel';
import { usePaymentRefund } from '@api/payment/refund/usePaymentRefund';
import { usePaymentDetail } from '@api/payment/detail/usePaymentDetail';
import { ROUTES } from '@/constants/routes';
import Link from 'next/link';

export default function PledgeDetailPage() {
  const params = useParams();
  const pledgeId = Number(params.id);

  const { 
    response: detailResponse, 
    isLoading: isPledgeLoading, 
    fetchMyPledgeDetail 
  } = useMyPledgeDetail(pledgeId);
  
  const { 
    response: paymentResponse,
    fetchPaymentDetailByPledge
  } = usePaymentDetail(pledgeId);

  const paymentData = paymentResponse?.data?.paymentDetail;
  const paymentId = paymentData?.paymentId;

  const { 
    response: historyResponse, 
    isLoading: isHistoryLoading, 
    fetchPaymentHistory 
  } = usePaymentHistory(paymentId);

  const { cancelPledge, isLoading: isCancelling } = useMyPledgeCancel();
  const { refundPayment, isLoading: isRefunding } = usePaymentRefund();

  const detail = detailResponse?.data?.myPledgeDetail;
  const payment = paymentData;
  const history = historyResponse?.data?.paymentHistories || [];

  const loadData = useCallback(async () => {
    // 훅 내부의 useEffect가 있지만, 상태 변경(취소/환불) 후 수동 갱신을 위해 호출
    await fetchMyPledgeDetail();
    const payRes = await fetchPaymentDetailByPledge();
    
    const updatedPaymentId = payRes?.data?.paymentDetail?.paymentId;
    if (updatedPaymentId) {
      await fetchPaymentHistory(updatedPaymentId);
    }
  }, [fetchMyPledgeDetail, fetchPaymentDetailByPledge, fetchPaymentHistory]);

  const handleCancel = async () => {
    if (!confirm('후원을 취소하시겠습니까?')) return;
    try {
      await cancelPledge(pledgeId);
      alert('후원이 취소되었습니다.');
      loadData();
    } catch (err: any) {
      alert(err.message || '취소 실패');
    }
  };

  const handleRefund = async () => {
    if (!payment?.paymentId) return;
    if (!confirm('환불을 요청하시겠습니까?')) return;
    try {
      await refundPayment(payment.paymentId);
      alert('환불 요청이 완료되었습니다.');
      loadData();
    } catch (err: any) {
      alert(err.message || '환불 실패');
    }
  };

  if (isPledgeLoading) return <div className="p-8 text-center">정보를 불러오는 중...</div>;
  if (!detail) return <div className="p-8 text-center text-red-500">후원 정보를 찾을 수 없습니다.</div>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">후원 상세 정보</h1>
        <Link href={ROUTES.MY_PAGE_PLEDGES} className="text-sm text-blue-600 hover:underline">
          목록으로 돌아가기
        </Link>
      </div>

      {/* 후원 기본 정보 */}
      <section className="bg-white border rounded-xl p-6 mb-6 shadow-sm">
        <h2 className="text-lg font-bold mb-4 pb-2 border-b">프로젝트 정보</h2>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-500 text-sm">프로젝트명</span>
            <span className="font-medium">{detail.projectTitle}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 text-sm">선택한 리워드</span>
            <span className="font-medium">{detail.rewardName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 text-sm">후원 금액</span>
            <span className="font-bold text-blue-600">{detail.amount?.toLocaleString()}원</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 text-sm">후원 상태</span>
            <span className={`px-2 py-0.5 rounded text-xs font-bold ${
              detail.status === 'PAID' ? 'bg-green-100 text-green-700' : 
              detail.status === 'REFUNDED' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
            }`}>
              {detail.status}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 text-sm">보상 이행 상태</span>
            <span className="font-medium text-sm">{detail.fulfillmentStatus}</span>
          </div>
        </div>
      </section>

      {/* 결제 정보 */}
      <section className="bg-white border rounded-xl p-6 mb-6 shadow-sm">
        <h2 className="text-lg font-bold mb-4 pb-2 border-b">결제 및 배송 정보</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-400 mb-1">결제 수단</p>
              <p className="font-medium">{detail.paymentMethod}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">결제 상태</p>
              <p className="font-medium">{payment?.status || '-'}</p>
            </div>
          </div>
          
          <div className="pt-4 border-t">
            <p className="text-sm font-bold mb-2">배송지 정보</p>
            <div className="bg-gray-50 p-4 rounded-lg text-sm space-y-1">
              <p><span className="text-gray-500">받는 사람:</span> {detail.shippingAddress?.recipientName}</p>
              <p><span className="text-gray-500">연락처:</span> {detail.shippingAddress?.recipientPhone}</p>
              <p><span className="text-gray-500">주소:</span> [{detail.shippingAddress?.postalCode}] {detail.shippingAddress?.addressMain} {detail.shippingAddress?.addressDetail}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 결제 이력 */}
      <section className="bg-white border rounded-xl p-6 mb-8 shadow-sm">
        <h2 className="text-lg font-bold mb-4 pb-2 border-b">결제 이력</h2>
        {isHistoryLoading ? (
          <p className="text-sm text-gray-500 py-4">이력을 불러오는 중...</p>
        ) : history.length === 0 ? (
          <p className="text-sm text-gray-500 py-4">결제 이력이 없습니다.</p>
        ) : (
          <div className="space-y-4">
            {history.map((h) => (
              <div key={h.historyId} className="flex items-start gap-4 text-sm border-l-2 border-gray-100 pl-4 relative">
                <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-gray-200" />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold">{h.status}</span>
                    <span className="text-xs text-gray-400">
                      {h.changedAt ? new Date(h.changedAt).toLocaleString() : '-'}
                    </span>
                  </div>
                  <p className="text-gray-600">{h.reason}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 관리 액션 */}
      <div className="flex gap-4">
        {detail.status === 'PENDING' && (
          <button
            onClick={handleCancel}
            disabled={isCancelling}
            className="flex-1 bg-red-50 text-red-600 font-bold py-3 rounded-xl hover:bg-red-100 transition disabled:opacity-50"
          >
            {isCancelling ? '취소 처리 중...' : '후원 취소하기'}
          </button>
        )}
        {detail.status === 'PAID' && (
          <button
            onClick={handleRefund}
            disabled={isRefunding}
            className="flex-1 bg-gray-100 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-200 transition disabled:opacity-50"
          >
            {isRefunding ? '환불 요청 중...' : '환불 요청하기'}
          </button>
        )}
      </div>
    </div>
  );
}
