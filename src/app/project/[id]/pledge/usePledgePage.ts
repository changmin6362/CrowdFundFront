'use client';

import { useState, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useProjectDetail } from "@api/project/user/detail/useProjectDetail";
import { useRewardFetch } from "@api/reward/user/fetch/useRewardFetch";
import { useUserAddressFetch } from "@api/user-address/fetch/useUserAddressFetch";
import { useMyPledgeCreate } from "@api/pledge/my/create/useMyPledgeCreate";
import { usePaymentCreate } from "@api/payment/create/usePaymentCreate";
import { usePledgeAddressReplace } from "@api/pledge-address/replace/usePledgeAddressReplace";
import { ROUTES } from "@/constants/routes";

export const usePledgePage = (projectId: number) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rewardIdParam = searchParams.get('rewardId');
  const selectedRewardId = rewardIdParam ? Number(rewardIdParam) : 0;

  const { response: projectResponse, isLoading: isProjectLoading } = useProjectDetail(projectId);
  const { response: rewardResponse, isLoading: isRewardLoading } = useRewardFetch(projectId);
  const { response: addressResponse, isLoading: isAddressLoading } = useUserAddressFetch();

  const { createPledge, isLoading: isPledgeLoading } = useMyPledgeCreate();
  const { createPayment, isLoading: isPaymentLoading } = usePaymentCreate();
  const { request: addressReplaceReq, setRequest: setAddressReplaceReq, onSubmit: replaceAddress } = usePledgeAddressReplace();

  const [selectedAddressId, setSelectedAddressId] = useState<number>(0);
  const [step, setStep] = useState<'SELECT_REWARD' | 'SELECT_ADDRESS' | 'PAYMENT'>('SELECT_ADDRESS');

  const project = projectResponse?.data?.projectDetail;
  const rewards = rewardResponse?.data?.rewards || [];
  const selectedReward = rewards.find(r => r.rewardId === selectedRewardId);
  const addresses = addressResponse?.data?.addresses || [];

  useEffect(() => {
    if (addresses.length > 0) {
      const defaultAddr = addresses.find(a => a.isDefault) || addresses[0];
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
    if (!selectedRewardId) {
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
        rewardId: selectedRewardId
      });

      if (!pledgeRes.data?.pledgeId) {
        throw new Error(pledgeRes.message || "후원 생성에 실패했습니다.");
      }

      const pledgeId = pledgeRes.data.pledgeId;

      // 2. 배송지 설정 (필요한 경우)
      await replaceAddress(pledgeId);

      // 3. 결제 실행
      const paymentRes = await createPayment({
        pledgeId,
        amount: selectedReward?.price || 0,
        paymentMethod: 'CARD' // 기본값으로 CARD 선택
      });

      if (paymentRes.data) {
        alert("후원 및 결제가 완료되었습니다!");
        router.push(ROUTES.MY_PAGE); // 마이페이지 등으로 이동
      } else {
        throw new Error(paymentRes.message || "결제 요청에 실패했습니다.");
      }
    } catch (err: any) {
      alert(err.message || "오류가 발생했습니다.");
    }
  };

  return {
    project,
    selectedReward,
    addresses,
    selectedAddressId,
    handleAddressSelect,
    handlePledgeAndPayment,
    isLoading: isProjectLoading || isRewardLoading || isAddressLoading || isPledgeLoading || isPaymentLoading,
    step,
    setStep,
  };
};
