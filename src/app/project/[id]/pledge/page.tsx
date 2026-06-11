'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { ROUTES } from '@/constants/routes';
import { useProjectDetail } from "@api/project/user/detail/useProjectDetail";
import { useRewardFetch } from "@api/reward/user/fetch/useRewardFetch";
import { useUserAddressFetch } from "@api/user-address/fetch/useUserAddressFetch";
import { useMyPledgeCreate } from "@api/pledge/my/create/useMyPledgeCreate";
import { usePaymentCreate } from "@api/payment/create/usePaymentCreate";
import { usePledgeAddressReplace } from "@api/pledge-address/replace/usePledgeAddressReplace";

export default function PledgePage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectId = params.id ? Number(params.id) : 0;
  
  const rewardIdParam = searchParams.get("rewardId");
  const selectedRewardId = rewardIdParam ? Number(rewardIdParam) : 0;

  const { response: projectResponse, isLoading: isProjectLoading } =
    useProjectDetail(projectId);
  const { response: rewardResponse, isLoading: isRewardLoading } =
    useRewardFetch(projectId);
  const { response: addressResponse, isLoading: isAddressLoading } =
    useUserAddressFetch();

  const { createPledge, isLoading: isPledgeLoading } = useMyPledgeCreate();
  const { createPayment, isLoading: isPaymentLoading } = usePaymentCreate();
  const {
    setRequest: setAddressReplaceReq,
    onSubmit: replaceAddress,
  } = usePledgeAddressReplace();

  const [selectedAddressId, setSelectedAddressId] = useState<number>(0);

  const project = projectResponse?.data?.projectDetail;
  const rewards = rewardResponse?.data?.rewards || [];
  const selectedReward = rewards.find((r) => r.rewardId === selectedRewardId);
  
  const addresses = useMemo(
    () => addressResponse?.data?.addresses || [],
    [addressResponse]
  );

  useEffect(() => {
    if (addresses.length > 0) {
      const defaultAddr = addresses.find((a) => a.isDefault) || addresses[0];
      if (defaultAddr.addressId) {
        setSelectedAddressId(defaultAddr.addressId);
        setAddressReplaceReq({ addressId: defaultAddr.addressId });
      }
    }
  }, [addresses, setAddressReplaceReq]);

  const handleAddressSelect = (id: number) => {
    setSelectedAddressId(id);
    setAddressReplaceReq({ addressId: id });
  };

  const handlePledgeAndPayment = async () => {
    if (!selectedRewardId || !selectedReward) {
      alert("리워드를 선택해주세요.");
      return;
    }
    if (!selectedAddressId) {
      alert("배송지를 선택해주세요.");
      return;
    }

    try {
      // 1. 후원 생성
      const pledgeRes = await createPledge({
        projectId,
        rewardId: selectedRewardId,
      });

      if (!pledgeRes.data?.pledgeId) {
        throw new Error(pledgeRes.message || "후원 생성에 실패했습니다.");
      }

      const pledgeId = pledgeRes.data.pledgeId;

      // 2. 배송지 설정
      await replaceAddress(pledgeId);

      // 3. 결제 실행
      const paymentRes = await createPayment({
        pledgeId,
        amount: selectedReward.price || 0,
        paymentMethod: "CARD",
      });

      if (paymentRes.data) {
        alert("후원 및 결제가 완료되었습니다!");
        router.push(ROUTES.MY_PAGE);
      } else {
        throw new Error(paymentRes.message || "결제 요청에 실패했습니다.");
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "오류가 발생했습니다.";
      alert(message);
    }
  };

  const isLoading = isProjectLoading || isRewardLoading || isAddressLoading || isPledgeLoading || isPaymentLoading;

  if (isLoading && !project) {
    return <div className="container mx-auto px-4 py-20 text-center">로딩 중...</div>;
  }

  if (!project) {
    return <div className="container mx-auto px-4 py-20 text-center">프로젝트를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">
      <h1 className="text-3xl font-bold mb-8 text-center">후원하기</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* 왼쪽: 정보 섹션 */}
        <div className="md:col-span-2 space-y-8">
          {/* 프로젝트 정보 */}
          <section className="bg-white p-6 border rounded-xl shadow-sm">
            <h2 className="text-xl font-bold mb-4">프로젝트 정보</h2>
            <div className="flex gap-4">
              <div className="w-24 h-24 bg-gray-100 rounded-md flex-shrink-0" />
              <div>
                <h3 className="font-bold text-lg">{project.title}</h3>
                <p className="text-gray-500 text-sm">{project.categoryName}</p>
              </div>
            </div>
          </section>

          {/* 리워드 정보 */}
          <section className="bg-white p-6 border rounded-xl shadow-sm">
            <h2 className="text-xl font-bold mb-4">선택한 리워드</h2>
            {selectedReward ? (
              <div className="border p-4 rounded-lg bg-blue-50 border-blue-100">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold">{selectedReward.title}</h3>
                  <span className="font-bold text-blue-600">{selectedReward.price?.toLocaleString()}원</span>
                </div>
                <p className="text-sm text-gray-600">{selectedReward.description}</p>
              </div>
            ) : (
              <div className="text-center py-4 text-red-500">
                리워드가 선택되지 않았습니다. 
                <button onClick={() => router.push(ROUTES.PROJECT.DETAIL(projectId))} className="ml-2 underline">뒤로 가기</button>
              </div>
            )}
          </section>

          {/* 배송지 선택 */}
          <section className="bg-white p-6 border rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">배송지 선택</h2>
              <button 
                onClick={() => router.push(ROUTES.MY_PAGE_ADDRESS)}
                className="text-sm text-blue-600 hover:underline"
              >
                배송지 관리
              </button>
            </div>
            
            <div className="space-y-3">
              {addresses.length === 0 ? (
                <div className="text-center py-6 border-2 border-dashed rounded-lg text-gray-500">
                  등록된 배송지가 없습니다. <br/>
                  <button onClick={() => router.push(ROUTES.MY_PAGE_ADDRESS)} className="text-blue-600 underline mt-2">배송지 추가하기</button>
                </div>
              ) : (
                addresses.map((addr) => (
                  <div 
                    key={addr.addressId}
                    onClick={() => addr.addressId && handleAddressSelect(addr.addressId)}
                    className={`p-4 border rounded-lg cursor-pointer transition ${
                      selectedAddressId === addr.addressId 
                      ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' 
                      : 'hover:border-gray-400'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold">{addr.recipientName}</span>
                      {addr.isDefault && (
                        <span className="text-[10px] bg-gray-200 px-1.5 py-0.5 rounded text-gray-600">기본배송지</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">[{addr.postalCode}] {addr.addressMain} {addr.addressDetail}</p>
                    <p className="text-sm text-gray-500 mt-1">{addr.phone}</p>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>

        {/* 오른쪽: 결제 요약 및 버튼 */}
        <div className="md:col-span-1">
          <div className="bg-white p-6 border rounded-xl shadow-sm sticky top-6">
            <h2 className="text-xl font-bold mb-6">최종 후원 금액</h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between">
                <span className="text-gray-600">리워드 금액</span>
                <span className="font-medium">{selectedReward?.price?.toLocaleString()}원</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">배송비</span>
                <span className="font-medium">0원</span>
              </div>
              <div className="border-t pt-4 flex justify-between items-end">
                <span className="font-bold">총 결제 금액</span>
                <span className="text-2xl font-bold text-blue-600">{selectedReward?.price?.toLocaleString()}원</span>
              </div>
            </div>

            <button
              onClick={handlePledgeAndPayment}
              disabled={isLoading || !selectedReward || !selectedAddressId}
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {isLoading ? '처리 중...' : '후원하기'}
            </button>
            
            <p className="text-center text-xs text-gray-400 mt-4">
              프로젝트 성공 시에만 결제가 진행됩니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
